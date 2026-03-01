import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleBack = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <button onClick={handleBack}>← Back</button>
            <h1>Admin Dashboard</h1>
        </div>
    );
}

export default AdminDashboard;