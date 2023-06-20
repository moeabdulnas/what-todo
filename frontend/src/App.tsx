import { useEffect, useState } from 'react'
import './App.css'
import { Todo as TodoModel } from './models/todo';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
      async function fetchTodos(){
        const res = await fetch('http://localhost:5012/api/todos', {method:"GET"});
        const data = await res.json();
        setTodos(data);
      }
      fetchTodos();
  }, [])
  
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <>
    </>
  )
}

export default App
