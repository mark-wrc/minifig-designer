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
  minifig_part_type: keyof SelectedMinifigItems;
  image?: string;
  data?: MinifigPartData;
  slotIndex?: number;
}

interface RemovePartPayload {
  partType: MinifigPartType;
  slotIndex?: number;
}

const minifigBuilderSlice = createSlice({
  name: 'minifigBuilder',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<string>) => {
      const newCharacter = createEmptyMinifigProject(action.payload);
      state.characters.push(newCharacter);
      state.activeCharacterId = newCharacter._id;
    },
    setSelectedCategory: (state, action: PayloadAction<MinifigPartType>) => {
      state.selectedCategory = action.payload;
    },

    /* Updates the selected minifig part eg., if the part is an accessory -> handles multiple slot
     *   for other parts (hair, head, torso, legs) -> replaces or removes the part
     */

    setSelectedPart: (state, action: PayloadAction<SetSelectedPartPayload>) => {
      const character = state.characters.find((char) => char._id === state.activeCharacterId);
      if (!character) return;

      const { minifig_part_type, data, slotIndex } = action.payload;

      if (minifig_part_type === 'accessory') {
        let targetSlot = slotIndex;
        if (targetSlot === undefined) {
          // Find first empty slot or use slot 0 if all are full
          targetSlot = character.selectedItems.accessory?.findIndex((slot) => slot === null) ?? 0;
          if (targetSlot === -1) targetSlot = 0;
        }

        if (data) {
          // Adding accessory to specific slot
          character.accessory[targetSlot] =
            data.product_images[0]?.url || BaseMinifigParts[MinifigPartType.ACCESSORY].image;
          if (!character.selectedItems.accessory) {
            character.selectedItems.accessory = Array(4).fill(null);
          }
          character.selectedItems.accessory[targetSlot] = data;
        } else {
          // Removing accessory from specific slot
          character.accessory[targetSlot] = BaseMinifigParts[MinifigPartType.ACCESSORY].image;
          if (character.selectedItems.accessory) {
            character.selectedItems.accessory[targetSlot] = null;
          }
        }
        return;
      }

      const partKey = minifig_part_type as 'hair' | 'head' | 'torso' | 'legs';
      const selectedItemsPartKey = minifig_part_type as 'hair' | 'head' | 'torso' | 'legs';

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
      state.activeCharacterId = action.payload;
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
    removePart: (state, action: PayloadAction<RemovePartPayload>) => {
      const character = state.characters.find((char) => char._id === state.activeCharacterId);
      if (!character) return;

      const { partType, slotIndex } = action.payload;
      const partTypeKey = partType.toLowerCase();

      if (partTypeKey === 'accessory') {
        if (slotIndex !== undefined) {
          character.accessory[slotIndex] = BaseMinifigParts[partType].image;
          if (character.selectedItems.accessory) {
            character.selectedItems.accessory[slotIndex] = null;
          }
        } else {
          character.accessory = Array(4).fill(BaseMinifigParts[partType].image);
          character.selectedItems.accessory = Array(4).fill(null);
        }
      } else {
        // Handle single parts (hair, head, torso, legs)
        const singlePartKey = partTypeKey as 'hair' | 'head' | 'torso' | 'legs';
        character[singlePartKey] = BaseMinifigParts[partType].image;
        delete character.selectedItems[singlePartKey];
      }
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
