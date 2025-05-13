import { NODE_ENV, REFRESH_TOKEN_SECRET } from "../config/env";
import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        // validateBeforeSave => This tells Mongoose not to run schema validation before saving.
        // You're disabling it here because you're only updating the refreshToken field and 
        // don't want Mongoose to complain about other fields (like password) being unchanged or already hashed.
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Somwthing Went Wrong While Generating Refresh and Access Token")
    }
}

const registerUser = asyncHandler(
    async (req, res) => {

        // check for the required fields
        const { username, fullname, email, password } = req.body;
        if ([username, fullname, email, password].some((field) => field.trim() === "")) {
            throw new ApiError(400, "all fields are compulsory")
        }

        // check for existing user 
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            throw new ApiError(409, "user with email or username already exists")
        }

        const user = await User.create({
            fullname,
            username: username.toLowerCase(),
            email,
            password
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        // select is for excluding fields which we don't want to send to user.

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(new ApiResponse(200, createdUser, "User Registered Successfully"))
    }
)

const loginUser = asyncHandler(
    async (req, res) => {
        const { email, username, password } = req.body;

        if (!(username || email)) {
            throw new ApiError(400, "username or email is required")
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            throw new ApiError(404, "User does not exist")
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        // console.log(isPasswordValid)

        if (!isPasswordValid) {
            throw new ApiError(403, "Invalid user credentials")
        }

        const today = new Date().toDateString();
        const lastLoginDate = user.lastLoginAt?.toDateString();
        console.log(today, "today", lastLoginDate, "lastLoginDate")

        if (!lastLoginDate || lastLoginDate !== today) {
            user.creditPoints += 1;
        }
        user.lastLoginAt = new Date();
        await user.save({ validateBeforeSave: false });

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id.toString());

        console.log(accessToken, "\n", refreshToken)
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        // select is for excluding fields which we don't want to send to user

        const options = {
            httpOnly: true, // securing cookies so that they won't be modified by client
            secure: NODE_ENV === 'production',
            sameSite: 'strict' as const,
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken,
            }, "User Logged in Successfully"))
    }
)

const logoutUser = asyncHandler(
    async (req, res) => {
        // remove cookies abd refresh token
        await User.findByIdAndUpdate(req.user?._id,
            {
                $set: { refreshToken: undefined }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true, // securing cookies so that they won't be modified by client
            secure: NODE_ENV === 'production',
            sameSite: 'strict' as const,
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged out successfully"))
    }
)

const refreshToken = asyncHandler(
    async (req, res) => {
        // check for the incoming refresh token
        const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Refresh Token not found");
        }
        try {
            const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;

            const user = await User.findById(decodedToken?._id);

            if (!user) {
                throw new ApiError(404, "User not found");
            }

            if (incomingRefreshToken !== user?.refreshToken) {
                throw new ApiError(403, "Refresh Token Expired or used")
            }

            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id.toString());

            // Update refresh token in DB
            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });
            const options = {
                httpOnly: true, // securing cookies so that they won't be modified by client
                secure: NODE_ENV === 'production',
                sameSite: 'strict' as const,
            }

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(new ApiResponse(200, { accessToken, refreshToken }, "Token Refreshed Successfully"))

        } catch (error: any) {
            throw new ApiError(403, "Invalid or expired refresh token");
        }
    }
)

const getCurrentUser = asyncHandler(
    async (req, res) => {
        return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched Successfully"))
    }
)

export { registerUser, loginUser, logoutUser, refreshToken, getCurrentUser }