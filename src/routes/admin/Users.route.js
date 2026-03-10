import {Router} from "express";
import verifyToken from "../../middlewares/authorization.js";
import {getUserInfoController, getUsersController, overridePasswordController} from "../../Controllers/admin/usersController.js";
const router=Router();
router.route("/").get(verifyToken,getUsersController);
router.route("/:userid").get(verifyToken,getUserInfoController)
router.route("/overridePassword").patch(verifyToken,overridePasswordController)
export  default router;