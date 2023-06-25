import { useEffect, useState } from "react"
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('http://localhost:5012/api/todos');
        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchTodos();
  }, []);
  



  return (
    <>
      <div className="w-2/3 sm:w-3/5 md:w-3/5 lg:w-2/5 2xl:w-1/5 mx-auto ">
        {todos.map(todo => <div key={todo._id}><Todo todo={todo}/></div> )}
      </div>
    </>
  )
}

export default App
