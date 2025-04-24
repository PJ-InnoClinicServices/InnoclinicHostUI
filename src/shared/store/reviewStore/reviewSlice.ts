import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getReviews,
    getReviewById,
    createReview,
    updateReviewById,
    deleteReviewById, getReviewByAppointmentId
} from "../../Services/reviewService.ts";

interface Review {
    id: string;
    doctorId: string;
    patientId: string;
    appointmentId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

interface ReviewState {
    reviews: Review[];
    selectedReview: Review | null;
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    selectedReview: null,
    loading: false,
    error: null
};

export const resetReviews = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        clearReviews: (state) => {
            state.reviews = [];
            state.selectedReview = null;
            state.loading = false;
            state.error = null;
        }
    }
});

export const fetchReviews = createAsyncThunk("reviews/fetchAll", async (_, { rejectWithValue }) => {
    try {
        return await getReviews();
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Error fetching reviews");
    }
});

export const fetchReviewById = createAsyncThunk("reviews/fetchById", async (id: string, { rejectWithValue }) => {
    try {
        return await getReviewById(id);
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Error fetching review");
    }
});

export const fetchReviewByAppointmentId = createAsyncThunk(
    "reviews/fetchByAppointmentId",
    async (appointmentId: string, { rejectWithValue }) => {
        try {
            return await getReviewByAppointmentId(appointmentId);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Error fetching review by appointment ID");
        }
    }
);

export const createNewReview = createAsyncThunk("reviews/create", async (reviewData: Omit<Review, "id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
        return await createReview(reviewData);
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Error creating review");
    }
});

export const updateReview = createAsyncThunk("reviews/update", async ({ id, reviewData }: { id: string; reviewData: Partial<Review> }, { rejectWithValue }) => {
    try {
        return await updateReviewById(id, reviewData);
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Error updating review");
    }
});

export const deleteReview = createAsyncThunk("reviews/delete", async (id: string, { rejectWithValue }) => {
    try {
        await deleteReviewById(id);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Error deleting review");
    }
});

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {

        clearReviews: (state) => {
            state.reviews = [];
            state.selectedReview = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchReviewByAppointmentId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewByAppointmentId.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedReview = action.payload;
            })
            .addCase(fetchReviewByAppointmentId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchReviewById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviewById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedReview = action.payload;
            })
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createNewReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews.push(action.payload);
            })
            .addCase(createNewReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.map((review) =>
                    review.id === action.payload.id ? action.payload : review
                );
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.filter((review) => review.id !== action.payload);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
