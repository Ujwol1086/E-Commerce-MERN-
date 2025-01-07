import express from "express";
import { initializePayment, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.route("/initialize").post(initializePayment);
router.route("/verify/:pxid").get(verifyPayment);

export default router;