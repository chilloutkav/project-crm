import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import DashBoard from "./DashBoard";
import SignUpLoginPage from "./SignUpLoginPage";
import ContactsContainer from "./ContactsContainer";
import "../App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //auto-login
    fetchUser();
  }, []);

  function fetchUser() {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }

  // if (!user) return <HomePage onLogin={setUser} />;

  return (
    <div className="App">
      <NavBar setUser={setUser} />
      <Routes>
        <Route exact path="/" element={<HomePage user={user} />} />
        <Route
          path="/dashboard"
          element={<DashBoard user={user} fetchUser={fetchUser} />}
        />
        <Route path="/login" element={<SignUpLoginPage onLogin={setUser} />} />
        <Route path="/contacts" element={<ContactsContainer user={user} />} />
        <Route path="/deals element={} " />
      </Routes>
    </div>
  );
}

export default App;
