import {Router} from "express"

import { getCommentsController } from "../../Controllers/admin/PostComments.controller.js";
import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
import adminAuthorizationVerification from "../../middlewares/adminAuthorizationMiddleWare.js";

const router =Router();
router.route("/:postid").get(adminAuthorizationVerification,checkAdminAccess,getCommentsController)
export default router;