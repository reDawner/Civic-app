import express from "express";
import { getMyNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/my", getMyNotifications);

export default router;