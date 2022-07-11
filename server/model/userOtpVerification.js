import mongoose from "mongoose";

const userOtpVerificationSchema = mongoose.Schema({
	_id: String,
	otp: String,
	createdAt: Date,
	expiredAt: Date,
});

const userOtpVerification = mongoose.model(
	"userOtpVerification",
	userOtpVerificationSchema
);

export default userOtpVerification;
