import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import AuthorityDashboard from "./pages/authority/AuthorityDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Citizen Pages
import Notifications from "./pages/citizen/Notifications";
import Public from "./pages/citizen/Public";
import ReportIssue from "./pages/citizen/ReportIssue";
import MyReports from "./pages/citizen/MyReports";

// Admin Pages
import AdminOverview from "./pages/admin/AdminOverview";
import AdminIssues from "./pages/admin/AdminIssues";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/citizen/*"
          element={
            <ProtectedRoute allowedRole="citizen">
              <CitizenDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<ReportIssue />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="public" element={<Public />} />
        </Route>

        <Route
          path="/authority/*"
          element={
            <ProtectedRoute allowedRole="authority">
              <AuthorityDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="issues" element={<AdminIssues />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;