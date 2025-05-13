import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import the user router
import userRouter from "./routes/user.routes";
import tweetRouter from "./routes/tweet.routes";

app.use("/api/user", userRouter);
app.use("/api/tweet",tweetRouter);

export { app }