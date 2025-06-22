import mongoose, { Schema, model } from "mongoose";
const transactionSchema = new Schema({
    sender:{
     type: mongoose.Schema.Types.ObjectId,
     ref:"User",
     default: null,  
    },
    receiver:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    default: null,  

    },
    amount:{
        type:Number,
        required:true,
        min:1,

    },
    transactionType: {
    type: String,
    enum: ["SEND", "ADD_MONEY", "WITHDRAW"],
    required: true,
    },
    status:{
   type: String,
   enum: ["PENDING", "SUCCESS", "FAILED"],
   default: "PENDING",
    },
    referenceId: {
    type: String,
    default: () => `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`
        }


},{ timestamps: true })
export const Transaction = model("Transaction", transactionSchema);
