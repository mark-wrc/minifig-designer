import { combineReducers } from '@reduxjs/toolkit';
import minifigBuilder from './minifigBuilder/minifigBuilderSlice';
import MinifigBuilderCart from './shoppingCart/CartSlice';

const rootReducer = combineReducers({ minifigBuilder, MinifigBuilderCart });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
