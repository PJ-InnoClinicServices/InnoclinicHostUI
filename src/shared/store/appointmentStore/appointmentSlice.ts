import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAppointments, getAppointmentById, createAppointment, updateAppointmentById, deleteAppointmentById, filterAppointments } from "../../Services/appointmentService";
import { AppDispatch } from "../store";

// Interfaces
interface Appointment {
    id: string;
    appointmentDate: string;
    reason: string;
    status: string;
    doctorId: string;
    placeId: string;
}

interface AppointmentState {
    appointments: Appointment[];
    loading: boolean;
    error: string | null;
}

const initialState: AppointmentState = {
    appointments: [],
    loading: false,
    error: null,
};

// Async Thunks
export const fetchAppointments = createAsyncThunk<Appointment[], void, { rejectValue: string; dispatch: AppDispatch }>(
    "appointments/fetchAppointments",
    async (_, { rejectWithValue }) => {
        try {
            return await getAppointments();
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch appointments");
        }
    }
);

export const fetchAppointmentById = createAsyncThunk<Appointment, string, { rejectValue: string; dispatch: AppDispatch }>(
    "appointments/fetchAppointmentById",
    async (id: string, { rejectWithValue }) => {
        try {
            return await getAppointmentById(id);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch appointment by ID");
        }
    }
);

export const addAppointment = createAsyncThunk<Appointment, { appointmentDate: string; reason: string; doctorId: string; placeId: string }, { rejectValue: string; dispatch: AppDispatch }>(
    "appointments/addAppointment",
    async (appointmentData, { rejectWithValue }) => {
        try {
            return await createAppointment(appointmentData);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to create appointment");
        }
    }
);

export const updateAppointment = createAsyncThunk<Appointment, { id: string; appointmentDate: string; reason: string; doctorId: string; placeId: string }, { rejectValue: string; dispatch: AppDispatch }>(
    "appointments/updateAppointment",
    async (appointmentData, { rejectWithValue }) => {
        try {
            return await updateAppointmentById(appointmentData.id, appointmentData);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to update appointment");
        }
    }
);

export const deleteAppointment = createAsyncThunk<void, string, { rejectValue: string; dispatch: AppDispatch }>(
    "appointments/deleteAppointment",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteAppointmentById(id);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to delete appointment");
        }
    }
);

export const filterAppointmentsByQuery = createAsyncThunk<Appointment[], string, { rejectValue: string; dispatch: AppDispatch }>(
    "appointments/filterAppointmentsByQuery",
    async (queryParams: string, { rejectWithValue }) => {
        try {
            return await filterAppointments(queryParams);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to filter appointments");
        }
    }
);

// Slice
const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // FETCH APPOINTMENTS
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch appointments";
            })
            // FETCH APPOINTMENT BY ID
            .addCase(fetchAppointmentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointmentById.fulfilled, (state, action) => {
                state.loading = false;
                const existingIndex = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
                if (existingIndex >= 0) {
                    state.appointments[existingIndex] = action.payload;
                } else {
                    state.appointments.push(action.payload);
                }
            })
            .addCase(fetchAppointmentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch appointment";
            })
            // ADD APPOINTMENT
            .addCase(addAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments.push(action.payload);
            })
            .addCase(addAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to add appointment";
            })
            // UPDATE APPOINTMENT
            .addCase(updateAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.appointments.findIndex((appointment) => appointment.id === action.payload.id);
                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
            })
            .addCase(updateAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to update appointment";
            })
            // DELETE APPOINTMENT
            .addCase(deleteAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = state.appointments.filter((appointment) => appointment.id !== action.meta.arg);
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to delete appointment";
            })
            // FILTER APPOINTMENTS
            .addCase(filterAppointmentsByQuery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(filterAppointmentsByQuery.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(filterAppointmentsByQuery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to filter appointments";
            });
    },
});

export default appointmentSlice.reducer;
