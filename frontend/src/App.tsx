// import { useEffect, useState } from 'react'
// import './App.css'
// import { Todo as TodoModel } from './models/todo';
// import Todo from './components/Todo';

// function App() {
//   const [todos, setTodos] = useState<TodoModel[]>([]);

//   useEffect(() => {
//       async function fetchTodos(){
//         const res = await fetch('http://localhost:5012/api/todos', {method:"GET"});
//         const data = await res.json();
//         setTodos(data);
//       }
//       fetchTodos();
//   }, [])
  
//   useEffect(() => {
//     console.log(todos);
//   }, [todos]);
//   return (
//     <>
//       <div className="Container">
//         {todos ? todos.map((todo) => (
//           <Todo todo={todo}/>
//         )): null}
//       </div>
//     </>
//   )
// }

// export default App

import { useEffect, useState } from 'react';
import './App.css';
import { Todo as TodoModel } from './models/todo';
import Todo from './components/Todo';
import NavBar from './components/NavBar.tsx';

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay for loading purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch('http://localhost:5012/api/todos', { method: "GET" });
      const data = await res.json();
      setTodos(data);
    }
    
    if (!isLoading) {
      fetchTodos();
    }
  }, [isLoading]);

  const handleToggle = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo._id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter(todo => todo._id !== id);
    setTodos(updatedTodos);
  };

  return (
    <>
          <NavBar />

      <div className="Container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {todos.map(todo => (
              <Todo
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;


