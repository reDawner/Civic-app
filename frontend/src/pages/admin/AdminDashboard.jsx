import Sidebar from "../../components/Sidebar";

const adminNavItems = [
    { id: "home", icon: "🏠", label: "Dashboard", path: "/admin" },
    { id: "download", icon: "⬇️", label: "Example1", path: "/admin/download" },
    { id: "gift", icon: "🎁", label: "Example2", path: "/admin/gift" },
    { id: "review", icon: "🏆", label: "Example3", path: "/admin/review" },
    { id: "signout", icon: "🔓", label: "Sign Out" },
];

function AdminDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navItems={adminNavItems} />

            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold">
                    Admin Dashboard
                </h1>
            </div>
        </div>
    );
}

export default AdminDashboard;