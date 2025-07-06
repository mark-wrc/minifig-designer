import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  partType: string;
  partName: string;
  partImage: string;
  price: number;
  addedAt: number;
  quantity: number;
  stock: number;
}

export interface CartProject {
  projectName: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: number;
}

interface CartState {
  projects: Record<string, CartProject>; // Each project gets its own array
  totalItems: number;
  totalPrice: number;
}

interface AddCharacterToCartPayload {
  projectName: string;
  selectedParts: Array<{
    type: string;
    image: string;
    name: string;
  }>;
  pricePerItem?: number;
  quantity: number;
  stock: number;
}

const STORAGE_KEY = 'minifig-cart';

const initialState: CartState = {
  projects: {},
  totalItems: 0,
  totalPrice: 0,
};

// Simple helper to calculate totals
const calculateTotals = (projects: Record<string, CartProject>) => {
  const allItems = Object.values(projects).flatMap((project) => project.items);
  return {
    totalItems: allItems.length,
    totalPrice: allItems.reduce((sum, item) => sum + item.price, 0),
  };
};

// Simple localStorage helpers
const loadFromStorage = (): Record<string, CartProject> => {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveToStorage = (projects: Record<string, CartProject>) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Load cart from localStorage
    initializeCart: (state) => {
      const savedProjects = loadFromStorage();
      state.projects = savedProjects;
      const totals = calculateTotals(savedProjects);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    // Add character to cart - each project gets its own array
    addCharacterToCart: (state, action: PayloadAction<AddCharacterToCartPayload>) => {
      const {
        projectName,
        selectedParts,
        pricePerItem = 10,
        stock = 5,
        quantity = 1,
      } = action.payload;

      // Ensure project exists
      if (!state.projects[projectName]) {
        state.projects[projectName] = {
          projectName,
          items: [],
          totalPrice: 0,
          createdAt: Date.now(),
        };
      }

      // For each part, add or update quantity
      selectedParts.forEach((part) => {
        const items = state.projects[projectName].items;
        const existing = items.find(
          (item) => item.partType === part.type && item.partName === part.name,
        );
        if (existing) {
          // Add up, but do not exceed stock
          existing.quantity = Math.min(existing.quantity + quantity, existing.stock);
          existing.addedAt = Date.now();
        } else {
          items.push({
            id: crypto.randomUUID(),
            partType: part.type,
            partName: part.name,
            partImage: part.image,
            price: pricePerItem,
            quantity: Math.min(quantity, stock),
            stock: stock,
            addedAt: Date.now(),
          });
        }
      });

      // Update project total
      const items = state.projects[projectName].items;
      state.projects[projectName].totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      // Update global totals
      const totals = calculateTotals(state.projects);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      saveToStorage(state.projects);
    },

    // Remove single item
    removeItemFromCart: (
      state,
      action: PayloadAction<{ projectName: string; itemId: string }>,
    ) => {
      const { projectName, itemId } = action.payload;

      if (state.projects[projectName]) {
        state.projects[projectName].items = state.projects[projectName].items.filter(
          (item) => item.id !== itemId,
        );

        // Update project total
        state.projects[projectName].totalPrice = state.projects[projectName].items.reduce(
          (sum, item) => sum + item.price,
          0,
        );

        // Remove project if empty
        if (state.projects[projectName].items.length === 0) {
          delete state.projects[projectName];
        }

        // Update global totals
        const totals = calculateTotals(state.projects);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;

        saveToStorage(state.projects);
      }
    },

    // Remove entire project
    removeProjectFromCart: (state, action: PayloadAction<string>) => {
      delete state.projects[action.payload];

      const totals = calculateTotals(state.projects);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      saveToStorage(state.projects);
    },

    // Clear everything
    clearCart: (state) => {
      state.projects = {};
      state.totalItems = 0;
      state.totalPrice = 0;
      saveToStorage({});
    },
  },
});

export const {
  initializeCart,
  addCharacterToCart,
  removeItemFromCart,
  removeProjectFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Simple selectors
export const selectAllProjects = (state: { cart: CartState }) => state.cart.projects;
export const selectProjectByName = (state: { cart: CartState }, projectName: string) =>
  state.cart.projects[projectName];
