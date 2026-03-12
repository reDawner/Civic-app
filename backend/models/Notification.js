import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    },

    read: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);