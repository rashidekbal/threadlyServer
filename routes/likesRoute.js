import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  likeAcomment,
  likeController,
  unlikeController,
} from "../Controllers/likeController.js";
let router = Router();
router.route("/like").post(verifyToken, likeController);
router.route("/unlike").post(verifyToken, unlikeController);
router.route("/likeAcomment/:commentid").get(verifyToken, likeAcomment);
export default router;
