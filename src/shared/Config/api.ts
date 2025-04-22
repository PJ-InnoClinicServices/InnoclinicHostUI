export const API_BASE_AUTH_URL = "http://localhost:8084";
export const API_BASE_DOCTORS_URL = "https://localhost:44357"
export const API_BASE_APPOINTMENTS_URL = "https://localhost:44353";

export const API_URLS =
    {
    // auth
    login: `${API_BASE_AUTH_URL}/login`,
    refresh: `${API_BASE_AUTH_URL}/refresh`,
    register: `${API_BASE_AUTH_URL}/register`,
    user_data: `${API_BASE_AUTH_URL}/users/me`,
    update_user: `${API_BASE_AUTH_URL}/users/update`,

    // doctors
    all_doctors: `${API_BASE_DOCTORS_URL}/api/doctors`,
    doctor_by_id: (id:string) => `${API_BASE_DOCTORS_URL}/api/doctors/${id}`,
    create_doctor: `${API_BASE_DOCTORS_URL}/api/doctors`,
    update_doctor: (id:string) => `${API_BASE_DOCTORS_URL}/api/doctors/${id}`,
    delete_doctor: (id:string) => `${API_BASE_DOCTORS_URL}/api/doctors/${id}`,

    // appointments
    all_appointments: `${API_BASE_APPOINTMENTS_URL}/api/appointments/all`,
    appointment_by_id: (id:string) => `${API_BASE_APPOINTMENTS_URL}/api/appointments/${id}`,
    create_appointment: `${API_BASE_APPOINTMENTS_URL}/api/appointments`,
    update_appointment: (id:string) => `${API_BASE_APPOINTMENTS_URL}/api/appointments/${id}`,
    delete_appointment: (id:string) => `${API_BASE_APPOINTMENTS_URL}/api/appointments/${id}`,
    filter_appointments: (queryParams:string) => `${API_BASE_APPOINTMENTS_URL}/api/appointments/filter?${queryParams}`,

};
