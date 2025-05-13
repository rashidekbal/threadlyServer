import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  addComentController,
  removeCommentController,
} from "../Controllers/commentController.js";

let router = Router();
router.route("/addComent").post(verifyToken, addComentController);
router.route("/removeComment").post(verifyToken, removeCommentController);
export default router;
