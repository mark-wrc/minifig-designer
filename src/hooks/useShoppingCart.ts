/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';
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
import { AddCharacterPayload } from '@/types';

export const useShoppingCart = () => {
  const dispatch = useDispatch();

  // Use selectors instead of direct state access
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Selector-based getters
  const getProject = useCallback(
    (projectName: string) => {
      return projects[projectName] || null;
    },
    [projects],
  );

  const getAllProjects = useCallback(() => {
    return Object.values(projects || {});
  }, [projects]);

  // Initialize cart from storage
  const initializeCart = useCallback(() => {
    try {
      const savedProjects = cartStorage.load();
      const totals = calculateGlobalTotals(savedProjects);

      dispatch(setProjects(savedProjects));
      dispatch(setTotals(totals));
    } catch (error) {
      console.error('Failed to initialize cart:', error);
      dispatch(setProjects({}));
      dispatch(setTotals({ totalItems: 0, totalPrice: 0 }));
    }
  }, [dispatch]);

  const addCharacterToCart = useCallback(
    (payload: AddCharacterPayload) => {
      try {
        const { projectName, selectedParts, pricePerItem = 10, quantity = 1, stock = 5 } = payload;

        console.log(`Adding character to cart:`, {
          projectName,
          selectedParts,
          currentProjects: Object.keys(projects),
        });

        // Get FRESH state from Redux store - DEEP CLONE to avoid mutation issues
        const currentProjects = JSON.parse(JSON.stringify(projects));

        // Get or create project
        const existingProject = currentProjects[projectName];
        const project = existingProject || {
          projectName,
          items: [],
          totalPrice: 0,
          createdAt: Date.now(),
        };

        console.log(`Project ${projectName} ${existingProject ? 'exists' : 'is new'}:`, project);

        // Process each part - FIXED: Create new array and objects
        const updatedItems = [...project.items];

        selectedParts.forEach((part) => {
          const existingItemIndex = updatedItems.findIndex(
            (item) => item.partType === part.type && item.partName === part.name,
          );

          if (existingItemIndex !== -1) {
            // FIXED: Create new object instead of mutating existing one
            const existingItem = updatedItems[existingItemIndex];
            const newQuantity = Math.min(existingItem.quantity + quantity, existingItem.stock);

            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: newQuantity,
              addedAt: Date.now(),
            };

            console.log(
              `Updated existing item ${part.name}: ${existingItem.quantity} -> ${newQuantity}`,
            );
          } else {
            // Add new item with individual price if provided
            const itemPrice = (part as any).price || pricePerItem;
            const itemStock = (part as any).stock || stock;

            const newItem = createCartItem(part, itemPrice, quantity, itemStock);
            updatedItems.push(newItem);
            console.log(`Added new item ${part.name}:`, newItem);
          }
        });

        // Update project - Create completely new object
        const updatedProject = {
          projectName,
          items: updatedItems,
          totalPrice: calculateProjectTotal(updatedItems),
          createdAt: project.createdAt,
        };

        console.log(`Updated project ${projectName}:`, updatedProject);

        // Update projects - IMPORTANT: Create new object reference
        const newProjects = {
          ...currentProjects,
          [projectName]: updatedProject,
        };

        console.log(`All projects after update:`, Object.keys(newProjects));

        // Dispatch updates
        dispatch(updateProject(updatedProject));

        // Calculate and update totals
        const totals = calculateGlobalTotals(newProjects);
        console.log(`New totals:`, totals);
        dispatch(setTotals(totals));

        // Save to storage
        cartStorage.save(newProjects);

        console.log(`Successfully added ${projectName} to cart`);
      } catch (error) {
        console.error('Failed to add character to cart:', error);
        throw error; // Re-throw to handle in calling code
      }
    },
    [projects, dispatch],
  );

  // Update item quantity - FIXED: Proper immutable update
  const updateItemQuantity = useCallback(
    (projectName: string, itemId: string, newQuantity: number) => {
      try {
        const project = projects[projectName];
        if (!project) {
          console.warn(`Project ${projectName} not found for quantity update`);
          return;
        }

        const updatedItems = project.items.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              quantity: Math.max(1, Math.min(item.stock, newQuantity)),
              addedAt: Date.now(),
            };
          }
          return item;
        });

        const updatedProject = {
          ...project,
          items: updatedItems,
          totalPrice: calculateProjectTotal(updatedItems),
        };

        // Update state
        dispatch(updateProject(updatedProject));

        // Update totals
        const updatedProjects = { ...projects, [projectName]: updatedProject };
        const totals = calculateGlobalTotals(updatedProjects);
        dispatch(setTotals(totals));

        // Save to storage
        cartStorage.save(updatedProjects);
      } catch (error) {
        console.error('Failed to update item quantity:', error);
      }
    },
    [projects, dispatch],
  );

  // Remove item from cart
  const removeItemFromCart = useCallback(
    (projectName: string, itemId: string) => {
      try {
        dispatch(removeItem({ projectName, itemId }));

        // Get updated projects after removal
        const updatedProjects = { ...projects };
        const project = updatedProjects[projectName];

        if (project) {
          project.items = project.items.filter((item) => item.id !== itemId);
          project.totalPrice = calculateProjectTotal(project.items);

          if (project.items.length === 0) {
            delete updatedProjects[projectName];
          }
        }

        // Update totals
        const totals = calculateGlobalTotals(updatedProjects);
        dispatch(setTotals(totals));

        // Save to storage
        cartStorage.save(updatedProjects);
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
      }
    },
    [projects, dispatch],
  );

  // Remove entire project
  const removeProjectFromCart = useCallback(
    (projectName: string) => {
      try {
        console.log(`Removing project: ${projectName}`);
        dispatch(removeProject(projectName));

        const updatedProjects = { ...projects };
        delete updatedProjects[projectName];

        const totals = calculateGlobalTotals(updatedProjects);
        dispatch(setTotals(totals));

        cartStorage.save(updatedProjects);
        console.log(`Successfully removed project: ${projectName}`);
      } catch (error) {
        console.error('Failed to remove project from cart:', error);
      }
    },
    [projects, dispatch],
  );

  // Clear entire cart
  const clearCart = useCallback(() => {
    try {
      dispatch(clearAll());
      cartStorage.clear();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }, [dispatch]);

  return {
    // State (using selectors)
    projects,
    totalItems,
    totalPrice,
    isEmpty,
    cartSummary,

    // Actions
    initializeCart,
    addCharacterToCart,
    updateItemQuantity,
    removeItemFromCart,
    removeProjectFromCart,
    clearCart,

    // Getters (selector-based)
    getProject,
    getAllProjects,
  };
};
