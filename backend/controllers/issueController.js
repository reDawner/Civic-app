import Issue from "../models/Issue.js";
import { analyzeImage } from "../services/aiService.js";

export const reportIssue = async (req, res) => {
    try {

        const { title, description, location } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image required" });
        }

        const imagePath = req.file.path;

        // Run AI analysis
        const aiResult = await analyzeImage(imagePath);

        const userId = req.headers.userid || "demo-user";

        // SAVE ISSUE TO DATABASE
        const issue = await Issue.create({
            title,
            description,
            location,
            image: req.file.filename,
            ai_analysis: {
                severity: aiResult.severity_score ?? 0
            },
            status: "Pending",
            createdBy: userId
        });

        res.json({
            message: "Issue reported successfully",
            issue
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to report issue",
            error: err.message
        });
    }
};

export const getMyIssues = async (req, res) => {
    try {

        const userId = req.headers.userid;
        // temporary method if you are not using JWT auth

        const issues = await Issue.find({ createdBy: userId })
            .sort({ createdAt: -1 });

        res.json(issues);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch issues" });
    }
};