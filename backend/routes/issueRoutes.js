import express from "express";
import upload from "../middleware/upload.js";
import { reportIssue, getMyIssues } from "../controllers/issueController.js";
import { updateIssueStatus } from "../controllers/issueController.js";
import { getAllIssues } from "../controllers/issueController.js";

const router = express.Router();

router.post("/report", upload.single("image"), reportIssue);
router.get("/my", getMyIssues);
router.patch("/:id/status", updateIssueStatus);
router.get("/", getAllIssues);

router.get("/test", (req, res) => {
    res.json({ message: "Issue route working" });
});

export default router;