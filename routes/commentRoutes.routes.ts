import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { addComment } from "../controllers/comments/addComment";

const router = express.Router();

router.use(authMiddleware);

router.post("/addComment", (req, res, next) => {
  const io = req.app.get("io");
  addComment(req, res, io).catch(next);
});
router.post("/");

export default router;
