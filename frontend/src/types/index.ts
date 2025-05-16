export interface RegisterInput {
    username: string;
    fullname: string;
    email: string;
    password: string;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface IUser {
    _id: string;
    email: string;
    fullname: string;
    username: string;
    creditPoints: number;
    lastLoginAt: Date;
}

export interface ITweet {
    _id: string;
    content: string;
    media?: string[];
    author: IUser;
    createdAt: string;
}

export interface AuthContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    loading: boolean;
}

export interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T;
}