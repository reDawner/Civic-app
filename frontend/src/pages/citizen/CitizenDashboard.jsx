import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const citizenNavItems = [
    { id: "home", icon: "🏠", label: "Report New Issue", path: "/citizen" },
    { id: "reports", icon: "⬇️", label: "My Reported Issues", path: "/citizen/reports" },
    { id: "notifications", icon: "🎁", label: "Notifications", path: "/citizen/notifications" },
    { id: "public", icon: "🏆", label: "Public Issues", path: "/citizen/public" },
    { id: "signout", icon: "🔓", label: "Sign Out" },
];

function CitizenDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navItems={citizenNavItems} />

            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
}

export default CitizenDashboard;