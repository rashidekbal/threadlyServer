import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  addStoryController,
  getMyStoriesController,
  getStoriesAllController,
  getStoryOfUserController,
} from "../Controllers/StoryController.js";
import "dotenv/config";
import { uploadtoDisk, uploadToRam } from "../middlewares/multer.js";
const router = Router();
const isProduction = process.env.PRODUCTION == "true";
if (isProduction) {
  router
    .route("/addStory")
    .post(verifyToken, uploadToRam.single("media"), addStoryController);
} else {
  router
    .route("/addStory")
    .post(verifyToken, uploadtoDisk.single("media"), addStoryController);
}
router.route("/getStories").get(verifyToken, getStoriesAllController);
router.route("/getMyStories").get(verifyToken, getMyStoriesController);
router.route("/getStories/:userid").get(verifyToken, getStoryOfUserController);
export default router;
