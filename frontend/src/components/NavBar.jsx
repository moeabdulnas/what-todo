import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Update loggedIn state when session cookie changes
  useEffect(() => {
    const handleCookieChange = () => {
      const sessionCookie = document.cookie.includes("connect.sid");
      setLoggedIn(sessionCookie);
    };

    window.addEventListener("storage", handleCookieChange);

    return () => {
      window.removeEventListener("storage", handleCookieChange);
    };
  }, []);
  const navigate = useNavigate("");

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5012/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) setLoggedIn(false);
      window.location.reload();
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
              <button onClick={() => navigate("/login")}>login</button>
            )}
          </div>
        </section>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <App loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            ) : (
              <>
                <p className="text-3xl text-center mt-10">Please log in to see your todos</p>
              </>
            )
          }
        />
        <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </>
  );
};

export default NavBar;
