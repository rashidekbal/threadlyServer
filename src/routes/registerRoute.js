import express from "express";
import ApiError from "../constants/ApiError.js";
import verifyToken from "../middlewares/authorization.js";
import connection from "../db/connection.js";
import verifyAge from "../utils/ageVerfy.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { register_phone_controller, registerUserEmailController } from "../Controllers/authController.js";
import { API_ERROR } from "../constants/Error_types.js";
import verifyOtpSignedToken from "../middlewares/verify-otp-validated-token.js";

let route = express.Router();
route.route("/mobile").post( verifyOtpSignedToken,register_phone_controller);
route.post("/email", verifyOtpSignedToken, registerUserEmailController);

export default route;


