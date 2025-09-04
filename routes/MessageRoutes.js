import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  getMsgPendingHistoryController,
  getpendingMessagesController,
  sendMessageController,
} from "../Controllers/MessageController.js";

const router = Router();

router
  .route("/checkPendingMessages")
  .get(verifyToken, getMsgPendingHistoryController);
router
  .route("/getPendingMessages")
  .post(verifyToken, getpendingMessagesController);
router.route("/sendMessage").post(verifyToken, sendMessageController);

export default router;
