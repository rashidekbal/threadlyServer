import express, { response } from "express";
import jwt from "jsonwebtoken";
import connection from "../db/connection.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import fetchDb from "../utils/query.js";
import { logOutPreviousDevice } from "../Fcm/FcmService.js";
import Response from "../constants/Response.js";
import verifyToken from "../middlewares/authorization.js";
import redisClient from "../redis/redis.js";
import { sessionIdExpireTime } from "../constants/RedisConstants.js";
import { v4 } from "uuid";
import {
  Login_email_controller,
  Login_mobile_controller,
  Login_userid_controller,
  logout_controller,
} from "../Controllers/loginController.js";

let router = express.Router();
router.route("/mobile").post(Login_mobile_controller);
router.route("/email").post(Login_email_controller);
router.route("/userid").post(Login_userid_controller);

router.route("/logout").get(verifyToken,logout_controller);

export default router;
