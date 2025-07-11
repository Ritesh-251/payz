import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,

    },
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase: true
    },
    wallet:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Wallet",

    },
    password:{
        type:String,
        required:true,
        minLength: 6,
    }

}, { timestamps: true })

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();

})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}; 

 userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};
const User = model("User",userSchema);
export default User;