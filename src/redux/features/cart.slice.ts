import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartListItems {
  _id: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartList: CartListItems[];
}

const initialState: CartState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartListItems>) => {
      const { _id } = action.payload;
      const existingItem = state.cartList.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartList.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const idToRemove = action.payload.id;
      const index = state.cartList.findIndex((item) => item._id === idToRemove);
      if (index !== -1) {
        const item = state.cartList[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartList.splice(index, 1);
        }
      }
    },
  },
});

const cartSliceReducer = cartSlice.reducer;
export default cartSliceReducer;
export const cartSliceActions = cartSlice.actions;
