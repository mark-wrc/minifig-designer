import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartStorage } from '../services/cartStorage';
import {
  calculateProjectTotal,
  calculateGlobalTotals,
  createCartItem,
} from '@/utils/cartCalculation';
import {
  setProjects,
  setTotals,
  updateProject,
  removeProject,
  removeItem,
  clearAll,
} from '@/store/shoppingCart/CartSlice';
import {
  selectAllProjects,
  selectTotalItems,
  selectTotalPrice,
  selectIsCartEmpty,
  selectCartSummary,
} from '@/store/shoppingCart/Selectors';
import { AddCharacterPayload, CartProject, ICartItem, selectedMinifigParts } from '@/types';

export const useShoppingCart = () => {
  const dispatch = useDispatch();

  const rawMinifigprojects = useSelector(selectAllProjects);
  const minifigProjects: Record<string, CartProject> = useMemo(
    () => rawMinifigprojects || {},
    [rawMinifigprojects],
  );
  const totalItems = useSelector(selectTotalItems) || 0;
  const totalPrice = useSelector(selectTotalPrice) || 0;
  const isEmpty = useSelector(selectIsCartEmpty) ?? true;
  const cartSummary = useSelector(selectCartSummary) || {
    totalProjects: 0,
    totalItems: 0,
    totalPrice: 0,
    isEmpty: true,
  };

  // Simple getter functions
  const getMinifigProject = useCallback(
    (projectName: string) => minifigProjects[projectName] || null,
    [minifigProjects],
  );

  const getAllMinifigProjects = useCallback(
    () => Object.values(minifigProjects),
    [minifigProjects],
  );

  // Helper function to update projects and persist changes
  const updateProjectsAndPersist = useCallback(
    (updatedProjects: typeof minifigProjects) => {
      const totals = calculateGlobalTotals(updatedProjects);
      dispatch(setTotals(totals));
      cartStorage.save(updatedProjects);
    },
    [dispatch],
  );

  // Initialize cart from storage
  const initializeCart = useCallback(() => {
    try {
      const savedProjects = cartStorage.load();
      dispatch(setProjects(savedProjects));
      updateProjectsAndPersist(savedProjects);
    } catch (error) {
      console.error('Failed to initialize cart:', error);
      const emptyState = {};
      dispatch(setProjects(emptyState));
      dispatch(setTotals({ totalItems: 0, totalPrice: 0 }));
    }
  }, [dispatch, updateProjectsAndPersist]);

  // Helper function to update or create cart item
  const updateOrCreateItem = useCallback(
    (
      items: ICartItem[],
      part: selectedMinifigParts,
      quantity: number,
      pricePerItem: number,
      stock: number,
    ) => {
      const existingIndex = items.findIndex(
        (item) => item.partType === part.type && item.partName === part.name,
      );

      if (existingIndex !== -1) {
        // Update existing item
        const existingItem = items[existingIndex];
        const newQuantity = Math.min(existingItem.quantity + quantity, existingItem.stock);

        return items.map((item, index) =>
          index === existingIndex ? { ...item, quantity: newQuantity, addedAt: Date.now() } : item,
        );
      } else {
        // Add new item
        const itemPrice = part.price || pricePerItem;
        const itemStock = part.stock || stock;
        const newItem = createCartItem(part, itemPrice, quantity, itemStock);

        return [...items, newItem];
      }
    },
    [],
  );

  const addCharacterToCart = useCallback(
    (payload: AddCharacterPayload) => {
      try {
        const { projectName, selectedParts, pricePerItem = 10, quantity = 1, stock = 5 } = payload;

        const existingProject = minifigProjects[projectName];
        const baseProject = existingProject || {
          projectName,
          items: [],
          totalPrice: 0,
          createdAt: Date.now(),
        };

        // Process all parts to get updated items
        let updatedItems = [...baseProject.items];

        selectedParts.forEach((part) => {
          updatedItems = updateOrCreateItem(updatedItems, part, quantity, pricePerItem, stock);
        });

        // Create updated project
        const updatedProject = {
          ...baseProject,
          items: updatedItems,
          totalPrice: calculateProjectTotal(updatedItems),
        };

        dispatch(updateProject(updatedProject));

        const newProjects = { ...minifigProjects, [projectName]: updatedProject };
        updateProjectsAndPersist(newProjects);
      } catch (error) {
        console.error('Failed to add character to cart:', error);
        throw error;
      }
    },
    [minifigProjects, dispatch, updateProjectsAndPersist, updateOrCreateItem],
  );

  //https://www.shadcn-ui-blocks.com/blocks/shopping-cart
  const updateItemQuantity = useCallback(
    (projectName: string, itemId: string, newQuantity: number) => {
      try {
        const project = minifigProjects[projectName];
        if (!project) {
          console.warn(`Project ${projectName} not found`);
          return;
        }

        const updatedItems = project.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: Math.max(1, Math.min(item.stock, newQuantity)),
                addedAt: Date.now(),
              }
            : item,
        );

        const updatedProject = {
          ...project,
          items: updatedItems,
          totalPrice: calculateProjectTotal(updatedItems),
        };

        dispatch(updateProject(updatedProject));

        const updatedProjects = { ...minifigProjects, [projectName]: updatedProject };
        updateProjectsAndPersist(updatedProjects);
      } catch (error) {
        console.error('Failed to update item quantity:', error);
      }
    },
    [minifigProjects, dispatch, updateProjectsAndPersist],
  );

  const removeItemFromCart = useCallback(
    (projectName: string, itemId: string) => {
      try {
        dispatch(removeItem({ projectName, itemId }));

        const project = minifigProjects[projectName];
        if (!project) return;

        const updatedItems = project.items.filter((item) => item.id !== itemId);
        const updatedProjects = { ...minifigProjects };

        if (updatedItems.length === 0) {
          delete updatedProjects[projectName];
        } else {
          updatedProjects[projectName] = {
            ...project,
            items: updatedItems,
            totalPrice: calculateProjectTotal(updatedItems),
          };
        }

        updateProjectsAndPersist(updatedProjects);
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
      }
    },
    [minifigProjects, dispatch, updateProjectsAndPersist],
  );

  const removeProjectFromCart = useCallback(
    (projectName: string) => {
      try {
        dispatch(removeProject(projectName));

        const updatedProjects = { ...minifigProjects };
        delete updatedProjects[projectName];

        updateProjectsAndPersist(updatedProjects);
      } catch (error) {
        console.error('Failed to remove project from cart:', error);
      }
    },
    [minifigProjects, dispatch, updateProjectsAndPersist],
  );

  const clearCart = useCallback(() => {
    try {
      dispatch(clearAll());
      cartStorage.clear();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }, [dispatch]);

  return {
    minifigProjects,
    totalItems,
    totalPrice,
    isEmpty,
    cartSummary,
    initializeCart,
    addCharacterToCart,
    updateItemQuantity,
    removeItemFromCart,
    removeProjectFromCart,
    clearCart,
    // Getters
    getMinifigProject,
    getAllMinifigProjects,
  };
};
