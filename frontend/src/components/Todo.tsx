// import { Todo as TodoModel } from "../models/todo";
// import "./Todo.css";
// // Type for the props of a Todo component
// interface TodoProps {
//     todo: TodoModel,
// }

// const Todo = ({ todo }: TodoProps) => {
//     const {
//         text,
//         done,
//         createdAt,
//         updatedAt
//     } = todo;

//     return (
//         <>

//         </>
//     )
// };

// export default Todo;
import { Todo as TodoModel } from "../models/todo";
import "./Todo.css";

interface TodoProps {
    todo: TodoModel;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const Todo = ({ todo, onToggle, onDelete }: TodoProps) => {
    const { _id, text, done, createdAt, updatedAt } = todo;

    const handleToggle = () => {
        onToggle(_id);
    };

    const handleDelete = () => {
        onDelete(_id);
    };

    return (
        <div className={`Todo ${done ? 'done' : ''}`}>
            <p className="Todo-text">{text}</p>
            <div className="Todo-header">
                <input
                    type="checkbox"
                    checked={done}
                    onChange={handleToggle}
                />
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
            {/* <p className="Todo-timestamp">Created at: {createdAt}</p>
            <p className="Todo-timestamp">Updated at: {updatedAt}</p> */}
        </div>
    );
};

export default Todo;

