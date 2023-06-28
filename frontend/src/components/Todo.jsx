import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Todo = ({ todo }) => {
  const [done, setDone] = useState(todo.done);

  useEffect(() => {
    const updateTodo = async () => {
      try {
        const res = await fetch(`http://localhost:5012/api/todos/${todo._id}`, {
          method: "PATCH",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todoId: todo._id }),
        });
        if (!res.ok) {
          throw new Error("Something went wrong.");
        }
        const newTodo = await res.json();
        todo.done = newTodo.done;
      } catch (error) {
        console.error(error);
        setDone((prevDone) => !prevDone); 
      }
    };

    if (done !== todo.done) {
      updateTodo();
    }
  }, [done, todo.done, todo._id]);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-lg sm:text-2xl">{todo.text}</p>
        <div className="flex gap-3 sm:gap-6">
          <input
            type="checkbox"
            name="check"
            id="check"
            className="w-4 md:w-6"
            checked={done}
            onChange={() => setDone(!done)}
          />
          <BsTrash className="cursor-pointer text-xl md:text-2xl" />
        </div>
      </div>
    </>
  );
};

export default Todo;
