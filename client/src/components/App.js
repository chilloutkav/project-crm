import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";
import useOnlineStatus from "../hooks/useOnlineStatus";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import DashBoard from "./DashBoard";
import CompaniesContainer from "./CompaniesContainer";
import CompanyPage from "./CompanyPage";
import ContactsContainer from "./ContactsContainer";
import ContactsPage from "./ContactsPage";
import DealPage from "./DealPage";
import DealsContainer from "./DealsContainer";
import Reports from "./Reports";
import "../App.css";

function AppContent() {
  const { user } = useAuth();
  const isOnline = useOnlineStatus();

  if (!user) return <HomePage />;

  return (
    <main className="App">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-yellow-500 text-white px-4 py-3 shadow-lg">
          <div className="container mx-auto flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              You are currently offline. Some features may not be available.
            </span>
          </div>
        </div>
      )}

      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={<HomePage user={user} />}
        />
        <Route
          path="/dashboard"
          element={<DashBoard user={user} />}
        />
        <Route
          path="/dashboard/companies"
          element={<CompaniesContainer user={user} />}
        />
        <Route path="/dashboard/companies/:id" element={<CompanyPage />} />
        <Route
          path="/dashboard/deals"
          element={<DealsContainer user={user} />}
        />
        <Route path="/dashboard/deals/:id" element={<DealPage />} />
        <Route
          path="/dashboard/contacts"
          element={<ContactsContainer user={user} />}
        />
        <Route path="/dashboard/contacts/:id" element={<ContactsPage />} />
        <Route
          path="/dashboard/reports"
          element={<Reports user={user} />}
        />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
