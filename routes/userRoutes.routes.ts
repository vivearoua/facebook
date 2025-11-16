import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import UploadImage from "../middlewares/UploadAvatar";

import addAvatar from "../controllers/user/addAvatar";
import editFullName from "../controllers/user/editFullName";
import editBio from "../controllers/user/editBio";
import addSkill from "../controllers/user/addSkill";
import deleteSkill from "../controllers/user/deleteSkill";
import getProfileCurrentUser from "../controllers/user/getProfileCurrentUser";
import followUser from "../controllers/user/followUser";
import unfollowUser from "../controllers/user/unfollowUser";
import getUser from "../controllers/user/getUser";
import addSavePost from "../controllers/user/addSavePost";
import removeSavedPost from "../controllers/user/removeSavedPost";
import getNotification from "../controllers/user/getNotification";
import editMainJob from "../controllers/user/editMainJob";

const router = express.Router();
const upload = UploadImage();

router.use(authMiddleware);

router.patch("/addAvatar", upload.single("avatar"), addAvatar);
router.patch("/editFullName", editFullName);
router.patch("/editBio", editBio);
router.patch("/editMainJob", editMainJob);
router.patch("/addSkill", addSkill);
router.delete("/deleteSkill", deleteSkill);
router.get("/getProfileCurrentUser", getProfileCurrentUser);
router.patch("/follow/:id", (req, res, next) => {
  const io = req.app.get("io");
  followUser(req, res, io).catch(next);
});
router.patch("/unfollow/:id", unfollowUser);
router.get("/getUser/:id", getUser);

router.patch("/addSavePost", addSavePost);
router.patch("/removeSavedPost", removeSavedPost);
router.get("/getNotification", getNotification);
export default router;
