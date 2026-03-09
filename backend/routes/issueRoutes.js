import express from "express";
import upload from "../middleware/upload.js";
import { reportIssue, getMyIssues } from "../controllers/issueController.js";


const router = express.Router();

router.post("/report", upload.single("image"), reportIssue);
router.get("/my", getMyIssues);

router.get("/test", (req, res) => {
    res.json({ message: "Issue route working" });
});

export default router;