import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        location: String,
        image: String,

        ai_analysis: {
            label: String,
            severity: Number
        },

        status: {
            type: String,
            default: "Pending"
        },

        createdBy: String
    },
    { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);