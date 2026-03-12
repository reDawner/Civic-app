import { useEffect, useState } from "react";

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

function AdminIssues() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [confirmId, setConfirmId] = useState(null);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/admin/issues");
            const data = await res.json();
            setIssues(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteIssue = async (id) => {
        try {
            setDeletingId(id);
            await fetch(`http://localhost:5000/api/admin/issues/${id}`, {
                method: "DELETE",
            });
            setConfirmId(null);
            fetchIssues();
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-blue-950 tracking-tight">
                        All Issues
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Manage and moderate all reported civic issues.
                    </p>
                </div>

                {/* Refresh button */}
                <button
                    onClick={fetchIssues}
                    className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 bg-white cursor-pointer"
                >
                    ⟳ Refresh
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex items-center gap-3 text-slate-400 text-sm py-12 justify-center">
                    <svg className="animate-spin h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Loading issues...
                </div>
            )}

            {/* Empty State */}
            {!loading && issues.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center">
                    <span className="text-4xl mb-3">📭</span>
                    <p className="text-sm font-semibold text-slate-500 tracking-wide">No issues found</p>
                    <p className="text-xs text-slate-400 mt-1">Reported issues will appear here.</p>
                </div>
            )}

            {/* Table */}
            {!loading && issues.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* Table header strip */}
                    <div className="bg-purple-700 px-5 py-2.5 flex items-center justify-between">
                        <span className="text-purple-100 text-xs font-semibold tracking-widest uppercase">
                            Issue Registry
                        </span>
                        <span className="text-purple-200 text-xs font-medium">
                            {issues.length} issue{issues.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    {["#", "Title", "Location", "Severity", "Status", "Action"].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left text-[0.68rem] font-semibold tracking-widest uppercase text-slate-400 px-5 py-3"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {issues.map((issue) => {
                                    const severity = issue.ai_analysis?.severity ?? "N/A";
                                    const status = issue.status ?? "Pending";

                                    return (
                                        <tr
                                            key={issue._id}
                                            className="hover:bg-slate-50 transition-colors duration-150"
                                        >
                                            {/* Issue number */}
                                            <td className="px-5 py-3.5">
                                                <span className="text-xs font-semibold text-slate-400 tracking-widest">
                                                    #{issue.issueNumber}
                                                </span>
                                            </td>

                                            {/* Title */}
                                            <td className="px-5 py-3.5">
                                                <span className="text-sm font-semibold text-blue-950">
                                                    {issue.title}
                                                </span>
                                            </td>

                                            {/* Location */}
                                            <td className="px-5 py-3.5">
                                                {issue.location ? (() => {
                                                    const [lat, lng] = issue.location.split(",");
                                                    return (
                                                        <a
                                                            href={`https://www.google.com/maps?q=${lat},${lng}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-600 hover:underline font-medium"
                                                        >
                                                            View on Maps
                                                        </a>
                                                    );
                                                })() : (
                                                    <span className="text-xs text-slate-400">—</span>
                                                )}
                                            </td>

                                            {/* Severity */}
                                            <td className="px-5 py-3.5">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${severityStyles[severity] ?? "bg-slate-100 text-slate-500"}`}>
                                                    {severity}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-3.5">
                                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusStyles[status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                                                    {status}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="px-5 py-3.5">
                                                {confirmId === issue._id ? (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => deleteIssue(issue._id)}
                                                            disabled={deletingId === issue._id}
                                                            className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white border-none cursor-pointer transition-colors duration-200"
                                                        >
                                                            {deletingId === issue._id ? "..." : "Confirm"}
                                                        </button>
                                                        <button
                                                            onClick={() => setConfirmId(null)}
                                                            className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 bg-white cursor-pointer transition-colors duration-200"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setConfirmId(issue._id)}
                                                        className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 bg-white cursor-pointer transition-colors duration-200"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminIssues;
