import {Router} from "express"

import verifyToken from "../../middlewares/authorization.js";
import { getCommentsController } from "../../Controllers/admin/PostComments.controller.js";
const router =Router();
router.route("/:postid").get(verifyToken,getCommentsController)
export default router;