// Importujemy funkcje z API
import api from "../Config/axiosConfig.ts";
import { API_URLS } from "../Config/api.ts";

export const getDoctors = async () => {
    const response = await api.get(API_URLS.all_doctors);
    return response.data;
};

export const getDoctorById = async (id: string) => {
    const response = await api.get(API_URLS.doctor_by_id(id));
    return response.data;
};

export const createDoctor = async (doctorData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    specialty: string;
}) => {
    const response = await api.post(API_URLS.create_doctor, doctorData);
    return response.data;
};

export const updateDoctorById = async (id: string, doctorData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    specialty: string;
}) => {
    const response = await api.put(API_URLS.update_doctor(id), doctorData);
    return response.data;
};

export const deleteDoctorById = async (id: string) => {
    await api.delete(API_URLS.delete_doctor(id));
};
