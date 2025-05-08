import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
// import rootReducer from './rootReducer';

// const persistConfig = {
//   key: 'root',
//   storage: sessionStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {},
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type Appdispatch = typeof store.dispatch;
export type AppStore = typeof store;
