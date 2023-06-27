// todoControllores controls the requests for the todo-db

import { RequestHandler } from "express";
import TodoModel from '../models/todo';
import mongoose from "mongoose";

// We will also handle the errors that occurs
import createHttpError from 'http-errors';

// TodoId params type
interface TodoIdParams {
    todoId: string
}
// Get all todos
export const getTodos: RequestHandler = async (req, res, next) => {
    const userId = req.session.userId;

    try {
        if (!userId) throw createHttpError(400, "Unauthorized");
        const todos = await TodoModel.find( {owner: userId} ).exec();
        // const todos = await TodoModel.find().exec();
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
}

// Get specific todo
export const getTodo: RequestHandler<TodoIdParams, unknown, unknown, unknown> = async (req, res, next) => {
    const todoId = req.params.todoId;
    const userId = req.session.userId;
    try {
        if (!userId) throw createHttpError(400, "Unauthorized");
        if (!mongoose.isValidObjectId(todoId)) throw createHttpError(400, "Invalid todo id");
        const todo = await TodoModel.findById(todoId).exec();
        if (!todo) throw createHttpError(404, 'Todo not found');

        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
}

// For creating, the user needs to send it with a body, so we need a type for that
interface CreateTodoBody {
    text: string
}

export const createTodo: RequestHandler<unknown, unknown, CreateTodoBody, unknown> = async (req, res, next) => {
    const text = req.body.text;
    const userId = req.session.userId;

    try {
        if (!userId) throw createHttpError(400, "Unauthorized");
        if (!text) throw createHttpError(400, 'Todo must have some text.');

        const newTodo = await TodoModel.create({
            text: text,
            owner: userId
        });

        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
}

// Toggle todo done/not done
export const markTodoDone: RequestHandler<TodoIdParams, unknown, unknown, unknown> = async(req, res, next) => {
    const todoId = req.params.todoId;
    const userId = req.session.userId;

    try {
        if (!userId) throw createHttpError(400, "Unauthorized");
        if (!mongoose.isValidObjectId(todoId)) throw createHttpError(400, "Invalid todo id");

        const todo = await TodoModel.findById(todoId);
        if (!todo) throw createHttpError(404, 'Todo not found');

        if (todo.done) todo.done = false;
        else todo.done = true;
        
        const updatedTodo = await todo.save();

        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
}


// Delete todo
export const deleteTodo: RequestHandler<TodoIdParams, unknown, unknown, unknown> = async(req, res, next) => {
    const todoId = req.params.todoId;
    const userId = req.session.userId;

    try {
        const userId = req.session.userId;
        if (!mongoose.isValidObjectId(todoId)) throw createHttpError(400, "Invalid not id");

        const todo = await TodoModel.findOneAndDelete({_id: todoId}).exec();
        if (!todo) throw createHttpError(404, 'Todo not found');
        else res.sendStatus(204);
    } catch(error) {
        next(error);
    }
}
