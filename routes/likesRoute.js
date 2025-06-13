import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  likeAcomment,
  likeController,
  unlikeAcomment,
  unlikeController,
} from "../Controllers/likeController.js";
let router = Router();
//this is for like and unlike a image post
router.route("/like").post(verifyToken, likeController);
router.route("/unlike").post(verifyToken, unlikeController);

//route for liking and disliking a comment
router.route("/likeAcomment/:commentid").get(verifyToken, likeAcomment);
router.route("/unlikeAcomment/:commentid").get(verifyToken, unlikeAcomment);
export default router;
