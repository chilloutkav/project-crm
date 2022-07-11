import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import DashBoard from "./DashBoard";
import SignUpLoginPage from "./SignUpLoginPage";
import ContactsContainer from "./ContactsContainer";
import ContactsPage from "./ContactsPage";
import ModalPopover from "./ModalPopover";
import DealPage from "./DealPage";
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

  const modalHandler = () => {
    document.querySelector(".modalPopover").style.display = "flex";
    document.getElementById("lightBoxBg").style.display = "flex";
  };

  if (!user) return <HomePage onLogin={setUser} />;

  return (
    <div className="App">
      {<ModalPopover user={user} />}
      <NavBar setUser={setUser} />
      <Routes>
        <Route exact path="/" element={<HomePage user={user} />} />
        <Route
          path="/dashboard"
          element={
            <DashBoard
              user={user}
              fetchUser={fetchUser}
              modalHandler={modalHandler}
            />
          }
        />
        <Route path="/login" element={<SignUpLoginPage onLogin={setUser} />} />
        <Route path="/dashboard/deals/:id" element={<DealPage />} />
        <Route
          path="/dashboard/contacts"
          element={<ContactsContainer user={user} />}
        />
        <Route path="/dashboard/contacts/:id" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}

export default App;
