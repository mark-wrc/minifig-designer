import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISnackbarMessages {
  key: number;
  message: string;
}

export interface ISnackbarState {
  open: boolean;
  snackbarMessages: ISnackbarMessages[];
}

const initialState: ISnackbarState = {
  open: false,
  snackbarMessages: [],
};

const SnackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<ISnackbarMessages>) => {
      state.open = true;
      state.snackbarMessages.push(action.payload);
    },

    closeSnackbar: (state) => {
      state.open = false;
    },

    clearSnackbar: (state) => {
      state.open = false;
      state.snackbarMessages = [];
    },
  },
});

export const { openSnackbar, clearSnackbar, closeSnackbar } = SnackbarSlice.actions;
export default SnackbarSlice.reducer;
