import { createSlice } from "@reduxjs/toolkit";


//create the basket product array slices
const basketProductArraySlice = createSlice({
    name:"basketProductArray",
    initialState:[],
    reducers:{
        addToBasket: (state, action) => {
            state.push(action.payload);
        },
        removeFromBasket: (state, action) => {
            state.splice(action.payload, 1);
        },
        clearBasket: (state, action) => {
            state = [];
        },
    }
});

export const { addToBasket, removeFromBasket, clearBasket } = basketProductArraySlice.actions;
export default basketProductArraySlice.reducer;