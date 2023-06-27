import { useEffect, useState } from "react";
import Todo from "./components/Todo";

function App(props) {
  const [todos, setTodos] = useState([]);

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
        props.setLoggedIn(true);
        const data = await res.json();
        console.log(data);

        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (props.loggedIn) fetchTodos();
  }, []);

// Sort todos whenever the todos state changes
const sortedTodos = [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

return (
  <>
    <div className="mx-auto my-4 w-2/3 sm:w-3/5 md:w-3/5 lg:w-2/5 2xl:w-1/5">
      {sortedTodos.length > 0 ? (
        sortedTodos.map((todo) => (
          <div key={todo._id}>
            <Todo todo={todo} />
          </div>
        ))
      ) : (
        <p className="mt-10 text-center text-3xl">
          You don't have any todos yet.
        </p>
      )}
    </div>
  </>
);
}

export default App;
