import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const encryptorTransform = encryptTransform({
  secretKey: 'p5XGopUWzFelIo8wONy4f36uqcTnc8vFPsi+C4gXTtc=',
  onError: function (error) {
    console.error('Redux Persist Encryption Error:', error);
  },
});

const persistConfig = {
  key: 'root',
  storage,
  transform: [encryptorTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default rootReducer;
