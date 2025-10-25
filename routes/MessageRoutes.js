import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {deleteMessageForRoleController,
  getAllChatsController,
  getMsgPendingHistoryController,
  getpendingMessagesController,
  sendMessageController,
  updateMessageSeenStatusController,
  uploadMessageMedia,
} from "../Controllers/MessageController.js";
import { uploadtoDisk, uploadToRam } from "../middlewares/multer.js";

const router = Router();

router
  .route("/checkPendingMessages")
  .get(verifyToken, getMsgPendingHistoryController);
router
  .route("/getPendingMessages")
  .post(verifyToken, getpendingMessagesController);
router.route("/sendMessage").post(verifyToken, sendMessageController);
router
  .route("/updateMessageDeliveryStatus")
  .post(verifyToken, updateMessageSeenStatusController);
  if(process.env.PRODUCTION==="true"){
router.route("/uploadMedia").post(verifyToken,uploadToRam.single("media"),uploadMessageMedia);
  }else{
    router.route("/uploadMedia").post(verifyToken,uploadtoDisk.single("media"),uploadMessageMedia);
  }
  router.route("/getAllChats").get(verifyToken,getAllChatsController);
  router.route("/deleteMessageForMe").patch(verifyToken,deleteMessageForRoleController);
  

export default router;
