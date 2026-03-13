import {Router} from "express"

import verifyToken from "../../middlewares/authorization.js";
import { getCommentsController } from "../../Controllers/admin/PostComments.controller.js";
import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
const router =Router();
router.route("/:postid").get(verifyToken,checkAdminAccess,getCommentsController)
export default router;