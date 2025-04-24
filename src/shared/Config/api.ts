export const API_BASE_URL = "http://localhost:7452/ocelot/api";

export const API_URLS =
    {
            // auth
            login: `${API_BASE_URL}/login`,
            refresh: `${API_BASE_URL}/refresh`,
            register: `${API_BASE_URL}/register`,
            user_data: `${API_BASE_URL}/users/me`,
            update_user: `${API_BASE_URL}/users/update`,

            // doctors
            all_doctors: `${API_BASE_URL}/doctors`,
            doctor_by_id: (id: string) => `${API_BASE_URL}/doctors/${id}`,
            create_doctor: `${API_BASE_URL}/doctors`,
            update_doctor: (id: string) => `${API_BASE_URL}/doctors/${id}`,
            delete_doctor: (id: string) => `${API_BASE_URL}/doctors/${id}`,

            // appointments
            all_appointments: `${API_BASE_URL}/appointments/all`,
            appointment_by_id: (id: string) => `${API_BASE_URL}/appointments/${id}`,
            create_appointment: `${API_BASE_URL}/appointments`,
            update_appointment: (id: string) => `${API_BASE_URL}/appointments/${id}`,
            delete_appointment: (id: string) => `${API_BASE_URL}/appointments/${id}`,
            filter_appointments: () => `${API_BASE_URL}/appointments/filter`,

            // reviews
            all_reviews: `${API_BASE_URL}/reviews`,
            review_by_appointment: (appointmentId: string) => `${API_BASE_URL}/reviews/appointment/${appointmentId}`,
            review_by_id: (id: string) => `${API_BASE_URL}/reviews/${id}`,
            create_review: `${API_BASE_URL}/reviews`,
            update_review: (id: string) => `${API_BASE_URL}/reviews/${id}`,
            delete_review: (id: string) => `${API_BASE_URL}/reviews/${id}`,
    };
