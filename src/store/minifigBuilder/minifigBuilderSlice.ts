import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

import { MinifigPartType } from '@/types';
import { IMinifigProject, MinifigPartData } from '@/types/Minifig';
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

const minifigBuilderSlice = createSlice({
  name: 'minifigBuilder',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<MinifigPartType>) => {
      state.selectedCategory = action.payload;
    },

    setSelectedPart: (state, action: PayloadAction<MinifigPartData>) => {
      const character = state.characters.find((char) => char._id === state.activeCharacterId);
      if (!character) return;

      const { minifig_part_type, image } = action.payload;

      if (!image) {
        character[minifig_part_type.toLowerCase() as keyof IMinifigProject] =
          BaseMinifigParts[minifig_part_type as MinifigPartType].image;
        delete character.selectedItems[
          minifig_part_type.toLowerCase() as keyof IMinifigProject['selectedItems']
        ];
        return;
      }

      character[minifig_part_type.toLowerCase() as keyof IMinifigProject] = image;
      character.selectedItems[
        minifig_part_type.toLowerCase() as keyof IMinifigProject['selectedItems']
      ] = action.payload;
    },

    setActiveMinifigure: (state, action: PayloadAction<string | null>) => {
      state.activeCharacterId = action.payload;
    },

    // for debug purposes
    resetBuilder: (state) => {
      state.characters = [];
      state.activeCharacterId = null;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setActiveMinifigure, resetBuilder, setSelectedPart, setSelectedCategory } =
  minifigBuilderSlice.actions;

export default minifigBuilderSlice.reducer;
