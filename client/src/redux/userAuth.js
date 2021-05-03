import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        user: JSON.parse(localStorage.getItem("bdwUser")) || null,
        isAuthenticated:
            localStorage.getItem("bdwUser") === null ? false : true,
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("bdwUser", JSON.stringify(action.payload));
        },

        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            try {
                localStorage.removeItem("bdwUser");
            } catch (e) {
                console.log(e);
            }
        },
    },
});

export const { loginUser, logoutUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
