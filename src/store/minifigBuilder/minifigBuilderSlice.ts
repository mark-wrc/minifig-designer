import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { MinifigPartType } from '@/types';
import { IMinifigProject, MinifigPartData, SelectedMinifigItems } from '@/types/Minifig';
import { createEmptyMinifigProject } from '@/utils';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MinifigBuilderState {
  characters: IMinifigProject[];
  activeCharacterId: string | null;
  selectedCategory: MinifigPartType | null;
}

const initialState: MinifigBuilderState = {
  characters: [],
  activeCharacterId: null,
  selectedCategory: null,
};

interface SetSelectedPartPayload {
  minifig_part_type: keyof SelectedMinifigItems; // "head" | "torso" | "legs"
  image?: string;
  data?: MinifigPartData; // optional: full object to store in selectedItems
}

const minifigBuilderSlice = createSlice({
  name: 'minifigBuilder',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<string>) => {
      const newCharacter = createEmptyMinifigProject(action.payload);
      state.characters.push(newCharacter);
      state.activeCharacterId = newCharacter._id; // newCharacter._id is a plain UUID string
    },
    setSelectedCategory: (state, action: PayloadAction<MinifigPartType>) => {
      state.selectedCategory = action.payload;
    },

    setSelectedPart: (state, action: PayloadAction<SetSelectedPartPayload>) => {
      const character = state.characters.find((char) => char._id === state.activeCharacterId);
      if (!character) return;

      const { minifig_part_type, data } = action.payload; // Destructure `data` and ignore `image` here

      const partKey = minifig_part_type as keyof IMinifigProject;
      const selectedItemsPartKey = minifig_part_type as keyof SelectedMinifigItems;

      // Use `data` to determine if a part is being added or removed
      if (data) {
        // Case 1: Adding a new part
        character[partKey] =
          data.product_images[0]?.url ||
          BaseMinifigParts[minifig_part_type.toUpperCase() as MinifigPartType].image;
        character.selectedItems[selectedItemsPartKey] = data;
      } else {
        // Case 2: Removing a part
        character[partKey] =
          BaseMinifigParts[minifig_part_type.toUpperCase() as MinifigPartType].image;
        delete character.selectedItems[selectedItemsPartKey];
      }
    },
    setActiveMinifigure: (state, action: PayloadAction<string | null>) => {
      state.activeCharacterId = action.payload; // action.payload should be a plain UUID string
    },
    resetBuilder: (state) => {
      state.characters = [];
      state.activeCharacterId = null;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    renameCharacter: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const character = state.characters.find((char) => char._id === action.payload.id);
      if (character) {
        character.name = action.payload.name;
      }
    },
    removePart: (state, action: PayloadAction<MinifigPartType>) => {
      const character = state.characters.find((char) => char._id === state.activeCharacterId);
      if (!character) return;
      const partType = action.payload.toLowerCase() as keyof IMinifigProject;
      character[partType] = BaseMinifigParts[action.payload].image;
      delete character.selectedItems[partType as keyof IMinifigProject['selectedItems']];
    },
    deleteMinifigure: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter((char) => char._id !== action.payload);
      if (state.activeCharacterId === action.payload) {
        state.activeCharacterId = state.characters.length > 0 ? state.characters[0]._id : null;
      }
    },
  },
});

export const {
  setActiveMinifigure,
  resetBuilder,
  setSelectedPart,
  setSelectedCategory,
  addCharacter,
  renameCharacter,
  removePart,
  deleteMinifigure,
} = minifigBuilderSlice.actions;

export default minifigBuilderSlice.reducer;
