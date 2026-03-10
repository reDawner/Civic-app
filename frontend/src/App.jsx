import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import SystemAnalytics from "./pages/admin/SystemAnalytics";
import CategoryManagement from "./pages/admin/CategoryManagement";
import AuthorityMapping from "./pages/admin/AuthorityMapping";
import ManageRoles from "./pages/admin/ManageRoles";

// Authority
import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
import AssignedIssues from "./pages/authority/AssignedIssues";
import IssueDetail from "./pages/authority/IssueDetail";

// Public
import PublicIssueDetail from "./pages/PublicIssueDetail";

// Login
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/issue/:id" element={<PublicIssueDetail />} />

          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Authority routes */}
          <Route
            path="/authority"
            element={
              <ProtectedRoute allowedRole="authority">
                <AuthorityDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AssignedIssues />} />
            <Route path="issue/:id" element={<IssueDetail />} />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<SystemAnalytics />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="mapping" element={<AuthorityMapping />} />
            <Route path="roles" element={<ManageRoles />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
