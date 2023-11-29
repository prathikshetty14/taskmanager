import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./reducers/taskReducer";

export const store = configureStore({
    reducer: {
        taskReducer
    }
})