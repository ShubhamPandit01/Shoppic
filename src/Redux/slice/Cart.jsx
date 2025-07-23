import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  total: {
    price: 0,
    finalAmount: 0,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cartItems.find(item => item.id === action.payload.id);

      if (existing) {
        if (existing.quantity < action.payload.stock) {
          existing.quantity += 1;
        } else alert("Maximum stock reached")

      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },


    clearCart: (state) => {
      state.cartItems = []
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(product => product.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(product => product.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    calculateTotal: (state) => {
      let totalPrice = 0;
      state.cartItems.forEach(item => {
        totalPrice += +item.price * item.quantity;
      });
      state.total.price = totalPrice;
      state.total.finalAmount = totalPrice;
    }
  }
});

export const {
  addToCart,
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  calculateTotal
} = cartSlice.actions;

export default cartSlice.reducer;
