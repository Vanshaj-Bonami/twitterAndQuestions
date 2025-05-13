import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, refreshToken, registerUser } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/authMiddleware";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshToken)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)

export default router