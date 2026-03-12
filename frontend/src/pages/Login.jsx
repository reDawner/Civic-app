import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roles = ["citizen", "authority", "admin"];

function Login() {
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const [selectedRole, setSelectedRole] = useState("citizen");
    const [tab, setTab] = useState("login");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const credentials = {
        citizen: { userId: "citizen1", password: "123456" },
        admin: { userId: "admin", password: "123456" },
        authority: { userId: "auth1", password: "123456" },
    };

    useEffect(() => {
        if (user?.role) {
            navigate(`/${user.role}`);
        }
    }, [user, navigate]);

    const resetSelection = () => {
        setUserId("");
        setPassword("");
        setError("");
    };

    const handleLogin = () => {
        if (!userId || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (tab === "login") {
            const valid = credentials[selectedRole];
            if (valid && userId === valid.userId && password === valid.password) {
                setError("");
                login({ role: selectedRole });
                navigate(`/${selectedRole}`);
            } else {
                setError("Invalid credentials.");
            }
        } else {
            setError("");
            login({ role: selectedRole });
            navigate(`/${selectedRole}`);
        }
    };

    const inputClass =
        "w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 bg-slate-50 hover:bg-white";

    const labelClass =
        "block text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1.5";

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
                body { font-family: 'DM Sans', sans-serif; }
                .wordmark { font-family: 'DM Mono', monospace; }
            `}</style>

            {/* Top Nav */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex items-center justify-between h-14">
                        <span className="wordmark text-base font-medium tracking-tight text-blue-950">
                            civic<span className="text-blue-500">-app</span>
                        </span>
                        <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                            Kerala Civic Reporting Portal
                        </span>
                        <div className="w-24" />
                    </div>
                </div>
            </header>

            {/* Breadcrumb strip */}
            <div className="bg-slate-50 border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-6 py-1.5">
                    <span className="text-[0.72rem] text-slate-400 tracking-widest uppercase font-medium">
                        Kerala Civic Reporting Portal
                        <span className="mx-2 text-slate-300">›</span>
                        <span className="text-blue-500">
                            {tab === "login" ? "Sign In" : "Register"}
                        </span>
                    </span>
                </div>
            </div>

            {/* Card */}
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-sm">

                    {/* Page title */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-blue-950 tracking-tight">
                            {tab === "login" ? "Welcome back" : "Create account"}
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            {tab === "login"
                                ? "Sign in to access your dashboard."
                                : "Register to start reporting civic issues."}
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                        {/* Card header strip */}
                        <div className="bg-blue-700 px-5 py-2.5 flex items-center justify-between">
                            <span className="text-blue-100 text-xs font-semibold tracking-widest uppercase">
                                {tab === "login" ? "Sign In" : "Register"}
                            </span>
                            {/* Login / Register toggle */}
                            <div className="flex items-center gap-1">
                                {["login", "register"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => { setTab(t); setError(""); }}
                                        className={`text-[0.65rem] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md transition-all duration-150 border-none cursor-pointer
                                            ${tab === t
                                                ? "bg-white text-blue-700"
                                                : "bg-blue-600 text-blue-200 hover:bg-blue-500"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="px-5 py-5 space-y-4">

                            {/* Role selector */}
                            <div>
                                <label className={labelClass}>Role</label>
                                <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
                                    {roles.map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => { setSelectedRole(r); resetSelection(); }}
                                            className={`flex-1 py-1.5 rounded-md text-xs font-semibold capitalize transition-all duration-150 border-none cursor-pointer
                                                ${selectedRole === r
                                                    ? "bg-blue-700 text-white shadow-sm"
                                                    : "text-slate-500 bg-transparent hover:text-slate-700"
                                                }`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* User ID */}
                            <div>
                                <label className={labelClass}>User ID</label>
                                <input
                                    type="text"
                                    placeholder="Enter your user ID"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className={labelClass}>Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                        className={`${inputClass} pr-14`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 transition-colors bg-transparent border-none cursor-pointer font-medium"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {/* Reset */}
                            <div className="flex justify-end">
                                <button
                                    onClick={resetSelection}
                                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors bg-transparent border-none cursor-pointer font-medium tracking-widest uppercase flex items-center gap-1"
                                >
                                    ↻ Reset
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <div className="pt-1">
                                <button
                                    onClick={handleLogin}
                                    className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors duration-200 border-none cursor-pointer shadow-sm tracking-widest uppercase"
                                >
                                    {tab === "login" ? "Sign In" : "Register"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
