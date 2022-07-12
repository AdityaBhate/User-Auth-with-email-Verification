import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
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
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: "SECRET",
	})
);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/student", studentRoutes);
// http://localhost:3001/api/student

//passport setup
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

/*  Google AUTH  */

const GOOGLE_CLIENT_ID = "our-google-client-id";
const GOOGLE_CLIENT_SECRET = "our-google-client-secret";
passport.use(
	new GoogleStrategy(
		{
			clientID:
				"972656033644-1btl0usgeah0uk757uvjckcsvq11m8cu.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "http://localhost:3000/home",
		},
		function (accessToken, refreshToken, profile, done) {
			userProfile = profile;
			return done(null, userProfile);
		}
	)
);

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/error" }),
	function (req, res) {
		// Successful authentication, redirect success.
		res.redirect("/success");
	}
);
