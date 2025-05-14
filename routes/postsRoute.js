import express from "express";
import upload from "../middlewares/multer.js";
import uploadOnColudinary from "../utils/cloudinary.js";
import verifyToken from "../middlewares/authorization.js";
import fetchDb from "../utils/query.js";
import {
  addPost,
  getFeed,
  removePost,
} from "../Controllers/PostsController.js";
let Router = express.Router();
Router.route("/createPost").post(verifyToken, upload.single("image"), addPost);
Router.route("/removePost").post(verifyToken, removePost);
Router.route("/getPostsFeed").get(verifyToken, getFeed);

export default Router;
