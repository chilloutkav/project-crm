import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import DashBoard from "./DashBoard";
import ContactsContainer from "./ContactsContainer";
import ContactsPage from "./ContactsPage";
import DealPage from "./DealPage";
import DealsContainer from "./DealsContainer";
import Reports from "./Reports";
import "../App.css";

function AppContent() {
  const { user } = useAuth();


  if (!user) return <HomePage />;

  return (
    <div className="App">
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
    </div>
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
