import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ navItems }) {
    const [active, setActive] = useState("home");
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleClick = (item) => {
        if (item.id === "signout") {
            logout();
            navigate("/");
            return;
        }

        setActive(item.id);

        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <aside
            className="flex flex-col w-72 min-h-screen"
            style={{ background: "#2b2f3a", fontFamily: "'Segoe UI', sans-serif" }}
        >
            {/* Cover */}
            <div className="relative">
                <div
                    className="w-full h-36 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url(https://cloudinary.com/guides/front-end-development/css-background-image-quick-tutorial-and-3-automation-tips)",
                    }}
                />

                {/* Avatar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <img
                        src="https://cloudinary.com/guides/front-end-development/css-background-image-quick-tutorial-and-3-automation-tips"
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-4"
                        style={{ borderColor: "#2b2f3a" }}
                    />
                </div>
            </div>

            {/* Name */}
            <div className="mt-14 mb-6 text-center px-4">
                <p className="text-white text-lg font-semibold leading-tight">
                    {user?.userId}
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className="flex items-center gap-4 w-full px-5 py-3 rounded-lg text-left transition-all duration-150"
                        style={{
                            color: active === item.id ? "#ffffff" : "#9ca3af",
                            background:
                                active === item.id
                                    ? "rgba(255,255,255,0.08)"
                                    : "transparent",
                        }}
                        onMouseEnter={(e) => {
                            if (active !== item.id)
                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                            if (active !== item.id)
                                e.currentTarget.style.background = "transparent";
                        }}
                    >
                        <span className="text-lg w-6 text-center">
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium">
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="px-5 py-4 text-center text-gray-600 text-xs">
            </div>
        </aside>
    );
}