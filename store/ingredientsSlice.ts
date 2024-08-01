// store/ingredientsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IngredientState {
  ingredients: { [key: number]: number }; // Mapping of ingredient ID to count
}

const initialState: IngredientState = {
  ingredients: {},
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    incrementCount(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.ingredients[id] = (state.ingredients[id] || 0) + 1;
    },
    decrementCount(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.ingredients[id] > 0) {
        state.ingredients[id] -= 1;
      }
    },
    setCount(state, action: PayloadAction<{ id: number; count: number }>) {
      const { id, count } = action.payload;
      state.ingredients[id] = count;
    },
    resetCounts(state) {
      state.ingredients = {};
    },
  },
});

export const { incrementCount, decrementCount, setCount,resetCounts } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
