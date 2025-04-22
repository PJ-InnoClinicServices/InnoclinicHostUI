import api from "../Config/axiosConfig.ts";
// @ts-ignore
import { API_URLS } from "../Config/api.ts";

type UpdateUserPayload = {
    id: string;
    username: string;
    email: string;
};

export const updateUser = async ({ id, username, email }: UpdateUserPayload) => {
    try {
        const response = await api.put(`${API_URLS.update_user}/${id}`, { username, email });
        return response.data;
    } catch (error) {
        throw new Error("Updating user failed");
    }
};
