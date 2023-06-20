import { Todo as TodoModel } from "../models/todo";

// Type for the props of a Todo component
interface TodoProps {
    todo: TodoModel,
}

const Todo = ({todo}: TodoProps) => {
    // const {
    //     text,
    //     done,
    //     createdAt,
    //     updatedAt
    // } = todo;

    return (
        <>
        </>
    )
};

export default Todo;