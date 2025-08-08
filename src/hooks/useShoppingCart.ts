/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartStorage } from '../services/cartStorage';
import {
  calculateProjectTotal,
  calculateGlobalTotals,
  createCartItem,
} from '@/utils/cartCalculation';
import { setProjects, setTotals, updateProject, clearAll } from '@/store/shoppingCart/CartSlice';
import {
  selectAllProjects,
  selectTotalItems,
  selectTotalPrice,
  selectIsCartEmpty,
  selectCartSummary,
} from '@/store/shoppingCart/Selectors';
import type { AddCharacterPayload, CartProject, ICartItem, selectedMinifigParts } from '@/types';

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export const useShoppingCart = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllProjects) || {};
  const totalItems = useSelector(selectTotalItems) || 0;
  const totalPrice = useSelector(selectTotalPrice) || 0;
  const isEmpty = useSelector(selectIsCartEmpty) ?? true;
  const cartSummary = useSelector(selectCartSummary) || {
    totalProjects: 0,
    totalItems: 0,
    totalPrice: 0,
    isEmpty: true,
  };

  const latestRef = useRef<Record<string, CartProject>>({});
  useEffect(() => {
    latestRef.current = projects;
  }, [projects]);

  // One path to update state + totals + storage
  const apply = useCallback(
    (fn: (cur: Record<string, CartProject>) => Record<string, CartProject>) => {
      const next = fn(latestRef.current);
      dispatch(setProjects(next));
      dispatch(setTotals(calculateGlobalTotals(next)));
      cartStorage.save(next);
    },
    [dispatch],
  );

  const initializeCart = useCallback(() => {
    try {
      const saved = cartStorage.load() || {};
      dispatch(setProjects(saved));
      dispatch(setTotals(calculateGlobalTotals(saved)));
      cartStorage.save(saved);
    } catch (e) {
      console.error('Failed to initialize cart:', e);
      dispatch(setProjects({}));
      dispatch(setTotals({ totalItems: 0, totalPrice: 0 }));
    }
  }, [dispatch]);

  // Upsert one item into an items array
  const upsertItem = useCallback(
    (
      items: ICartItem[],
      part: selectedMinifigParts,
      quantity: number,
      priceFallback: number,
      stockFallback: number,
    ) => {
      const i = items.findIndex((it) => it.partType === part.type && it.partName === part.name);
      if (i >= 0) {
        const it = items[i];
        const qty = clamp(it.quantity + quantity, 1, it.stock);
        return items.map((x, idx) =>
          idx === i ? { ...x, quantity: qty, addedAt: Date.now() } : x,
        );
      }
      const price = part.price ?? priceFallback;
      const stock = part.stock ?? stockFallback;
      return [...items, createCartItem(part, price, quantity, stock)];
    },
    [],
  );

  const addCharacterToCart = useCallback(
    (payload: AddCharacterPayload) => {
      const { projectName, selectedParts, pricePerItem = 10, quantity = 1, stock = 5 } = payload;
      const cur = latestRef.current;
      const base = cur[projectName] || {
        projectName,
        items: [],
        totalPrice: 0,
        createdAt: Date.now(),
      };
      let items = base.items;
      for (const p of selectedParts) items = upsertItem(items, p, quantity, pricePerItem, stock);
      const updated: CartProject = { ...base, items, totalPrice: calculateProjectTotal(items) };
      dispatch(updateProject(updated));
    },
    [upsertItem, dispatch],
  );

  // Batch add (persists once)
  const addCharactersToCartBatch = useCallback(
    (payloads: AddCharacterPayload[]) => {
      apply((cur) => {
        const next = { ...cur };
        for (const {
          projectName,
          selectedParts,
          pricePerItem = 10,
          quantity = 1,
          stock = 5,
        } of payloads) {
          const base = next[projectName] || {
            projectName,
            items: [],
            totalPrice: 0,
            createdAt: Date.now(),
          };
          let items = base.items;
          for (const p of selectedParts)
            items = upsertItem(items, p, quantity, pricePerItem, stock);
          next[projectName] = { ...base, items, totalPrice: calculateProjectTotal(items) };
          // optional immediate UI update
          dispatch(updateProject(next[projectName]));
        }
        return next;
      });
    },
    [apply, upsertItem, dispatch],
  );

  // Persist current cart (if its multiple single adds)
  const persistCart = useCallback(() => apply((x) => ({ ...x })), [apply]);

  const updateItemQuantity = useCallback(
    (projectName: string, itemId: string, newQty: number) => {
      apply((currentProject) => {
        const proj = currentProject[projectName];
        if (!proj) return currentProject;
        const items = proj.items.map((it) =>
          it.id === itemId
            ? { ...it, quantity: clamp(newQty, 1, it.stock), addedAt: Date.now() }
            : it,
        );
        return {
          ...currentProject,
          [projectName]: { ...proj, items, totalPrice: calculateProjectTotal(items) },
        };
      });
    },
    [apply],
  );

  const removeItemFromCart = useCallback(
    (projectName: string, itemId: string) => {
      apply((currentProject) => {
        const proj = currentProject[projectName];
        if (!proj) return currentProject;
        const items = proj.items.filter((it) => it.id !== itemId);
        if (items.length === 0) {
          const { [projectName]: _, ...rest } = currentProject;
          return rest;
        }
        return {
          ...currentProject,
          [projectName]: { ...proj, items, totalPrice: calculateProjectTotal(items) },
        };
      });
    },
    [apply],
  );

  const removeProjectFromCart = useCallback(
    (projectName: string) => {
      apply((currentProject) => {
        if (!(projectName in currentProject)) return currentProject;
        const { [projectName]: _, ...rest } = currentProject;
        return rest;
      });
    },
    [apply],
  );

  const clearCart = useCallback(() => {
    dispatch(clearAll());
    cartStorage.clear();
  }, [dispatch]);

  // Getters
  const getMinifigProject = useCallback(
    (projectName: string) => projects[projectName] || null,
    [projects],
  );
  const getAllMinifigProjects = useCallback(() => Object.values(projects), [projects]);

  return {
    // state
    minifigProjects: projects,
    totalItems,
    totalPrice,
    isEmpty,
    cartSummary,
    // lifecycle
    initializeCart,
    // mutations
    addCharacterToCart,
    addCharactersToCartBatch,
    persistCart,
    updateItemQuantity,
    removeItemFromCart,
    removeProjectFromCart,
    clearCart,
    // getters
    getMinifigProject,
    getAllMinifigProjects,
  };
};
