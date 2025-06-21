import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  followController,
  getFollowersController,
  getFollowingController,
  unfollowController,
} from "../Controllers/followController.js";
let router = Router();
router.route("/follow").post(verifyToken, followController);
router.route("/unfollow").post(verifyToken, unfollowController);
router.route("/getFollowers/:userid").get(verifyToken, getFollowersController);
router.route("/getFollowings/:userid").get(verifyToken, getFollowingController);
export default router;
