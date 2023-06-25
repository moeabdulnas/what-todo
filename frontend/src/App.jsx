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
      {todos.map(todo => <div key={todo._id}><Todo todo={todo}/></div> )}
    </>
  )
}

export default App
