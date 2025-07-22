import { Router } from "express";
import verifyToken from "../middlewares/authorization.js";
import {
  editNameController,
  editProfileController,
  editUserBioController,
  editUserIdController,
} from "../Controllers/ProfileEditController.js";
import { uploadtoDisk, uploadToRam } from "../middlewares/multer.js";
const router = Router();
router.route("/edit/username").patch(verifyToken, editNameController);
router.route("/edit/userid").patch(verifyToken, editUserIdController);
router.route("/edit/bio").patch(verifyToken, editUserBioController);
if (process.env.PRODUCTION == "true") {
  router.post(
    "/edit/Profile",
    verifyToken,
    uploadToRam.single("image"),
    editProfileController
  );
} else {
  router.post(
    "/edit/Profile",
    verifyToken,
    uploadtoDisk.single("image"),
    editProfileController
  );
}

export default router;
