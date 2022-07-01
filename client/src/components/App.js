import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "./About";
import NavBar from "./NavBar";
import Home from "./Home";

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

  if (!user) return <Home onLogin={setUser} />;

  return (
    <>
      <NavBar setUser={setUser} />
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

// sorry i was listening to iggy inviting some girl to this place he has been dog sitting at. he and i talk aoubt it a lot but he has never on ce offered that to me. not even to hang with the dog he is sittng for. fucker.
