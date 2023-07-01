import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Todo = (props) => {
  const [done, setDone] = useState(props.todo.done);

  useEffect(() => {
    const updateTodo = async () => {
      try {
        const res = await fetch(
          `http://localhost:5012/api/todos/${props.todo._id}`,
          {
            method: "PATCH",
            credentials: "include",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ todoId: props.todo._id }),
          }
        );
        if (!res.ok) throw new Error("Something went wrong.");
      } catch (error) {
        console.error(error);
        setDone((prevDone) => !prevDone);
      }
    };

    if (done !== props.todo.done) {
      updateTodo();
    }
  }, [done]);

  const deleteTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5012/api/todos/${props.todo._id}`,
        {
          method: "DELETE",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todoId: props.todo._id }),
        }
      );
      if (!res.ok) throw new Error("Something went wrong.");
      
      props.setTodos(
        [...props.todos].filter((todoItem) => todoItem._id != props.todo._id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-lg sm:text-2xl">{props.todo.text}</p>
        <div className="flex gap-3 sm:gap-6">
          <input
            type="checkbox"
            name="check"
            id="check"
            className="w-4 md:w-6"
            checked={done}
            onChange={() => setDone(!done)}
          />
          <BsTrash
            onClick={deleteTodo}
            className="cursor-pointer text-xl md:text-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default Todo;
