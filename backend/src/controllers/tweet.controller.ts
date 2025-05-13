import { Tweet } from "../models/tweet.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTweet = asyncHandler(
    async (req, res) => {
        const { content, media } = req.body;
        console.log(content,media)
        if (!content) {
            throw new ApiError(400, "all fields are compulsory")
        }
        const userId = req.user?._id;
        const tweet = await Tweet.create({ content, media, author: userId });

        if (!tweet) {
            throw new ApiError(400, "Error in creating Tweet")
        }

        return res.status(201).json(new ApiResponse(200, tweet, "Tweet Created Successfully"))

    }
)

export { createTweet }