import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
const registerUser = asyncHandler(async (req,res) =>{
        const {userName,password,email,fullName} = req.body;

        /*Zod willl handle the validation part
        how a user is registerd 
        we get the values
        we check in db if user exist for the same name or not 
        if not we create it else we return error
        */
        const existedUser = await User.findOne({
         $or: [{ username }, { email }]
         });
         if(existedUser){
            throw Apit
         }

})