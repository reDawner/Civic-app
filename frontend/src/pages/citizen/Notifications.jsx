import { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/notifications/my", {
                headers: { userid: "demoUser" },
            })
            .then((res) => {
                setNotifications(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const getNotificationIcon = (message = "") => {
        const msg = message.toLowerCase();
        if (msg.includes("resolved")) return { icon: "✓", color: "bg-green-100 text-green-600" };
        if (msg.includes("rejected")) return { icon: "✕", color: "bg-red-100 text-red-500" };
        if (msg.includes("progress")) return { icon: "⟳", color: "bg-orange-100 text-orange-500" };
        if (msg.includes("assigned")) return { icon: "→", color: "bg-blue-100 text-blue-600" };
        return { icon: "•", color: "bg-slate-100 text-slate-500" };
    };

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-blue-950 tracking-tight">
                    Notifications
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Stay updated on the progress of your reported issues.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center gap-3 text-slate-400 text-sm py-12 justify-center">
                    <svg className="animate-spin h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading notifications...
                </div>
            )}

            {/* Empty State */}
            {!loading && notifications.length === 0 && (
                <div className="max-w-2xl flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center">
                    <span className="text-4xl mb-3">🔔</span>
                    <p className="text-sm font-semibold text-slate-500 tracking-wide">No notifications yet</p>
                    <p className="text-xs text-slate-400 mt-1">You'll be notified when your issues are updated.</p>
                </div>
            )}

            {/* Notifications List */}
            {!loading && notifications.length > 0 && (
                <div className="max-w-2xl">
                    {/* Card wrapper */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                        {/* Card header strip */}
                        <div className="bg-blue-700 px-5 py-2.5 flex items-center justify-between">
                            <span className="text-blue-100 text-xs font-semibold tracking-widest uppercase">
                                Recent Alerts
                            </span>
                            <span className="text-blue-200 text-xs font-medium">
                                {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {/* Notification rows */}
                        <div className="divide-y divide-slate-100">
                            {notifications.map((n, i) => {
                                const { icon, color } = getNotificationIcon(n.message);
                                return (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors duration-150"
                                    >
                                        {/* Icon bubble */}
                                        <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${color}`}>
                                            {icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-700 font-medium leading-snug">
                                                {n.message}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1 font-medium">
                                                {new Date(n.createdAt).toLocaleString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}