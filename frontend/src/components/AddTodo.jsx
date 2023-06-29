import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = (props) => {
  const [text, setText] = useState("");
  const navigate = useNavigate("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.text.value;
    setText(inputValue);
  };

  useEffect(() => {
    const addTodo = async () => {
      try {
        const res = await fetch("http://localhost:5012/api/todos", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: text }),
        });
        if (!res.ok) alert("Adding did not work. Please try again");
        const resData = await res.json();
        console.log(resData);
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };
    if (text) addTodo();
  }, [text]);

  useEffect(() => {
    if (!props.loggedIn) navigate("/");
  }, []);

  return (
    <div className="absolute h-screen w-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <section className="mx-auto my-4 w-2/3 sm:w-3/5 md:w-3/5 lg:w-2/5 2xl:w-1/5 text-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4 ">
            <label htmlFor="text" className=" text-2xl">
              Todo title
            </label>
            <input
              type="text"
              name="text"
              id="text"
              className="w-56 rounded px-2 py-1"
              required
            />
            <button
              type="submit"
              className="rounded-lg bg-green-800 px-4 py-2 text-xl text-white"
            >
              Add
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddTodo;
