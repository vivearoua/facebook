import express from "express";
import signUp from "../controllers/auth/signUp";
import login from "../controllers/auth/logIn";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", login);

export default router;
