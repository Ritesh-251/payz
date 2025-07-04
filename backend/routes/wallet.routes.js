import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import { checkBalance, sendMoney } from "../controllers/wallet.controller.js";
import { sendMoneyValidator } from "../validations/wallet.validator.js";
import validateResource from "../utils/validator.js";


const router = Router();


router.route('/check-balance').post(auth,checkBalance);
router.route('/transfer').put(auth,sendMoney)

export default router;