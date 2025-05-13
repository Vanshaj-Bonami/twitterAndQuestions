import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`)
    }
    return value
}
export const ACCESS_TOKEN_SECRET = getEnvVar('ACCESS_TOKEN_SECRET');
export const REFRESH_TOKEN_SECRET = getEnvVar('REFRESH_TOKEN_SECRET');
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';
export const MONGO_URI = getEnvVar('MONGODB_URI');
export const PORT = getEnvVar('PORT');
export const NODE_ENV = process.env.NODE_ENV || 'development';