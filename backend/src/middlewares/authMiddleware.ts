import { ACCESS_TOKEN_SECRET } from "../config/env";
import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken"

export const verifyJWT = asyncHandler(
    async (req, res, next) => {
        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                throw new ApiError(401, "Unauthorized request");
            }

            const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload; // gives you the payload
            // if the token is expired jwt.verify throws a TokenExpiredError.
            // this is the expected behvaiour of jwt.verify

            const user = await User.findById(decodedToken._id).select("-password -refreshToken")

            if (!user) {
                throw new ApiError(401, "Unauthorized request");
            }

            (req as any).user = user;
            next();
        } catch (error) {
            console.log(error, "error")
            if (error instanceof TokenExpiredError) {
                return res.status(401).json(new ApiError(401, "Access token expired"));
            }
            next(error);
        }
    }
)