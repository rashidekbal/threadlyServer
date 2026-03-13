import {Router} from "express";
import verifyToken from "../../middlewares/authorization.js";
import { deleteUserProfilePicController, editUserInfoController, editUserProfilePicController, getUserInfoController, getUsersController, overridePasswordController} from "../../Controllers/admin/usersController.js";
import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
import { uploadtoDisk } from "../../middlewares/multer.js";
const router=Router();
router.route("/").get(verifyToken,checkAdminAccess,getUsersController);
router.route("/:userid").get(verifyToken,checkAdminAccess,getUserInfoController);
router.route("/overridePassword").patch(verifyToken,checkAdminAccess,overridePasswordController);
router.route("/edit").patch(verifyToken,checkAdminAccess,editUserInfoController);
router.route("/editProfilePic/:uuid").patch(verifyToken,checkAdminAccess,uploadtoDisk.single("image"),editUserProfilePicController)
router.route("/editProfilePic/:uuid").delete(verifyToken,checkAdminAccess,deleteUserProfilePicController);
export default router