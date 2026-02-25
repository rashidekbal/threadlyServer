import {Router} from "express";
import verifyToken from "../../middlewares/authorization.js";
import {getUsersController} from "../../Controllers/admin/usersController.js";
const router=Router();
router.route("/").get(verifyToken,getUsersController);
export  default router;