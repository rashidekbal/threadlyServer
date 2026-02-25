import {Router} from "express"

import verifyToken from "../../middlewares/authorization.js";
import { getUserPostsController } from "../../Controllers/admin/Posts.Controller.js";
const router =Router();
router.route("/:userid").get(verifyToken,getUserPostsController)
export default router;