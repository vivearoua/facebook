import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import getNotifications from "../controllers/notifications/getNotifications";
import updateStatueNotification from "../controllers/notifications/updateStatueNotification";

const router = express.Router();



router.use(authMiddleware);
router.get("/getNotifications", getNotifications);
router.patch("/updateStatueNotification", updateStatueNotification);


export default router;
