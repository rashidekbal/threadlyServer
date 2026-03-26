import express from "express";
import "dotenv/config";

import verifyToken from "../middlewares/authorization.js";

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
