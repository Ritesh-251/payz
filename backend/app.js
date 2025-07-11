import express, { Router } from 'express'
import userRouter from "./routes/user.routes.js"
import walletRouter from "./routes/wallet.routes.js"
const app = express();


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
 
app.use('/api/v1',userRouter);
app.use('/api/v1',walletRouter);



export {app}