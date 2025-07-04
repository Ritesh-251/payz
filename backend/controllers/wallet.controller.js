import Wallet from "../models/wallet.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import mongoose from "mongoose";
import User from "../models/user.model";

 const checkBalance = asyncHandler (async (req,res)=>{
        const wallet = await Wallet.findOne({ user: req.user._id });
        return res.status(200).json(new ApiResponse(200,{balance:wallet.balance},"Balance retrived successfully"))
 })

 const sendMoney = asyncHandler(async (req,res) =>{
       const session = await mongoose.startSession();
        session.startTransaction();
        const { amount, to } = req.body;
        const sender = await Wallet.findById(req.user._id).session(session);
        const receiver = await User.findOne({ userName: to.toLowerCase() });
        const receiverUser = await Wallet.findById(receiver._id).session(session)



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

    
    await Wallet.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Wallet.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    await session.commitTransaction();

    res.status(200).json(new ApiResponse(200,{},"Money transferred successfully"));


 })


export {checkBalance,sendMoney};
