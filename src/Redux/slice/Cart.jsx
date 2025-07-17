
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  total: {
    price:0,
    finalAmount: 0
  },
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

      addToCart: (state, action) => {
        const exists = state.cartItems.find(item => item.id === action.payload.id);
        if (!exists) {
          state.cartItems.push(action.payload);
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      },

      removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      },

      clearCart: (state) => {
        state.cartItems = [];
        localStorage.removeItem("cartItems");
      },
      
      calculateTotal: (state) => {
        state.total.price = state.cartItems.reduce((sum, item) => sum + (+item.price), 0);
        state.total.finalAmount = state.total.price + ((state.total.price*18)/100) + 4
      }
    },
});



export const { addToCart, removeFromCart, clearCart, calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;
