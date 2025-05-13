import connectDB from "./db";
import { app } from "./app";
import { PORT } from "./config/env";

connectDB()
    .then(() => {
        app.listen(PORT || 4000, () => {
            console.log(`Server is Running at Port : ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(`MongoDB Connection failed !!!`, err)
    })