import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import userOtpVerification from "../model/userOtpVerification.js";

//nodemailer transporter

let transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com", // hostname
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASSWORD,
	},
});

export const sendOTPVerifcationMail = async ({ _id, email }, res) => {
	try {
		const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
		//mail options
		const mailOptions = {
			from: "otpverifier123@gmail.com",
			to: email,
			subject: "Verify your Email",
			html: `<p>Enter the following otp to verify your email</p><p><strong>${otp}</strong></p><p>This otp expires in 1 hour</p>`,
		};
		//hash otp
		const hashedOTP = await bcrypt.hash(otp, 10);
		const newUserOtpVerification = new userOtpVerification({
			_id: _id,
			otp: hashedOTP,
			createdAt: Date.now(),
			expiredAt: Date.now() + 3600000,
		});
		await newUserOtpVerification.save();
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};
