import { useEffect, useState } from "react"
import Todo from './components/Todo';
import NavBar from './components/NavBar.jsx';


function App() {
  const [todos, setTodos] = useState([]);
  const [loginClicked, setLoginClicked] = useState(false);

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
      <NavBar setLoginClicked={setLoginClicked}/>
      <div className="w-2/3 sm:w-3/5 md:w-3/5 lg:w-2/5 2xl:w-1/5 mx-auto my-4">
        {todos.map(todo => <div key={todo._id}><Todo todo={todo} /></div>)}
      </div>

      {loginClicked ? <dialog open className="backdrop-blur">
        <p className="text-center text-3xl">Login</p>
        <form action="" method="POST" id="login">
          <div className="flex flex-col gap-2">
            <section>
              <label htmlFor="username">Username: </label>
              <input type="text" name="username" />
            </section>
            <section>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" id="password" />
            </section>
            <button onClick={() => setLoginClicked(false)}>Login</button>
          </div>
        </form>
      </dialog>: <></>}
      
    </>
  )
}

export default App
