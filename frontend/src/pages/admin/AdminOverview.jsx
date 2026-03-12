import { useEffect, useState } from "react";

const statCards = [
    {
        key: "totalIssues",
        label: "Total Issues",
        icon: "≡",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        iconColor: "bg-blue-100 text-blue-600",
    },
    {
        key: "pendingIssues",
        label: "Pending",
        icon: "◷",
        color: "bg-white-50 text-yellow-700 border-yellow-200",
        iconColor: "bg-yellow-100 text-yellow-600",
    },
    {
        key: "inProgressIssues",
        label: "In Progress",
        icon: "⟳",
        color: "bg-orange-50 text-orange-700 border-orange-200",
        iconColor: "bg-orange-100 text-orange-600",
    },
    {
        key: "resolvedIssues",
        label: "Resolved",
        icon: "✓",
        color: "bg-green-50 text-green-700 border-green-200",
        iconColor: "bg-green-100 text-green-600",
    },
];

function AdminOverview() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/admin/stats");
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-blue-950 tracking-tight">
                    System Overview
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    A snapshot of all civic issues across Kerala.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center gap-3 text-slate-400 text-sm py-12 justify-center">
                    <svg className="animate-spin h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading stats...
                </div>
            )}

            {/* Stats Grid */}
            {!loading && stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {statCards.map(({ key, label, icon, color, iconColor }) => (
                        <div
                            key={key}
                            className={`bg-white border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 ${color}`}
                        >
                            {/* Card header strip */}
                            <div className="bg-purple-700 px-4 py-2">
                                <span className="text-purple-100 text-xs font-semibold tracking-widest uppercase">
                                    {label}
                                </span>
                            </div>

                            <div className="px-4 py-4 flex items-center justify-between">
                                <span className="text-3xl font-semibold tracking-tight">
                                    {stats[key] ?? 0}
                                </span>
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold ${iconColor}`}>
                                    {icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminOverview;
