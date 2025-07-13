import { combineReducers } from '@reduxjs/toolkit';
import minifigBuilder from './minifigBuilder/minifigBuilderSlice';
import MinifigBuilderCart from './shoppingCart/CartSlice';
import Snackbar from './snackbar/SnackbarSlice';

const rootReducer = combineReducers({ minifigBuilder, MinifigBuilderCart, Snackbar });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
