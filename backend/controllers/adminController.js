import Issue from "../models/Issue.js";

export const getStats = async (req, res) => {
    try {

        const totalIssues = await Issue.countDocuments();

        const pendingIssues = await Issue.countDocuments({ status: "Pending" });

        const inProgressIssues = await Issue.countDocuments({ status: "In Progress" });

        const resolvedIssues = await Issue.countDocuments({ status: "Resolved" });

        res.json({
            totalIssues,
            pendingIssues,
            inProgressIssues,
            resolvedIssues
        });

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Failed to fetch stats" });

    }
};

export const getAllIssuesAdmin = async (req, res) => {

    try {

        const issues = await Issue.find()
            .sort({ "ai_analysis.severity": -1, createdAt: -1 });

        res.json(issues);

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Failed to fetch issues" });

    }

};

export const deleteIssue = async (req, res) => {

    try {

        const issue = await Issue.findByIdAndDelete(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        res.json({ message: "Issue deleted successfully" });

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Failed to delete issue" });

    }

};