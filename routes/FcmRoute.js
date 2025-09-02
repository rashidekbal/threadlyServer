import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import { updateToken } from "../Controllers/FcmController.js";
const router = Router();

router.route("/updateToken").patch(verifyToken, updateToken);
export default router;
