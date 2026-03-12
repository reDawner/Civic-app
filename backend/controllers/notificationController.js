import Notification from "../models/Notification.js";

export const getMyNotifications = async (req, res) => {

    try {

        const userId = req.headers.userid;

        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 });

        res.json(notifications);

    } catch (err) {

        console.error(err);
        res.status(500).json({ message: "Failed to fetch notifications" });

    }

};