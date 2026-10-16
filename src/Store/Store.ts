import { configureStore } from "@reduxjs/toolkit";
import  Redux  from "./Redux";

export const Store = configureStore({
    reducer: {
        data: Redux
    }
})