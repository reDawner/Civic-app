import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const adminNavItems = [
    { id: "home", label: "Overview", path: "/admin" },
    { id: "issues", label: "View Issues", path: "/admin/issues" },
];

function AdminDashboard() {

    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const { logout } = useAuth();

    const isActive = (path) =>
        path === "/admin"
            ? location.pathname === "/admin"
            : location.pathname.startsWith(path);

    const handleSignOut = () => {
        logout();
        setMenuOpen(false);
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
                body { font-family: 'DM Sans', sans-serif; }
                .wordmark { font-family: 'DM Mono', monospace; }
                .avatar-init { font-family: 'DM Mono', monospace; }
                .nav-active::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 2px;
                    background: #7c3aed;
                    border-radius: 2px 2px 0 0;
                }
            `}</style>

            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex items-center justify-between h-14">

                        {/* Wordmark */}
                        <span className="wordmark text-base font-medium tracking-tight text-blue-950">
                            civic<span className="text-blue-500">-app</span>
                        </span>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {adminNavItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => navigate(item.path)}
                                    className={`relative text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-md transition-all duration-200 border-none cursor-pointer
                                        ${isActive(item.path)
                                            ? "text-purple-700 bg-purple-100 font-semibold nav-active"
                                            : "text-slate-500 bg-transparent hover:text-purple-800 hover:bg-purple-50"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        {/* Right side */}
                        <div className="flex items-center gap-3">

                            {/* Avatar pill */}
                            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full border border-slate-200 hover:border-purple-300 transition-colors duration-200 cursor-pointer">
                                <div className="avatar-init w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 flex items-center justify-center text-white text-[0.7rem] font-bold">
                                    AD
                                </div>
                                <span className="text-sm text-gray-700 font-medium">Admin</span>
                            </div>

                            {/* Sign out */}
                            <button
                                onClick={handleSignOut}
                                className="hidden md:block text-xs text-slate-400 font-medium tracking-widest uppercase px-2 py-1 rounded hover:text-red-500 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                            >
                                Sign out
                            </button>

                            {/* Mobile hamburger */}
                            <button
                                className="md:hidden bg-transparent border-none cursor-pointer text-xl text-gray-700 p-1"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                {menuOpen ? "✕" : "☰"}
                            </button>

                        </div>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {menuOpen && (
                    <div className="md:hidden fixed top-14 left-0 right-0 bg-white border-b border-slate-200 px-4 py-3 z-40 shadow-lg">
                        {adminNavItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                                className={`block w-full text-left text-xs font-medium tracking-widest uppercase px-3 py-2 rounded-md mb-1 transition-all duration-200 border-none cursor-pointer
                                    ${isActive(item.path)
                                        ? "text-purple-700 bg-purple-100 font-semibold"
                                        : "text-slate-500 hover:text-purple-800 hover:bg-purple-50"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left text-xs font-medium tracking-widest uppercase px-3 py-2 rounded-md mt-2 text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 border-none cursor-pointer bg-transparent"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </header>

            {/* Breadcrumb strip */}
            <div className="bg-slate-50 border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-6 py-1.5">
                    <span className="text-[0.72rem] text-slate-400 tracking-widest uppercase font-medium">
                        Kerala Civic Reporting Portal
                        <span className="mx-2 text-slate-300">›</span>
                        <span className="text-purple-600">
                            {adminNavItems.find(n => isActive(n.path))?.label ?? "Admin"}
                        </span>
                    </span>
                </div>
            </div>

            {/* Main content */}
            <main className="max-w-5xl mx-auto px-6 py-10">
                <Outlet />
            </main>

        </div>
    );
}

export default AdminDashboard;