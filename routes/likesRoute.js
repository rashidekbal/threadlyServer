import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  likeController,
  unlikeController,
} from "../Controllers/likeController.js";
let router = Router();
router.route("/like").post(verifyToken, likeController);
router.route("/unlike").post(verifyToken, unlikeController);
export default router;
