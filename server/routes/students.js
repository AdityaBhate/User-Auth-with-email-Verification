import express from "express";
import {
	getStudentID,
	createStudentID,
	verifyOTP,
	getStudent,
} from "../controllers/studentLogin.js";

const router = express.Router();

//login and sign-up routes for students
router.post("/user", createStudentID);
router.post("/user/verify", verifyOTP);
router.post("/user/login", getStudentID);
router.get("/user/login/:id", getStudent);

export default router;
