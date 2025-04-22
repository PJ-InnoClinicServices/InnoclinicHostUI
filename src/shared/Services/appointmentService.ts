import api from "../Config/axiosConfig.ts";
import { API_URLS } from "../Config/api.ts";

export const getAppointments = async () => {
    const response = await api.get(API_URLS.all_appointments);
    return response.data;
};

export const getAppointmentById = async (id: string) => {
    const response = await api.get(API_URLS.appointment_by_id(id));
    return response.data;
};

export const createAppointment = async (appointmentData: {
    appointmentDate: string;
    reason: string;
    doctorId: string;
    placeId: string;
}) => {
    const response = await api.post(API_URLS.create_appointment, appointmentData);
    return response.data;
};

export const updateAppointmentById = async (id: string, appointmentData: {
    appointmentDate: string;
    reason: string;
    doctorId: string;
    placeId: string;
}) => {
    const response = await api.put(API_URLS.update_appointment(id), appointmentData);
    return response.data;
};

export const deleteAppointmentById = async (id: string) => {
    await api.delete(API_URLS.delete_appointment(id));
};

export const filterAppointments = async (queryParams: string) => {
    const response = await api.get(API_URLS.filter_appointments(queryParams));
    return response.data;
};
