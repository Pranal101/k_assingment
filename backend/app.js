import express from 'express'
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoute.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
    cors({
        origin: 'http://localhost:5173', // Allow requests from this origin
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);


app.use("/api/v1",userRoutes,productRoutes)

app.use(errorMiddleware);

export default app;