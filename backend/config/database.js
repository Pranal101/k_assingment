import mongoose from "mongoose";

export async function connectDatabase(){
    mongoose.connect(process.env.DB_URI).then((data)=>{
    console.log(`Mongodb connected with server ${data.connection.host}`)
}).catch((err)=>{
    console.log(err)
})} 