import { BaseMinifigParts } from '@/constants/BaseMinifigPart';
import { DummyParts, MinifigPartData } from '@/constants/DummyParts';
import { MinifigPartType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Character {
  id: string;
  name: string;
  head: string;
  torso: string;
  legs: string;
  accessories: string;
}

interface MinifigBuilderState {
  characters: Character[];
  activeCharacterId: string | null;
  wardrobeItems: MinifigPartData[];
  selectedCategory: MinifigPartType | null;
}

const createEmptyCharacter = (name: string): Character => ({
  id: crypto.randomUUID(),
  name,
  head: BaseMinifigParts[MinifigPartType.HEAD].image,
  torso: BaseMinifigParts[MinifigPartType.TORSO].image,
  legs: BaseMinifigParts[MinifigPartType.LEGS].image,
  accessories: BaseMinifigParts[MinifigPartType.ACCESSORIES].image,
});

const initialState: MinifigBuilderState = {
  characters: [],
  activeCharacterId: null,
  wardrobeItems: [],
  selectedCategory: null,
};

const minifigBuilderSlice = createSlice({
  name: 'minifigBuilder',
  initialState,
  reducers: {
    // Create Minigure Tab
    createMinifigure: (state, action: PayloadAction<string>) => {
      const newMinifigure = createEmptyCharacter(action.payload);
      if (!state.characters) {
        state.characters = [];
      }
      state.characters.push(newMinifigure);
      state.activeCharacterId = newMinifigure.id;
    },

    // For category Section
    setSelectedCategory: (state, action: PayloadAction<MinifigPartType>) => {
      state.selectedCategory = action.payload;
      state.wardrobeItems = DummyParts[action.payload];
    },

    // Selected Minifigure part usecase: fetch minifig parts
    // NOTE: this reducer is for test only
    setSelectedPart: (state, action: PayloadAction<MinifigPartData>) => {
      const character = state.characters.find((char) => char.id === state.activeCharacterId);
      if (!character) return;

      const { type, image } = action.payload;
      // If no payload or image, revert to placeholder
      if (!image) {
        character[type.toLowerCase() as keyof Character] = BaseMinifigParts[type].image;
        return;
      }
      character[type.toLowerCase() as keyof Character] = image;
    },

    setActiveMinifigure: (state, action: PayloadAction<string>) => {
      state.activeCharacterId = action.payload;
    },

    // Delete Minifigure Tab
    deleteMinifigure: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter((char) => char.id != action.payload);

      if (state.activeCharacterId === action.payload) {
        state.activeCharacterId = state.characters.length > 0 ? state.characters[0].id : null;
      }
    },

    // Remove Certain Minifure Parts eg. HEAD, COCK and etc..
    removePart: (state, action: PayloadAction<MinifigPartType>) => {
      const character = state.characters.find((char) => char.id === state.activeCharacterId);
      if (!character) return;

      const partType = action.payload.toLowerCase() as keyof Character;
      // reset to base/placeholder image
      character[partType] = BaseMinifigParts[action.payload].image;
    },

    renameCharacter: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const character = state.characters.find((char) => char.id === action.payload.id);
      if (character) {
        character.name = action.payload.name;
      }
    },

    setHead: (state, action: PayloadAction<string>) => {
      const activeCharacter = state.characters.find((char) => char.id === state.activeCharacterId);
      if (activeCharacter) {
        activeCharacter.head = action.payload;
      }
    },
    setTorso: (state, action: PayloadAction<string>) => {
      const activeCharacter = state.characters.find((char) => char.id === state.activeCharacterId);
      if (activeCharacter) {
        activeCharacter.torso = action.payload;
      }
    },
    setLegs: (state, action: PayloadAction<string>) => {
      const activeCharacter = state.characters.find((char) => char.id === state.activeCharacterId);
      if (activeCharacter) {
        activeCharacter.legs = action.payload;
      }
    },
    setAccessories: (state, action: PayloadAction<string>) => {
      const activeCharacter = state.characters.find((char) => char.id === state.activeCharacterId);
      if (activeCharacter) {
        activeCharacter.accessories = action.payload;
      }
    },

    // for debug purpose
    resetBuilder: (state) => {
      state.characters = [];
      state.activeCharacterId = null;
    },
  },
});

export const {
  createMinifigure,
  setActiveMinifigure,
  deleteMinifigure,
  renameCharacter,
  setHead,
  setTorso,
  setLegs,
  setAccessories,
  resetBuilder,
  setSelectedPart,
  setSelectedCategory,
  removePart,
} = minifigBuilderSlice.actions;

export default minifigBuilderSlice.reducer;
