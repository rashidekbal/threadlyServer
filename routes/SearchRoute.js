import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import { searchContorller } from "../Controllers/SearchController.js";
const router=Router();
router.route("/get").get(verifyToken,searchContorller)

export default router;