import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { useAuth } from "./contexts/useAuth";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import SignupDetails from "./pages/SignupDetails";
import TeamInvite from "./pages/TeamInvite";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddLead from "./pages/AddLead";
import LeadProfile from "./pages/LeadProfile";
import Deals from "./pages/Deals";
import Notifications from "./pages/Notifications";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// App Routes Component
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Standalone Route for Signup Details */}
      <Route path="/signup-details" element={<SignupDetails />} />
      <Route path="/team-invite" element={<TeamInvite />} />

      {/* Dashboard Routes - Protected */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/new" element={<AddLead />} />
        <Route path="/leads/:id" element={<LeadProfile />} />
        {/* Add other dashboard routes here as they are created */}
      </Route>

      {/* Auth Layout for other pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
