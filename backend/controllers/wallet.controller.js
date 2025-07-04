import Wallet from "../models/wallet.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

 const checkBalance = asyncHandler (async (req,res)=>{
        const wallet = await Wallet.findOne({ user: req.user._id });
        return res.status(200).json(new ApiResponse(200,{balance:wallet.balance},"Balance retrived successfully"))
 })

 const sendMoney = asyncHandler(async (req,res) =>{
       const session = await mongoose.startSession();
        session.startTransaction();
        const { amount, to } = req.body;
        const sender = await Wallet.findOne({ user: req.user._id }).session(session);
        const receiver = await User.findOne({ userName: to.toLowerCase() });
        const receiverUser = await Wallet.findOne({ user: receiver._id }).session(session)



        if (!sender || sender.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
         });
    } 

        if (!receiverUser) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
         }

    
    await Wallet.updateOne({ user: req.user._id }, { $inc: { balance: -amount } }).session(session);
    await Wallet.updateOne({ user: receiver._id }, { $inc: { balance: amount } }).session(session);
    await session.commitTransaction();
    session.endSession();
    res.status(200).json(new ApiResponse(200,{},"Money transferred successfully"));


 })


export {checkBalance,sendMoney};
