import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const authorityNavItems = [
  { id: "issues", label: "Assigned Issues", path: "/authority" },
];

function AuthorityDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();

  const isActive = (path) =>
    path === "/authority"
      ? location.pathname === "/authority"
      : location.pathname.startsWith(path);

  const handleSignOut = () => {
    logout();
    setMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="wordmark text-base font-medium tracking-tight text-blue-950">
            civic<span className="text-blue-500">-app</span>
          </span>

          <nav className="hidden md:flex items-center gap-1">
            {authorityNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`relative text-xs font-semibold uppercase px-3 py-1.5 transition-all duration-200
                  ${isActive(item.path)
                    ? "text-blue-700 bg-blue-100 nav-active"
                    : "text-slate-500 hover:text-blue-800 hover:bg-blue-50"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full border border-slate-200">
              <div className="avatar-init w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-white text-[0.7rem] font-bold">
                AU
              </div>
              <span className="text-sm text-gray-700 font-medium">Authority</span>
            </div>
            <button
              onClick={handleSignOut}
              className="hidden md:block text-xs text-slate-400 uppercase px-2 py-1 rounded hover:text-red-500 transition-colors"
            >
              Sign out
            </button>
            <button
              className="md:hidden text-xl text-gray-700 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthorityDashboard;
