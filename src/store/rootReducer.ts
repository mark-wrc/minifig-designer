import { combineReducers } from '@reduxjs/toolkit';
import minifigBuilder from './minifigBuilder/minifigBuilderSlice';
import MinifigBuilderCart from './shoppingCart/CartSlice';
import Snackbar from './snackbar/SnackbarSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const minifigBuilderPersistConfig = {
  key: 'minifigBuilder',
  storage,
  //   blacklist: ['selectedCategory'],
};

const rootReducer = combineReducers({
  minifigBuilder: persistReducer(minifigBuilderPersistConfig, minifigBuilder),
  MinifigBuilderCart,
  Snackbar,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
