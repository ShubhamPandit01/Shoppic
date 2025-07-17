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
        isLoading:false,
        isError: false,
        data:null,
        errorMsg: ''
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

export default dataSlice.reducer