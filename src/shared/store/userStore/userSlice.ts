import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, fetchUserData, registerUser } from "../../Services/authService";
import { setAccessToken } from "../tokenStore/tokenSlice.ts";
import { AppDispatch } from "../store";

// Interfaces
interface User {
    id: string;
    userName: string;
    email: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

// Async Thunks
export const login = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string; dispatch: AppDispatch }
>(
    "user/login",
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const userData = await loginUser(email, password);

            dispatch(setAccessToken(userData.accessToken));

            return userData.user;
        } catch (error: any) {
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

export const register = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string; dispatch: AppDispatch }
>(
    "user/register",
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const userData = await registerUser(email, password);

            dispatch(setAccessToken(userData.accessToken));

            return userData.user;
        } catch (error: any) {
            return rejectWithValue(error.message || "Registration failed");
        }
    }
);

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
    "user/fetchUser",
    async (_, thunkAPI) => {
        try {
            const userData = await fetchUserData();
            return {
                id: userData.id,
                userName: userData.userName,
                email: userData.email,
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Fetching user data failed");
        }
    }
);

// Slices
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Unknown error occurred";
            })
            // REGISTER
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Unknown error occurred";
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch user data";
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
