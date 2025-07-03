import { Router } from "express";
import {registerUser, signIn} from "../controllers/user.controller.js"



const router = Router();

router.route('/register').post(registerUser);
router.route('/signIn').post(signIn);



export default router;

