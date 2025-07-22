import express from "express";
import { uploadToRam, uploadtoDisk } from "../middlewares/multer.js";
import verifyToken from "../middlewares/authorization.js";
import "dotenv/config";
import {
  addImagePost,
  addVideoPost,
  getFeed,
  getPostinfo,
  getUserPostsController,
  removePost,
} from "../Controllers/PostsController.js";
let ProductionMode = process.env.PRODUCTION === "true";
let Router = express.Router();
if (ProductionMode) {
  Router.route("/addImagePost").post(
    verifyToken,
    uploadToRam.single("image"),
    addImagePost
  );
} else {
  Router.route("/addImagePost").post(
    verifyToken,
    uploadtoDisk.single("image"),
    addImagePost
  );
}
if (ProductionMode) {
  Router.route("/addVideoPost").post(
    verifyToken,
    uploadToRam.single("video"),
    addVideoPost
  );
} else {
  Router.route("/addVideoPost").post(
    verifyToken,
    uploadtoDisk.single("video"),
    addVideoPost
  );
}
Router.route("/removePost").post(verifyToken, removePost);
Router.route("/getPostsFeed").get(verifyToken, getFeed);
Router.get("/getUserPosts/:userid", verifyToken, getUserPostsController);
Router.route("/getPost/:postid").get(verifyToken, getPostinfo);

export default Router;
