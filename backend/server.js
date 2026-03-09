import express from "express";
import cors from "cors";
import issueRoutes from "./routes/issueRoutes.js";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://civicuser:civicpass123@cluster0.au1tsdf.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/issues", issueRoutes);

app.get("/", (req, res) => {
    res.send("Backend running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});