import { useEffect, useState } from 'react'
import './App.css'
import { TodoModel } from './models/todo';
import { Col, Container, Row } from 'react-bootstrap';
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
      <Container>
        <Row xs={1} md={2} xl={3} className='g-4'>
          {todos.map( (todo) => (
            <Col key={todo._id}>
              <Todo todo={todo}/>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default App
