import {Router} from "express"

import verifyToken from "../../middlewares/authorization.js";
import { getUserPostsController } from "../../Controllers/admin/Posts.Controller.js";
import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
const router =Router();
router.route("/:userid").get(verifyToken,checkAdminAccess,getUserPostsController)
export default router;