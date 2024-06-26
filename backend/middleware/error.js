import ErrorHandler from "../utils/errorHandler.js";

export function errorMiddleware(err,req,res,next){
    err.statusCode = err.statusCode ||500;
    err.message= err.message||"Internal Server Error";

    //Wrong MongodbId Error
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid ${err.path}`;
        err= new ErrorHandler(message,400);
    }
    //Mongoose duplicate key error
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
        err= new ErrorHandler(message,400);
    }

    //Wrong jwt error
    if(err.name==="JsonWebTokenError"){
        const message=`Json web token invalid,try again`;
        err= new ErrorHandler(message,400);
    }
    //JWT Expire error
    if(err.name==="TokenExpireError"){
        const message=`Json web token expired,try again`;
        err= new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        error:err.message
    })
}