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

    return (
        <div className="min-h-screen bg-[#dff0f5] flex flex-col">

            {/* Top Nav */}
            <header className="bg-white border-b border-gray-200 px-6 py-6 flex items-center justify-between relative">
                <span className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-black">
                    Civic Issue Reporting System
                </span>
                <div className="w-6" />
            </header>

            {/* Card */}
            <div className="flex flex-1 items-center justify-center px-4 pb-16 mt-9">
                <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-6">

                    {/* Role Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
                        {roles.map((r) => (
                            <button
                                key={r}
                                onClick={() => {
                                    setSelectedRole(r);
                                    resetSelection();
                                }}
                                className={`flex-1 py-1.5 rounded-md text-xs font-semibold capitalize transition-all duration-150 ${selectedRole === r
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {/* Login / Register Toggle */}
                    <div className="flex justify-center gap-2 mb-5">
                        {["login", "register"].map((t) => (
                            <button
                                key={t}
                                onClick={() => {
                                    setTab(t);
                                    setError("");
                                }}
                                className={`px-5 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-150 ${tab === t
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:text-gray-600"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* User ID */}
                    <div className="mb-3">
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                            User ID
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your user ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-1.5">
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3.5 py-2.5 pr-14 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Back */}
                    <div className="mb-3">
                        <button
                            onClick={resetSelection}
                            className="flex items-center gap-1 text-base text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <span></span>
                            <span>↻</span>
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleLogin}
                        className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors active:scale-[0.99]"
                    >
                        {tab === "login" ? "Login" : "Register"}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Login;