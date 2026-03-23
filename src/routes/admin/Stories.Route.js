import {Router} from "express"


import { getUserStoriesController } from "../../Controllers/admin/Stories.controller.js";
import checkAdminAccess from "../../middlewares/AdminAccessCheckMiddleWare.js";
import adminAuthorizationVerification from "../../middlewares/adminAuthorizationMiddleWare.js";
const router =Router();
router.route("/:userid").get(adminAuthorizationVerification,checkAdminAccess,getUserStoriesController)
export default router;