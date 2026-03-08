import { analyzeImage } from "../services/aiService.js";

export const reportIssue = async (req, res) => {

    const { title, description, location } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Image required" });
    }

    const imagePath = req.file.path;

    const aiResult = await analyzeImage(imagePath);

    res.json({
        message: "Issue analyzed",
        title,
        description,
        location,
        image: req.file.filename,
        ai_analysis: aiResult
    });

};