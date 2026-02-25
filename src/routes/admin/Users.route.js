import {Router} from "express";
import verifyToken from "../../middlewares/authorization.js";
import {getUserInfoController, getUsersController} from "../../Controllers/admin/usersController.js";
const router=Router();
router.route("/").get(verifyToken,getUsersController);
router.route("/:userid").get(verifyToken,getUserInfoController)
export  default router;