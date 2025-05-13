import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  followController,
  unfollowController,
} from "../Controllers/followController.js";
let router = Router();
router.route("/follow").post(verifyToken, followController);
router.route("/unfollow").post(verifyToken, unfollowController);
export default router;
