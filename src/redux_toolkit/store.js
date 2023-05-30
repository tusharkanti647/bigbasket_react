

import { configureStore } from "@reduxjs/toolkit";
import getProduvtSlices from "./slices/getProduvtSlices";
import basketProductArrSlices from "./slices/basketProductArraySlice";
import functionSlices from "./slices/functionSlices";

const store=configureStore({
    reducer: {
        getproduct : getProduvtSlices,
        basketProductArr : basketProductArrSlices,
        functionSlices:functionSlices,
    }
});

export default store;