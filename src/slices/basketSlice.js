import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const product = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      const existingItem = state.items[existingItemIndex];

      if (existingItem) {
        // const updatedItem = {
        //   ...existingItem,
        //   quantity: existingItem.quantity + 1,
        // };

        // let updatedItems = state.items;

        // updatedItems[existingItemIndex] = updatedItem;

        // console.log(state.items);

        existingItem.quantity++;
      } else {
        state.items = [...state.items, product];
      }
    },
    removeFromBasket: (state, action) => {
      const productId = action.payload.id;

      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== productId);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

console.log(initialState.items);
console.log(
  initialState.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0)
);

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => {
  if (state.basket.items.length > 0) {
    return state.basket.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  } else {
    return 0;
  }
};

export default basketSlice.reducer;
