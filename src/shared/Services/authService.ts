import api from "../Config/axiosConfig.ts"
import { API_URLS } from "../Config/api.ts";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post(API_URLS.login, { email, password });
        return response.data;
    } catch (error) {
        throw new Error("Login failed");
    }
};

export const fetchUserData = async () => {
    try {
        const response = await api.get(API_URLS.user_data);
        return response.data;
    } catch (error) {
        throw new Error("Fetching user data failed");
    }
};

export const registerUser = async (email: string, password: string) => {
    try {
        const response = await api.post(API_URLS.register, { email, password });
        return response.data;
    } catch (error) {
        throw new Error("Registration failed");
    }
};

export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const response = await api.post(API_URLS.refresh);
        return response.data.accessToken;
    } catch (error) {
        return null;
    }
};
