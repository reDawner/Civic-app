import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthorityDashboard() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleBack = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <button onClick={handleBack}>← Back</button>
            <h1>Authority Dashboard</h1>
        </div>
    );
}

export default AuthorityDashboard;