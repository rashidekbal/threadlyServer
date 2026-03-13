import {Router} from "express"

import verifyToken from "../../middlewares/authorization.js";
import { getUserStoriesController } from "../../Controllers/admin/Stories.controller.js";
import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
const router =Router();
router.route("/:userid").get(verifyToken,checkAdminAccess,getUserStoriesController)
export default router;