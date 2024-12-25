import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DemoPage from "./pages/demo";
import CustomDemoPage from "./pages/custom-demo";
import RestaurantOnboarding from "./pages/restaurants/onboard";
import RestaurantDashboard from "./pages/restaurants/dashboard";
import CreateReviewPage from "./pages/restaurants/create-review-page";
import ReviewPagePreview from "./pages/restaurants/review-page-preview";
import LoginPage from "./pages/auth/LoginPage";
import EmailListsPage from "./pages/dashboard/EmailListsPage";
import { AuthProvider } from "./components/auth/AuthProvider";
import { Toaster } from "./components/ui/toaster";
import { useAuth } from "./components/auth/AuthProvider";

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<DemoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/demo" element={<Navigate to="/" replace />} />
          <Route path="/demo/:slug" element={<CustomDemoPage />} />
          <Route path="/restaurants/onboard" element={<RestaurantOnboarding />} />
          <Route path="/restaurants/dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurants/create-review-page" element={<CreateReviewPage />} />
          <Route path="/restaurants/review-page-preview" element={<ReviewPagePreview />} />
          
          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <EmailListsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/lists/*"
            element={
              <ProtectedRoute>
                <EmailListsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;