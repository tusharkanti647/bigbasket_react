
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductData = createAsyncThunk("fetchProduct/fetchProductData", async () => {
    const respons = await fetch("/addproduct");
    const data = await respons.json();
    return data;
})

const getProductSlices = createSlice({
    name: "getProduct",
    initialState: {
        entities: [], //array of buses
        status: "loded", // loading state
    },
    extraReducers: {
        // handle async actions: pending, fulfilled, rejected (for errors)
        [fetchProductData.pending](state) {
            state.status = "loading";
        },
        [fetchProductData.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "loded";
        },

        [fetchProductData.rejected](state) {
            state.status = "rejected";
        },

    },
});

export default getProductSlices.reducer;
