import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage if exists
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedCurrentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const initialState = {
  users: storedUsers,
  currentUser: storedCurrentUser,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp: (state, action) => {
      const { name, email, password } = action.payload;
      const exists = state.users.find((u) => u.email === email);

      if (exists) {
        state.message = "User already exists, please login.";
      } else {
        const newUser = { name, email, password };
        state.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(state.users));

        state.currentUser = newUser;
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        state.message = "Signup successful!";
      }
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email && u.password === password);

      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        state.message = `Welcome, ${user.name}!`;
      } else {
        state.message = "Invalid credentials.";
      }
    },

    clearMessage: (state) => {
      state.message = "";
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      state.message = "Logged out.";
    }
  },
});

export const { signUp, login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
