import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Character {
  id: string;
  name: string;
  hatsAndHair: string;
  head: string;
  torso: string;
  legs: string;
  accessories: string;
}

interface MinifigBuilderState {
  characters: Character[];
  activeCharacterId: string | null;
}

const createEmptyCharacter = (name: string): Character => ({
  id: crypto.randomUUID(),
  name,
  hatsAndHair: '',
  head: '',
  torso: '',
  legs: '',
  accessories: '',
});

const initialState: MinifigBuilderState = {
  characters: [],
  activeCharacterId: null,
};

const minifigBuilderSlice = createSlice({
  name: 'minifigBuilder',
  initialState,
  reducers: {
    createMinifigure: (state, action: PayloadAction<string>) => {
      const newMinifigure = createEmptyCharacter(action.payload);
      if (!state.characters) {
        state.characters = [];
      }
      state.characters.push(newMinifigure);
      state.activeCharacterId = newMinifigure.id;
    },
    setActiveMinifigure: (state, action: PayloadAction<string>) => {
      state.activeCharacterId = action.payload;
    },
    deleteMinifigure: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter((char) => char.id != action.payload);

      if (state.activeCharacterId === action.payload) {
        state.activeCharacterId = state.characters.length > 0 ? state.characters[0].id : null;
      }
    },

    renameCharacter: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const character = state.characters.find((char) => char.id === action.payload.id);
      if (character) {
        character.name = action.payload.name;
      }
    },

    setHatsAndHair: (state, action: PayloadAction<string>) => {
      const activeCharacter = state.characters.find((char) => char.id === state.activeCharacterId);
      if (activeCharacter) {
        activeCharacter.hatsAndHair = action.payload;
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
  setHatsAndHair,
  setHead,
  setTorso,
  setLegs,
  setAccessories,
  resetBuilder,
} = minifigBuilderSlice.actions;

export default minifigBuilderSlice.reducer;
