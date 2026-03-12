import express from "express";

import {
    getStats,
    getAllIssuesAdmin,
    deleteIssue
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getStats);
router.get("/issues", getAllIssuesAdmin);
router.delete("/issues/:id", deleteIssue);

export default router;