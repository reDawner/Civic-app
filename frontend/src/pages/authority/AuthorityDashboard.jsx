import Sidebar from "../../components/Sidebar";

const authorityNavItems = [
    { id: "home", icon: "🏠", label: "Assigned Issues", path: "/authority" },
    { id: "download", icon: "⬇️", label: "Status Update", path: "/authority/download" },
    { id: "signout", icon: "🔓", label: "Sign Out" },
];

function AuthorityDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar navItems={authorityNavItems} />

            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold">
                    Authority Dashboard
                </h1>
            </div>
        </div>
    );
}

export default AuthorityDashboard;