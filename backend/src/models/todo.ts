import { InferSchemaType, Schema, model } from "mongoose";

// Create schema for todos
const todoSchema = new Schema({
    text: {type: String, required:true}
}, {timestamps:true});

// Type creation of a todo
type Todo = InferSchemaType<typeof todoSchema>;

// Export model
export default model<Todo>('Todo', todoSchema);