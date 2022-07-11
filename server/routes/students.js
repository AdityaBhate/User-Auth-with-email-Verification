import express from "express";
import {
	getStudentID,
	createStudentID,
	verifyOTP,
} from "../controllers/studentLogin.js";

const router = express.Router();

//login and sign-up routes for students
router.post("/user", createStudentID);
router.post("/user/verify", verifyOTP);
router.post("/user/login", getStudentID);

export default router;
