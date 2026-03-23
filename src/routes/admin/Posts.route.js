import {Router} from "express"


import { getUserPostsController } from "../../Controllers/admin/Posts.Controller.js";
import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
import adminAuthorizationVerification from "../../middlewares/adminAuthorizationMiddleWare.js";
const router =Router();
router.route("/:userid").get(adminAuthorizationVerification,checkAdminAccess,getUserPostsController)
export default router;