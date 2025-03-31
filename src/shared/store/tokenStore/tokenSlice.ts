import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TokenState {
    accessToken: string | null;
}

const initialState: TokenState = {
    accessToken: null,
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        clearAccessToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const { setAccessToken, clearAccessToken } = tokenSlice.actions;
export const selectAccessToken = (state: RootState) => state.token.accessToken;
export default tokenSlice.reducer;
