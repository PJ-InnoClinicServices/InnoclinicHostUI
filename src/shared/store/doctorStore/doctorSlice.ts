import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDoctors, getDoctorById, createDoctor, updateDoctorById, deleteDoctorById } from "../../Services/doctorService";
import { AppDispatch } from "../store";

// Interfaces
interface Doctor {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    specialty: string;
    licenseNumber: string;
    dateOfBirth: string;
    dateJoined: string;
}

interface DoctorState {
    doctors: Doctor[];
    loading: boolean;
    error: string | null;
}

const initialState: DoctorState = {
    doctors: [],
    loading: false,
    error: null,
};
// Async Thunks
export const fetchDoctors = createAsyncThunk<Doctor[], void, { rejectValue: string; dispatch: AppDispatch }>(
    "doctors/fetchDoctors",
    async (_, { rejectWithValue }) => {
        try {
            return await getDoctors();
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch doctors");
        }
    }
);

export const fetchDoctorById = createAsyncThunk<Doctor, string, { rejectValue: string; dispatch: AppDispatch }>(
    "doctors/fetchDoctorById",
    async (id: string, { rejectWithValue }) => {
        try {
            return await getDoctorById(id);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch doctor by ID");
        }
    }
);

export const addDoctor = createAsyncThunk<Doctor, { firstName: string; lastName: string; phoneNumber: string; specialty: string }, { rejectValue: string; dispatch: AppDispatch }>(
    "doctors/addDoctor",
    async (doctorData, { rejectWithValue }) => {
        try {
            return await createDoctor(doctorData);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to create doctor");
        }
    }
);

export const updateDoctor = createAsyncThunk<Doctor, { id: string; firstName: string; lastName: string; phoneNumber: string; specialty: string }, { rejectValue: string; dispatch: AppDispatch }>(
    "doctors/updateDoctor",
    async (doctorData, { rejectWithValue }) => {
        try {
            return await updateDoctorById(doctorData.id, doctorData);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to update doctor");
        }
    }
);

export const deleteDoctor = createAsyncThunk<void, string, { rejectValue: string; dispatch: AppDispatch }>(
    "doctors/deleteDoctor",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteDoctorById(id);
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to delete doctor");
        }
    }
);


// Slice
const doctorSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch doctors";
            })

            .addCase(fetchDoctorById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDoctorById.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = [action.payload];
            })
            .addCase(fetchDoctorById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch doctor";
            })

            .addCase(addDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors.push(action.payload);
            })
            .addCase(addDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to add doctor";
            })

            .addCase(updateDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDoctor.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.doctors.findIndex((doctor) => doctor.id === action.payload.id);
                if (index !== -1) {
                    state.doctors[index] = action.payload;
                }
            })
            .addCase(updateDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to update doctor";
            })

            .addCase(deleteDoctor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = state.doctors.filter((doctor) => doctor.id !== action.meta.arg);
            })
            .addCase(deleteDoctor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to delete doctor";
            });
    },
});

export default doctorSlice.reducer;
