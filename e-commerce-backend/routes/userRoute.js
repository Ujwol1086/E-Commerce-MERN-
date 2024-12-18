import express from "express";
import { changePassword, createUser, loginUser, logOut, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/login").post(loginUser);
router.route("/updatepassword").patch(changePassword);
router.route("/update").patch(updateUser);
router.route("/logout").get(logOut);


export default router;