import { Router } from "express";
import { createTweet, getTweets } from "../controllers/tweet.controller";
import { verifyJWT } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create-tweet", verifyJWT, createTweet)
router.get("/get-tweets", verifyJWT, getTweets)

export default router;