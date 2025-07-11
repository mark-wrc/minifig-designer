import { CartProject } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  projects: Record<string, CartProject>;
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  projects: {},
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Record<string, CartProject>>) => {
      state.projects = action.payload;
    },

    setTotals: (state, action: PayloadAction<{ totalItems: number; totalPrice: number }>) => {
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },

    updateProject: (state, action: PayloadAction<CartProject>) => {
      state.projects[action.payload.projectName] = action.payload;
    },

    // NEW: Update specific item quantity
    updateItemQuantity: (
      state,
      action: PayloadAction<{ projectName: string; itemId: string; quantity: number }>,
    ) => {
      const { projectName, itemId, quantity } = action.payload;
      const project = state.projects[projectName];

      if (project) {
        const item = project.items.find((item: { id: string }) => item.id === itemId);
        if (item) {
          item.quantity = Math.max(1, Math.min(item.stock, quantity));
          item.addedAt = Date.now();
        }
      }
    },

    removeProject: (state, action: PayloadAction<string>) => {
      delete state.projects[action.payload];
    },

    removeItem: (state, action: PayloadAction<{ projectName: string; itemId: string }>) => {
      const { projectName, itemId } = action.payload;
      const project = state.projects[projectName];

      if (project) {
        project.items = project.items.filter((item: { id: string }) => item.id !== itemId);

        if (project.items.length === 0) {
          delete state.projects[projectName];
        }
      }
    },

    clearAll: (state) => {
      state.projects = {};
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  setProjects,
  setTotals,
  updateProject,
  updateItemQuantity,
  removeProject,
  removeItem,
  clearAll,
} = cartSlice.actions;

export default cartSlice.reducer;
