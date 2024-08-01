// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as storage engine
import ingredientsReducer from './ingredientsSlice';
import cartReducer from './cartSlice';

// Create configuration for redux-persist
const ingredientsPersistConfig = {
  key: 'ingredients', // Key for storing ingredients data in localStorage
  storage,            // Define the storage engine
};

const cartPersistConfig = {
  key: 'cart',        // Key for storing cart data in localStorage
  storage,            // Define the storage engine
};

// Create persisted reducers for cart and ingredients
const persistedIngredientsReducer = persistReducer(
  ingredientsPersistConfig,
  ingredientsReducer
);

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);

// Configure the store with persisted reducers
const store = configureStore({
  reducer: {
    ingredients: persistedIngredientsReducer, // Use persisted reducer for ingredients
    cart: persistedCartReducer,               // Use persisted reducer for cart
  },
  // Optionally add middleware and devTools options if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check (use cautiously)
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

// Create persistor to manage the persisted state
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
