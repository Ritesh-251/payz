import { Router } from "express";
import {changeCurrentPassword, registerUser, signIn, UpdateAccountDetails} from "../controllers/user.controller.js"
import { changePasswordValidator, loginUserSchema, registerUserSchema, updateAccountValidator } from "../validations/user.validator.js";
import validateResource from "../utils/validator.js";
import { auth } from "../middleware/auth.middleware.js";




const router = Router();

router.route('/register').post(validateResource(registerUserSchema),registerUser);
router.route('/signIn').post(validateResource(loginUserSchema),signIn);
router.route('/change-password').put(validateResource(changePasswordValidator),auth,changeCurrentPassword)
router.route('/update-profile').put(validateResource(updateAccountValidator),auth,UpdateAccountDetails)



export default router;

