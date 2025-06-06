import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  addComentController,
  getComments,
  removeCommentController,
} from "../Controllers/commentController.js";

let router = Router();
router.route("/addComment").post(verifyToken, addComentController);
router.route("/removeComment").post(verifyToken, removeCommentController);
router.route("/getComments/:postid").get(verifyToken, getComments);
export default router;
