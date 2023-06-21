import { Schema, InferSchemaType, model } from "mongoose";
import mongoose from "mongoose";
 
// User Schema
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);