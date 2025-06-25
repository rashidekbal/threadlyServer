import express from "express";
import { uploadToRam, uploadtoDisk } from "../middlewares/multer.js";
import verifyToken from "../middlewares/authorization.js";
import "dotenv/config";
import {
  addPost,
  getFeed,
  getPostinfo,
  getUserPostsController,
  removePost,
} from "../Controllers/PostsController.js";
let ProductionMode = process.env.PRODUCTION === 'true';
let Router = express.Router();
if (ProductionMode) {
  Router.route("/createPost").post(
    verifyToken,
    uploadToRam.single("image"),
    addPost
  );
} else {
  Router.route("/createPost").post(
    verifyToken,
    uploadtoDisk.single("image"),
    addPost
  );
}
Router.route("/removePost").post(verifyToken, removePost);
Router.route("/getPostsFeed").get(verifyToken, getFeed);
Router.get("/getUserPosts/:userid", verifyToken, getUserPostsController);
Router.route("/getPost/:postid").get(verifyToken, getPostinfo);

export default Router;
