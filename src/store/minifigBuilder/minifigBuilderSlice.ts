import { BaseMinifigParts } from '@/constants/BaseMinifigPart';

import { MinifigPartType } from '@/types';
import { IMinifigProject, MinifigPartData } from '@/types/Minifig';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MinifigBuilderState {
  characters: IMinifigProject[];
  activeCharacterId: string | null;
  selectedCategory: MinifigPartType | null;
}

const createEmptyCharacter = (name: string): IMinifigProject => ({
  id: crypto.randomUUID(),
  name,
  head: BaseMinifigParts[MinifigPartType.HEAD].image,
  torso: BaseMinifigParts[MinifigPartType.TORSO].image,
  legs: BaseMinifigParts[MinifigPartType.LEGS].image,
  selectedItems: {},
});

const initialState: MinifigBuilderState = {
  characters: [],
  activeCharacterId: null,
  selectedCategory: null,
};

const minifigBuilderSlice = createSlice({
  name: 'minifigBuilder',
  initialState,
  reducers: {
    createMinifigure: (state, action: PayloadAction<string>) => {
      const newMinifigure = createEmptyCharacter(action.payload);
      state.characters.push(newMinifigure);
      state.activeCharacterId = newMinifigure.id;
    },

    setSelectedCategory: (state, action: PayloadAction<MinifigPartType>) => {
      state.selectedCategory = action.payload;
    },

    setSelectedPart: (state, action: PayloadAction<MinifigPartData>) => {
      const character = state.characters.find((char) => char.id === state.activeCharacterId);
      if (!character) return;

      const { type, image } = action.payload;

      if (!image) {
        character[type.toLowerCase() as keyof IMinifigProject] =
          BaseMinifigParts[type as MinifigPartType].image;
        delete character.selectedItems[
          type.toLowerCase() as keyof IMinifigProject['selectedItems']
        ];
        return;
      }

      character[type.toLowerCase() as keyof IMinifigProject] = image;
      character.selectedItems[type.toLowerCase() as keyof IMinifigProject['selectedItems']] =
        action.payload;
    },

    setActiveMinifigure: (state, action: PayloadAction<string>) => {
      state.activeCharacterId = action.payload;
    },

    deleteMinifigure: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter((char) => char.id !== action.payload);
      if (state.activeCharacterId === action.payload) {
        state.activeCharacterId = state.characters.length > 0 ? state.characters[0].id : null;

        // clear selected category if theres no project left
        if (state.characters.length === 0) {
          state.selectedCategory = null;
        }
      }
    },

    removePart: (state, action: PayloadAction<MinifigPartType>) => {
      const character = state.characters.find((char) => char.id === state.activeCharacterId);
      if (!character) return;

      const partType = action.payload.toLowerCase() as keyof IMinifigProject;
      character[partType] = BaseMinifigParts[action.payload].image;
      delete character.selectedItems[partType as keyof IMinifigProject['selectedItems']];
    },

    renameCharacter: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const character = state.characters.find((char) => char.id === action.payload.id);
      if (character) {
        character.name = action.payload.name;
      }
    },

    resetBuilder: (state) => {
      state.characters = [];
      state.activeCharacterId = null;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const {
  createMinifigure,
  setActiveMinifigure,
  deleteMinifigure,
  renameCharacter,
  resetBuilder,
  setSelectedPart,
  setSelectedCategory,
  removePart,
} = minifigBuilderSlice.actions;

export default minifigBuilderSlice.reducer;
