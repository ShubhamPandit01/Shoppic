import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slice/data"
import cartReducer from "./slice/Cart"


export const Store = configureStore({
    reducer:{
        data: dataReducer,
        cart: cartReducer,
    }
})

