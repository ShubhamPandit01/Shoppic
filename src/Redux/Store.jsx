import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice/data"
import cartReducer from "./slice/Cart"
import UserReducer from "./slice/UserSlice"



export const Store = configureStore({
    reducer:{
        data: dataReducer,
        cart: cartReducer,
        user: UserReducer,
    }
})

