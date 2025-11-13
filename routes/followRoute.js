import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  ApproveFollowRequestController,
  cancelFollowRequestController,
  followController,
  followControllerV2,
  getFollowersController,
  getFollowingController,
  unfollowController,
} from "../Controllers/followController.js";
let router = Router();
router.route("/follow").post(verifyToken, followController);
router.route("/follow/V2").post(verifyToken, followControllerV2);
router.route("/cancelFollowRequest").post(verifyToken,cancelFollowRequestController)
router.route("/approveFollowRequest").post(verifyToken,ApproveFollowRequestController)
router.route("/unfollow").post(verifyToken, unfollowController);
router.route("/getFollowers/:userid").get(verifyToken, getFollowersController);
router.route("/getFollowings/:userid").get(verifyToken, getFollowingController);
export default router;
