import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  CommentLikeContorller,
  CommentUnlikeController,
  PostlikeController,
  PostunlikeController,
} from "../Controllers/likeController.js";
let router = Router();
//this is for like and unlike a image post
router.route("/likePost/:postid").get(verifyToken, PostlikeController);
router.route("/unlikePost/:postid").get(verifyToken, PostunlikeController);

//route for liking and disliking a comment
router
  .route("/likeAComment/:commentid")
  .get(verifyToken, CommentLikeContorller);
router
  .route("/unlikeAComment/:commentid")
  .get(verifyToken, CommentUnlikeController);
export default router;
