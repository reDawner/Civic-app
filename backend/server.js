import express from "express";
import cors from "cors";
import issueRoutes from "./routes/issueRoutes.js";
import mongoose from "mongoose";
import notificationRoutes from "./routes/notificationRoutes.js";
import path from "path";
import adminRoutes from "./routes/adminRoutes.js";

mongoose.connect("mongodb://civicuser:civicpass123@ac-aurjbkp-shard-00-00.au1tsdf.mongodb.net:27017,ac-aurjbkp-shard-00-01.au1tsdf.mongodb.net:27017,ac-aurjbkp-shard-00-02.au1tsdf.mongodb.net:27017/?ssl=true&replicaSet=atlas-glwluq-shard-0&authSource=admin&appName=Cluster0")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/issues", issueRoutes);

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Backend running");
});

app.use("/api/notifications", notificationRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});