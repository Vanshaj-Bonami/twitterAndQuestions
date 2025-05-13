import { ApiResponse, IUser, LoginInput, RegisterInput } from "../types";
import api from "../utils";

export const RegisterUser = async (data: RegisterInput): Promise<ApiResponse<IUser>> => {
    try {
        const response = await api.post<ApiResponse<IUser>>("/api/user/register", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const LoginUser = async (data: LoginInput): Promise<ApiResponse<IUser>> => {
    try {
        const response = await api.post<ApiResponse<IUser>>("/api/user/login", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async (): Promise<ApiResponse<IUser>> => {
    try {
        const response = await api.get<ApiResponse<IUser>>("/api/user/current-user");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const refreshToken = async (): Promise<ApiResponse<{accessToken:string, refreshToken:string}>> => {
    try {
        const response = await api.post<ApiResponse<{accessToken:string, refreshToken:string}>>("/api/user/refresh-token");
        return response.data;
    } catch (error) {
        throw error;
    }
}