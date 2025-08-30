import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  getMyDataController,
  getUserController,
  getSuggestUsersController,
} from "../Controllers/usersController.js";

let usersRouter = Router();
usersRouter.route("/getUsers").get(verifyToken, getSuggestUsersController);
usersRouter.route("/getUser/:userid").get(verifyToken, getUserController);
usersRouter.route("/getMyData").get(verifyToken, getMyDataController);

export default usersRouter;
