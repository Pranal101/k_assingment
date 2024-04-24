import User from "../models/userModel.js"
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js"
import {sendEmail} from "../utils/sendEmail.js"
import crypto from "crypto";

//Register User
export async function registerUser(req,res,next){
    try{
        const user = await User.create(req.body);

        sendToken(user,201,res);

    }catch(error){
        res.status(500).json({
            success:false,
            error:error,
            message:"Failed to register user"
        })

    }
    
}

//Login User

export async function loginUser(req,res,next){
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }
    try {
        // Find user by email
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const isPasswordMatched =await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        
        sendToken(user,200,res);
    } catch (error) {
        next(error);
    }


}

//Logout

export async function logout(req, res, next) {
    try {
        res.clearCookie("token"); 

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        next(error);
    }
}

//Forgot pasword

export async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const resetToken = user.getPasswordResetToken();

        await user.save({ validateBeforeSave: false }); 

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/resetpassword/${resetToken}`;
        const message = `Your password reset token is \n\n ${resetPasswordUrl}`;

        try {
            // Send email using updated sendEmail function
            await sendEmail({
                email: user.email,
                subject: "Password Recovery",
                message: message // Pass the message parameter
            });

            res.status(200).json({ success: true, message: "Email sent" });
        } catch (error) {
            // Handle email sending error
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler("Email could not be sent", 500));
        }
    } catch (error) {
        next(error);
    }
}

//RESET PASSWORD

export async function resetpassword(req, res, next) {
    try {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorHandler("Reset password token is either invalid or expired", 404));
        }

        // Check if password matches confirm password
        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Passwords do not match", 400));
        }

        const hashedPassword = await hashPassword(req.body.password);
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
}


//Update User Password
export async function updatePassword(req,res,next){
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }

    if(req.body.newPassword!=req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.newPassword;
    
    await user.save();

    sendToken(user,200,res);
}

//Update User Profile
export async function updateProfile(req,res,next){
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true
    });

}