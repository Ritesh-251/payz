import mongoose, { Schema, model } from "mongoose";

const walletSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    balance:{
        type:Number,
        default:0,
        required: true,
    }
},{timestamps:true})
const Wallet = model("Wallet",walletSchema);
export default Wallet;