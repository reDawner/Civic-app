import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

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

export default function AuthorityDashboard() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resolvingId, setResolvingId] = useState(null);
    const navigate = useNavigate();

    const { logout } = useAuth();

    const fetchIssues = () => {
        setLoading(true);
        axios
            .get("http://localhost:5000/api/issues")
            .then((res) => {
                setIssues(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const resolveIssue = async (id) => {

        console.log("Resolve clicked:", id);  // DEBUG

        try {
            setResolvingId(id);

            await axios.patch(
                `http://localhost:5000/api/issues/${id}/status`,
                { status: "Resolved" }
            );

            fetchIssues();

        } catch (err) {
            console.error(err);
        } finally {
            setResolvingId(null);
        }
    };

    const handleSignOut = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .wordmark { font-family: 'DM Mono', monospace; }
        .avatar-init { font-family: 'DM Mono', monospace; }
      `}</style>

            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex items-center justify-between h-14">

                        {/* Wordmark */}
                        <span className="wordmark text-base font-medium tracking-tight text-blue-950">
                            civic<span className="text-blue-500">-app</span>
                        </span>

                        {/* Center label */}
                        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                            Authority Portal
                        </span>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            {/* Avatar pill */}
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-slate-200 hover:border-blue-300 transition-colors duration-200 cursor-pointer">
                                <div className="avatar-init w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-[0.7rem] font-bold">
                                    AU
                                </div>
                                <span className="text-sm text-gray-700 font-medium">Authority</span>
                            </div>

                            {/* Sign out */}
                            <button
                                onClick={handleSignOut}
                                className="text-xs text-slate-400 font-medium tracking-widest uppercase px-2 py-1 rounded hover:text-red-500 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                            >
                                Sign out
                            </button>
                        </div>

                    </div>
                </div>
            </header>

            {/* Breadcrumb strip */}
            <div className="bg-slate-50 border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-6 py-1.5">
                    <span className="text-[0.72rem] text-slate-400 tracking-widest uppercase font-medium">
                        Kerala Civic Reporting Portal
                        <span className="mx-2 text-slate-300">›</span>
                        <span className="text-blue-500">Assigned Issues</span>
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-10">

                {/* Page Header */}
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-blue-950 tracking-tight">
                            Assigned Issues
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Review and resolve civic issues assigned to your authority.
                        </p>
                    </div>

                    {/* Refresh button */}
                    <button
                        onClick={fetchIssues}
                        className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 bg-white cursor-pointer"
                    >
                        ⟳ Refresh
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center gap-3 text-slate-400 text-sm py-12 justify-center">
                        <svg className="animate-spin h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none">
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
                        <p className="text-sm font-semibold text-slate-500 tracking-wide">No issues assigned</p>
                        <p className="text-xs text-slate-400 mt-1">Issues assigned to your authority will appear here.</p>
                    </div>
                )}

                {/* Issues List */}
                {!loading && issues.length > 0 && (
                    <div className="space-y-4">
                        {issues.map((issue) => {
                            const severity = issue.ai_analysis?.severity ?? "N/A";
                            const status = issue.status ?? "Pending";

                            return (
                                <div
                                    key={issue._id}
                                    className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200"
                                >
                                    {/* Card header strip */}
                                    <div className="bg-blue-700 px-5 py-2.5 flex items-center justify-between">
                                        <span className="text-blue-100 text-xs font-semibold tracking-widest uppercase">
                                            Issue #{issue.issueNumber}
                                        </span>
                                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusStyles[status] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}>
                                            {status}
                                        </span>
                                    </div>

                                    <div className="px-5 py-4 space-y-3">
                                        {/* Title */}
                                        <h3 className="text-base font-semibold text-blue-950 tracking-tight">
                                            {issue.title}
                                        </h3>

                                        {/* Image evidence — compact thumbnail */}
                                        {issue.image && (
                                            <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2">
                                                <img
                                                    src={`http://localhost:5000/uploads/${issue.image}`}
                                                    alt="Issue evidence"
                                                    className="w-16 h-16 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                                                />
                                                <div className="flex flex-col gap-1 pr-1">
                                                    <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">
                                                        Evidence Photo
                                                    </span>
                                                    <a
                                                        href={`http://localhost:5000/uploads/${issue.image}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                                    >
                                                        View full image ↗
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {/* Description */}
                                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                            {issue.description}
                                        </p>

                                        {/* Meta + Action row */}
                                        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                {/* Severity */}
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${severityStyles[severity] ?? "bg-slate-100 text-slate-500"}`}>
                                                    {severity === "N/A" ? "Severity: N/A" : `${severity} Severity`}
                                                </span>

                                                {/* Location */}
                                                {issue.location && (() => {
                                                    const [lat, lng] = issue.location.split(",");
                                                    return (
                                                        <a
                                                            href={`https://www.google.com/maps?q=${lat},${lng}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
                                                        >
                                                            View on Google Maps
                                                        </a>
                                                    );
                                                })()}
                                            </div>

                                            {/* Resolve button */}
                                            {status !== "Resolved" && (
                                                <button
                                                    onClick={() => resolveIssue(issue._id)}
                                                    disabled={resolvingId === issue._id}
                                                    className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white transition-colors duration-200 border-none cursor-pointer shadow-sm"
                                                >
                                                    {resolvingId === issue._id ? (
                                                        <>
                                                            <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24" fill="none">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                            </svg>
                                                            Resolving...
                                                        </>
                                                    ) : (
                                                        "✓ Mark Resolved"
                                                    )}
                                                </button>
                                            )}

                                            {/* Resolved badge */}
                                            {status === "Resolved" && (
                                                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-100 text-green-700">
                                                    ✓ Resolved
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
