import mongoose from "mongoose";

const studentLoginSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	verified: Boolean,
});

const studentLogin = mongoose.model("studentLogin", studentLoginSchema);

export default studentLogin;
