import { Link, Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "./Login";

const NavBar = () => {
  return (
    <>
      <header className="bg-teal-700 text-white stick top-0 shadow-xl">
        <section className="py-4 px-10 flex justify-between">
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
