import { ApiResponse, ITweet } from "../types"
import api from "../utils";

export const createtweet = async (data: { content: string; media?: string[] }): Promise<ApiResponse<ITweet>> => {
    try {
        const response = await api.post<ApiResponse<ITweet>>("/api/tweet/create-tweet", data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getTweets = async (): Promise<ApiResponse<ITweet[]>> => {
    try {
        const response = await api.get<ApiResponse<ITweet[]>>("/api/tweet/get-tweets");
        return response.data;
    } catch (error) {
        throw error;
    }
}