import { Card } from "react-bootstrap"
import { Todo as TodoModel } from "../models/todo"

// Type for the props of a Todo component
interface TodoProps {
    todo: TodoModel,
}

const Todo = ({todo}: TodoProps) => {
    const {
        text,
        done,
        createdAt,
        updatedAt
    } = todo;

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {text}
                    </Card.Title>
                    <Card.Text>
                        {done ? <>Completed</>: <>Not done yet</>}
                    </Card.Text>
                </Card.Body>

                <Card.Footer>
                    {createdAt}
                    {updatedAt}
                </Card.Footer>

            </Card>
        </>
    )
}

export default Todo;