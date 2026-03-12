import Issue from "../models/Issue.js";
import { analyzeImage } from "../services/aiService.js";
import Notification from "../models/Notification.js";

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

        // GET LAST ISSUE NUMBER
        const lastIssue = await Issue.findOne().sort({ issueNumber: -1 });
        const nextIssueNumber = (lastIssue?.issueNumber || 0) + 1;

        // SAVE ISSUE
        const issue = await Issue.create({
            issueNumber: nextIssueNumber,
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

        // Create a notification for the user
        await Notification.create({
            userId: userId,
            message: `Issue #${issue.issueNumber} has been received`,
            issueId: issue._id
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

export const updateIssueStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        issue.status = status;
        await issue.save();

        // Create notification when resolved
        if (status === "Resolved") {

            await Notification.create({
                userId: issue.createdBy,
                message: `Issue #${issue.issueNumber} has been resolved`,
                issueId: issue._id
            });

        }

        res.json(issue);
        console.log(req.body);

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Failed to update status" });

    }

};

export const getAllIssues = async (req, res) => {
    try {

        const issues = await Issue.find()
            .sort({ "ai_analysis.severity": -1 });

        res.json(issues);

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Failed to fetch issues" });

    }
};