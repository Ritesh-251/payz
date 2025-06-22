import mongoose from "mongoose";
import { Schema,model } from "mongoose";

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
        unique:true,
        minLength: 6,
    }

}, { timestamps: true })




const User = model("User",userSchema);
export default User;