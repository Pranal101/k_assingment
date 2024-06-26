import app from "./app.js"
import dotenv from "dotenv"
import { connectDatabase } from "./config/database.js";

dotenv.config({path:"./backend/config/config.env"})

//Database connection
connectDatabase();



app.listen(process.env.PORT,()=>{
    console.log(`Server started on http://localhost:${process.env.PORT}`);
})