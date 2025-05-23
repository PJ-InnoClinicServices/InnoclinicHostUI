import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../shared/store/userStore/userSlice.ts";
import tokenReducer from "./tokenStore/tokenSlice.ts";
import doctorReducer from "../../shared/store/doctorStore/doctorSlice.ts";
import appointmentReducer from '../../shared/store/appointmentStore/appointmentSlice.ts'

export const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
        doctors: doctorReducer,
        appointments: appointmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
