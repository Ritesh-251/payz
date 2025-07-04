import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Wallet from "../models/wallet.model.js";

const  generateAccessAndRefreshToken = async (userId)=>{
      try{
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save({validateBeforeSave: false})
      return {accessToken,refreshToken}
   }
   catch(error){
      throw new ApiError(500,"Something went wrong while generating refresh and access token")

   }
}
 const registerUser = asyncHandler(async (req,res) =>{
        const {userName,password,email,fullName} = req.body;

        /*Zod willl handle the validation part
        how a user is registerd 
        we get the values
        we check in db if user exist for the same name or not 
        if not we create it else we return error
        */
        const existedUser = await User.findOne({
         $or: [{ userName: userName.toLowerCase() }, { email }]
         });
         if(existedUser){
           throw new ApiError(409, "User with email or username already exists");
         }
        const user = await  User.create({
            fullName,
            email,
            password,
            userName : userName.toLowerCase()

        })


      await Wallet.create({
        user: user._id,
        balance: 1 + Math.random() * 10000
       })

        const createdUser = await User.findById(user._id).select("-password -refreshToken");
        if (!createdUser) {
         throw new ApiError(500, "Something went wrong while registering the user");
        
        }
        return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
         );



})
const signIn = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,"User don't exist");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
      throw new ApiError(401,"Invalid user credentials");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )
    const options ={
        httpOnly:true,
        secure:true
    }
    return res.status(200).cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, {
                user: loggedInUser, accessToken, refreshToken
            },  "User logged In Successfully"))

})


const changeCurrentPassword = asyncHandler(async(req,res) =>{
   const user = await User.findById(req.user._id);
   const {oldPassword,newPassword} = req.body;

   const passwordCheck = await user.isPasswordCorrect(oldPassword);
   if(!passwordCheck){
      throw new ApiError(401,"Please provide the right password")
   }
    user.password = newPassword;
   await user.save()

   return res.status(200).json(new ApiResponse(200,{},"Users password changed successfully"))
})

const UpdateAccountDetails = asyncHandler(async (req,res)=>{
        const { fullName,email} = req.body
         if ( !fullName || !email) {
        throw new ApiError(400, "All fields are required")
        }
        const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
        ).select("-password")

       return res
      .status(200)
      .json(new ApiResponse(200, user, "Account details updated successfully"))
});

export  {registerUser,signIn,UpdateAccountDetails,changeCurrentPassword};