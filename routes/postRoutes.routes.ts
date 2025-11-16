import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import UploadImagePost from "../middlewares/UploadImapePost";
import { getPost } from "../controllers/posts/getPost";
import { createPost } from "../controllers/posts/createPost";
import { deletePost } from "../controllers/posts/deletePost";
import { updatePost } from "../controllers/posts/updatePost";
import { likeToPost } from "../controllers/posts/likeToPost";
import { unLikedPost } from "../controllers/posts/unLikedPost";
import addImagePost from "../controllers/posts/addImagePost";

// Initialize the router and create io as a parameter in your routes
const router = express.Router();
router.use(authMiddleware);

// Middleware to handle file upload for posts
const ifIsExistUploadImage = UploadImagePost();

// Ensure io (Socket.IO Server) is passed from app or server initialization
router.get("/getPost", getPost);
router.post(
  "/addImagePost",
  ifIsExistUploadImage.single("PostImage"),
  addImagePost
);
router.post(
  "/createPost",
  ifIsExistUploadImage.single("PostImage"),
  createPost
);
router.delete("/deletePost/:id", deletePost);

// Uncomment if you want to support post updates
// router.patch("/updatePost/:id", updatePost);

router.patch("/likeToPost/:id", (req, res, next) => {
  const io = req.app.get("io");
  likeToPost(req, res, io).catch(next);
});

router.patch("/unLikedPost/:id", (req, res, next) => {
  const io = req.app.get("io");
  unLikedPost(req, res, io).catch(next);
});

export default router;
