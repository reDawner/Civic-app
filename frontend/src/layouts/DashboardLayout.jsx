import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
    return (
        <div>
            <div style={{ display: "flex" }}>
                <Sidebar />

                <div style={{ flex: 1, padding: "20px" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;