import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

// 🔒 Protected Route: Sirf Logged-In users ke liye (e.g. Quiz page)
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

// 🔓 Public Route: Agar user pehle se login hai, to use login/signup par mat jaane do
function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/quiz" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route (/) kholte hi agar login hai to quiz, nahi to login */}
        <Route path="/" element={<Navigate to="/quiz" replace />} />

        {/* Public Stack */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        {/* Private Dashboard Stack */}
        <Route path="/quiz" element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } />
        <Route path="/result" element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        } />

        {/* Fallback for random URLs */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}