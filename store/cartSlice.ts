// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ingredientsData from '../public/data/ingredient.json'; // Import your ingredients data

interface CartItem {
  id: number;
  count: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  totalCal: number;
}

// Convert ingredients data to a map for quick lookup
const ingredientsMap = new Map<number, number>(
  ingredientsData.map((ingredient) => [ingredient.id, ingredient.calories])
);

const initialState: CartState = {
  items: [],
  total: 0,
  totalCal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ id: number; count: number }>) {
      const { id, count } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        // If item already exists, update count and adjust totals
        const previousCount = existingItem.count;
        existingItem.count = count;

        state.total += count - previousCount;
        state.totalCal += calculateTotalCalories(id, count) - calculateTotalCalories(id, previousCount);
      } else {
        // Add new item to the cart
        state.items.push({ id, count });
        state.total += count;
        state.totalCal += calculateTotalCalories(id, count);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        state.total -= existingItem.count;
        state.totalCal -= calculateTotalCalories(id, existingItem.count);
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    updateCartItem(state, action: PayloadAction<{ id: number; count: number }>) {
      const { id, count } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        const previousCount = existingItem.count;
        existingItem.count = count;

        state.total += count - previousCount;
        state.totalCal += calculateTotalCalories(id, count) - calculateTotalCalories(id, previousCount);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.totalCal = 0;
    },
  },
});

// Helper function to calculate total calories
const calculateTotalCalories = (id: number, count: number) => {
  const caloriePerUnit = ingredientsMap.get(id) || 0;
  return caloriePerUnit * count;
};

export const { addToCart, removeFromCart, updateCartItem ,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
