import { Router } from "express";
import {registerUser, signIn} from "../controllers/user.controller.js"
import { registerUserSchema } from "../validations/user.validator.js";
import validateResource from "../utils/validator.js";




const router = Router();

router.route('/register').post(validateResource(registerUserSchema),registerUser);
router.route('/signIn').post(signIn);



export default router;

