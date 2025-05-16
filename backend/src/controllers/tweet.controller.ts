import { Tweet } from "../models/tweet.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createTweet = asyncHandler(
    async (req, res) => {
        const { content, media } = req.body;
        console.log(content, media)
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

const getTweets = asyncHandler(
    async (req, res) => {
        const tweets = await Tweet.find()
            .populate({
                path: "author", // Referring to the 'author' field in Tweet model
                select: "-refreshToken -password", // Exclude refreshToken from the populated user document
            })
            .sort({ createdAt: -1 });

        return res.status(200).json(new ApiResponse(200, tweets, "Tweets Fetched Successfully"));
    }
)

export { createTweet, getTweets }