import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import { useState } from "react";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5012/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) setLoggedIn(false);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <header className="stick top-0 bg-teal-700 text-white shadow-xl">
        <section className="flex justify-between px-10 py-4">
          <Link to="/">
            <h1 className="text-3xl">what-todo</h1>
          </Link>
          <div className="flex gap-6 text-xl">
            {/* <Link>new task</Link> */}
            {loggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">login</Link>
            )}
          </div>
        </section>
      </header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      </Routes>
    </>
  );
};

export default NavBar;
