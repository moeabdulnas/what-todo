import { Link, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import AddTodo from "./components/AddTodo";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:5012/api/todos", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }

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
              <TodoList todos={todos} setTodos={setTodos} />
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
        <Route path="/register" element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </>
  );
};

export default NavBar;
