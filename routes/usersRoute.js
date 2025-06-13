import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  getUserController,
  getUsersController,
} from "../Controllers/usersController.js";

let usersRouter = Router();
usersRouter.route("/getUsers").get(verifyToken, getUsersController);
usersRouter.route("/getUser/:userid").get(verifyToken, getUserController);

export default usersRouter;
