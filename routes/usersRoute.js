import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  getMyDataController,
  getUserController,
  getUsersController,
} from "../Controllers/usersController.js";

let usersRouter = Router();
usersRouter.route("/getUsers").get(verifyToken, getUsersController);
usersRouter.route("/getUser/:userid").get(verifyToken, getUserController);
usersRouter.route("/getMyData").get(verifyToken, getMyDataController);

export default usersRouter;
