import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuth";

export default configureStore({
    reducer: {
        userAuth: userAuthReducer,
    },
});
