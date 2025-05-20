import { combineReducers } from '@reduxjs/toolkit';
import minifigBuilder from './minifigBuilder/minifigBuilderSlice';

const rootReducer = combineReducers({ minifigBuilder });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
