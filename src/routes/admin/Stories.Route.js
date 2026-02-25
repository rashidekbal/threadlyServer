import {Router} from "express"

import verifyToken from "../../middlewares/authorization.js";
import { getUserStoriesController } from "../../Controllers/admin/Stories.controller.js";
const router =Router();
router.route("/:userid").get(verifyToken,getUserStoriesController)
export default router;