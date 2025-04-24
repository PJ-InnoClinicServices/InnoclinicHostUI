import api from "../Config/axiosConfig.ts";
import { API_URLS } from "../Config/api.ts";

export const getReviews = async () => {
    const response = await api.get(API_URLS.all_reviews);
    return response.data;
};

export const getReviewByAppointmentId = async (appointmentId: string) => {
    const response = await api.get(API_URLS.review_by_appointment(appointmentId));
    return response.data;
};

export const getReviewById = async (id: string) => {
    const response = await api.get(API_URLS.review_by_id(id));
    return response.data;
};

export const createReview = async (reviewData: {
    doctorId: string;
    patientId: string;
    appointmentId: string;
    rating: number;
    comment: string;
    status?: string;
}) => {
    const response = await api.post(API_URLS.create_review, reviewData);
    return response.data;
};

export const updateReviewById = async (id: string, reviewData: {
    rating?: number;
    comment?: string;
    status?: string;
}) => {
    const response = await api.put(API_URLS.update_review(id), reviewData);
    return response.data;
};

export const deleteReviewById = async (id: string) => {
    await api.delete(API_URLS.delete_review(id));
};
