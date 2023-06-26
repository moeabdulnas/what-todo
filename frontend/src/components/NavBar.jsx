import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "./Login";

const NavBar = () => {
  return (
    <>
      <header className="stick top-0 bg-teal-700 text-white shadow-xl">
        <section className="flex justify-between px-10 py-4">
          <Link to="/">
            <h1 className="text-3xl">what-todo</h1>
          </Link>
          <div className="flex gap-6 text-xl">
            {/* <Link>new task</Link> */}
            <Link to="/login">login</Link>
          </div>
        </section>
      </header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default NavBar;
