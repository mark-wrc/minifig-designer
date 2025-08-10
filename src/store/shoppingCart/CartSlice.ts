import type { CartProject, AddCharacterPayload, MinifigPartType } from '@/types'; // Import AddCharacterPayload
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
    /**
     * Add one or more projects with their selected minifig parts to the cart.
     * If the project name already exists, it gets replaced.
     *
     * Example:
     * dispatch(addCharacters([
     *   {
     *     projectName: "MyFirstMinifig",
     *     selectedParts: [{ _id: "123", product_name: "Lego Head", price: 5, stock: 10, minifig_part_type: "HEAD" }],
     *     quantity: 2
     *   }
     * ]))
     */

    addCharacters: (state, action: PayloadAction<AddCharacterPayload[]>) => {
      action.payload.forEach((newProjectPayload) => {
        const newCartProject: CartProject = {
          projectName: newProjectPayload.projectName,
          items: newProjectPayload.selectedParts.map((part) => ({
            _id: part._id,
            name: part.product_name,
            images: part.product_images?.[0]?.url || part.image || '',
            color: newProjectPayload.color || '',
            price: part.price ?? 0,
            stock: part.stock ?? 0,
            quantity: newProjectPayload.quantity ?? 1,
            createdAt: Date.now(),
            partType: part.minifig_part_type as MinifigPartType,
            partName: part.product_name,
            addedAt: Date.now(),
          })),
          totalPrice: newProjectPayload.pricePerItem ?? 0,
          createdAt: Date.now(),
        };
        state.projects[newCartProject.projectName] = newCartProject;
      });
    },

    /**
     * Replace the entire projects list in the cart.
     * Example:
     * dispatch(setProjects({
     *   MyFirstMinifig: { projectName: "MyFirstMinifig", items: [...], totalPrice: 50, createdAt: 123456 }
     * }))
     */
    setProjects: (state, action: PayloadAction<Record<string, CartProject>>) => {
      state.projects = action.payload;
    },

    /**
     * Update the total item count and total price in the cart.
     * Example:
     * dispatch(setTotals({ totalItems: 5, totalPrice: 100 }))
     */
    setTotals: (state, action: PayloadAction<{ totalItems: number; totalPrice: number }>) => {
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },

    /**
     * Replace one specific project in the cart with new data.
     * Example:
     * dispatch(updateProject({ projectName: "MyFirstMinifig", items: [...], totalPrice: 40, createdAt: 123456 }))
     */
    updateProject: (state, action: PayloadAction<CartProject>) => {
      state.projects[action.payload.projectName] = action.payload;
    },

    /**
     * Update the quantity of a specific item in a project.
     * It makes sure the quantity stays between 1 and the stock limit.
     * Example:
     * dispatch(updateItemQuantity({ projectName: "MyFirstMinifig", itemId: "123", quantity: 3 }))
     */
    updateItemQuantity: (
      state,
      action: PayloadAction<{ projectName: string; itemId: string; quantity: number }>,
    ) => {
      const { projectName, itemId, quantity } = action.payload;
      const project = state.projects[projectName];
      if (project) {
        const item = project.items.find((item: { _id: string }) => item._id === itemId);
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
        project.items = project.items.filter((item: { _id: string }) => item._id !== itemId);
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
  addCharacters,
  removeItem,
  clearAll,
} = cartSlice.actions;

export default cartSlice.reducer;
