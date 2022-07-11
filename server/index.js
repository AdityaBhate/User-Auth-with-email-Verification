import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import studentRoutes from "./routes/students.js";
import dotenv from "dotenv";
dotenv.config();

//setting-up the server and database
const PORT = process.env.PORT || 3001;
const app = express();

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT);
		console.log(`server running on http://localhost:${PORT}`);
	})
	.catch((ERROR) => {
		console.log(ERROR);
	});

//middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/student", studentRoutes);

// http://localhost:3001/api/student
