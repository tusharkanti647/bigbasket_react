import { createSlice } from "@reduxjs/toolkit";



const functionSlices = createSlice({
    name: "functions",
    initialState: {
        //productCount: 0,
        searchName: "",
        filterArr: [],
        isAddProduct:false,
    },
    reducers: {
        // basketProductCount: (state, action) => {
        //     //console.log(state.productCount);
        //     //console.log(action.payload);
        //     state.productCount = action.payload;
        //     //console.log(state.productCount);
        // },

        isAddProductReducer:(state, action) =>{
            state.isAddProduct=action.payload;
        },

        searchNameReducer: (state, action) => {
            state.searchName = action.payload;
        },

        filterArrReducer: (state, action) => {
            state.filterArr = action.payload;
        }
    }
});

export const { searchNameReducer, filterArrReducer,isAddProductReducer } = functionSlices.actions;
export default functionSlices.reducer;