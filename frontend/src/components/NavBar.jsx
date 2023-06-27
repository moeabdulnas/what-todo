import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "./Login";
import AddTodo from "./AddTodo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate("");

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:5012/api/todos", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

        // eslint-disable-next-line react/prop-types
        setLoggedIn(true);
        const data = await res.json();
        console.log(data);

        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5012/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) setLoggedIn(false);
      window.location.reload();
      // const data = await res.json();
      // return data;
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
            {loggedIn ? (
              <>
                <button onClick={() => navigate("/add")}>Add todo</button>
                <button onClick={handleLogout}>Logout</button>
              </>
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
              <App todos={todos} />
            ) : (
              <>
                <p className="mt-10 text-center text-3xl">
                  Please log in to see your todos
                </p>
              </>
            )
          }
        />
        <Route
          path="/login"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/add" element={<AddTodo loggedIn={loggedIn} />} />
      </Routes>
    </>
  );
};

export default NavBar;
