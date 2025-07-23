import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('fetchData', async () => {
    try {
        const response = await axios('https://dummyjson.com/products?limit=500');
        return response.data;
    } catch (err) {
        console.log('error', err);
        throw err;
    }
});

const dataSlice = createSlice({
    name: 'fetchData',
    initialState: {
        clickedProduct: null,
        isLoading: false,
        isError: false,
        data: null,
        errorMsg: '',
        currency: '$'
    },
    reducers: {
        filteredProduct: (state, action) => {
            state.clickedProduct = state.data.products.find((product) => product.id === action.payload);
        },
        currencyFilter: (state, action) => {
            const currency = action.payload.toUpperCase();

            if (state.data?.products) {
                let conversionRate = 1;

                switch (currency) {
                    case "INR":
                        conversionRate = 85;
                        state.currency = "₹"
                        break;
                    case "EUR":
                        conversionRate = 0.91;
                        state.currency = "€"
                        break;
                    case "GBP":
                        conversionRate = 0.76;
                        state.currency = "£"
                        break;
                    case "JPY":
                        conversionRate = 157.57;
                        state.currency = "¥"
                        break;
                    case "USD":
                        conversionRate = 1;
                        state.currency = "$"
                        break;
                    default:
                        return;
                }

                state.data.products = state.data.products.map((product) => ({
                    ...product,
                    price:(product.originalPrice * conversionRate).toFixed(2)
                }));
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = {
                ...action.payload,
                products: action.payload.products.map((product) => ({
                    ...product,
                    originalPrice: product.price,
                    price: product.price
                }))
            };
        });

        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchData.rejected, (state, action) => {
            state.isError = true;
            state.errorMsg = action.error.message;
        });
    }
});

export const { filteredProduct, currencyFilter } = dataSlice.actions;
export default dataSlice.reducer;
