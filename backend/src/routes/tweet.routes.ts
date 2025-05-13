import { Router } from "express";
import { createTweet } from "../controllers/tweet.controller";
import { verifyJWT } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create-tweet", verifyJWT, createTweet)

export default router;