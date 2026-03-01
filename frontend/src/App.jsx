import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import AuthorityDashboard from "./pages/authority/AuthorityDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Citizen Pages
import Reports from "./pages/citizen/Reports";
import Notifications from "./pages/citizen/Notifications";
import Public from "./pages/citizen/Public";

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
          <Route path="reports" element={<Reports />} />
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
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;