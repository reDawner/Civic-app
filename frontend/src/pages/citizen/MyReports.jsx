import { useEffect, useState } from "react";
import axios from "axios";

const statusStyles = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Analysis: "bg-purple-50 text-purple-700 border-purple-200",
    Assigned: "bg-blue-50 text-blue-700 border-blue-200",
    "In Progress": "bg-orange-50 text-orange-700 border-orange-200",
    Resolved: "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
};

const severityStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
};

export default function MyReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/issues/my", {
                headers: { userid: "demoUser" },
            })
            .then((res) => {
                setReports(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-blue-950 tracking-tight">
                    My Reported Issues
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Track the status and updates of all issues you've submitted.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center gap-3 text-slate-400 text-sm py-12 justify-center">
                    <svg className="animate-spin h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading your reports...
                </div>
            )}

            {/* Empty State */}
            {!loading && reports.length === 0 && (
                <div className="max-w-2xl flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center">
                    <span className="text-4xl mb-3">📋</span>
                    <p className="text-sm font-semibold text-slate-500 tracking-wide">No reports submitted yet</p>
                    <p className="text-xs text-slate-400 mt-1">Your submitted issues will appear here.</p>
                </div>
            )}

            {/* Reports List */}
            {!loading && reports.length > 0 && (
                <div className="max-w-2xl space-y-4">
                    {reports.map((r, i) => {
                        const severity = r.ai_analysis?.severity ?? "N/A";
                        const status = r.status ?? "Pending";

                        return (
                            <div
                                key={i}
                                className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200"
                            >
                                {/* Card top strip */}
                                <div className="bg-blue-700 px-5 py-2.5 flex items-center justify-between">
                                    <span className="text-blue-100 text-xs font-semibold tracking-widest uppercase">
                                        Issue #{String(i + 1).padStart(3, "0")}
                                    </span>
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusStyles[status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                                        {status}
                                    </span>
                                </div>

                                <div className="px-5 py-4 space-y-3">
                                    {/* Title */}
                                    <h3 className="text-base font-semibold text-blue-950 tracking-tight">
                                        {r.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                        {r.description}
                                    </p>

                                    {/* Meta row */}
                                    <div className="flex items-center gap-3 pt-1 flex-wrap">
                                        {/* Severity */}
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${severityStyles[severity] ?? "bg-slate-100 text-slate-500"}`}>
                                            {severity === "N/A" ? "Severity: N/A" : `${severity} Severity`}
                                        </span>

                                        {/* Location */}
                                        {r.location && (
                                            <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                                                <span>⌖</span> {r.location}
                                            </span>
                                        )}

                                        {/* Assigned authority */}
                                        {r.assignedAuthority && (
                                            <span className="flex items-center gap-1 text-xs text-blue-500 font-medium">
                                                <span>→</span> {r.assignedAuthority}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}