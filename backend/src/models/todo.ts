import mongoose, { InferSchemaType, Schema, model } from "mongoose";
import UserModel from "./user";

// Create schema for todos
const todoSchema = new Schema({
    text: {type: String, required:true},
    done: {type: Boolean, default: false},
    owner: {ref: 'User', type: mongoose.Schema.Types.ObjectId}
}, {timestamps:true});

// Type creation of a todo
type Todo = InferSchemaType<typeof todoSchema>;

// Export model
export default model<Todo & mongoose.Document>('Todo', todoSchema);