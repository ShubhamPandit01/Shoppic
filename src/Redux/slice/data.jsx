import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData = createAsyncThunk('fetchData', async()=>{
    try{
        const response = await axios('https://dummyjson.com/products?limit=500')
        return response.data
    } catch(err){
        console.log('error', err)
        throw err
    }
})

const dataSlice = createSlice({
    name :'fetchData',
    initialState: {
        clickedProduct: null,
        isLoading:false,
        isError: false,
        data:null,
        errorMsg: ''
    },
    reducers: {
        filteredProduct: (state, action) => {
            state.clickedProduct = state.data.products.find((product) => product.id === action.payload);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchData.fulfilled, (state,action)=>{
            state.isLoading = false
            state.data = action.payload;
        })

        builder.addCase(fetchData.pending, (state, action)=>{
            state.isLoading = true
        })

        builder.addCase(fetchData.rejected, (state, action)=>{
            errorMsg = action.payload
            state.isError = true
        })
    }
})

export const {filteredProduct} = dataSlice.actions
export default dataSlice.reducer