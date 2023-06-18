// todoControllores controls the requests for the todo-db

import { RequestHandler } from "express";
import TodoModel from '../models/todo';
import mongoose from "mongoose";

// We will also handle the errors that occurs
import createHttpError from 'http-errors';


// Get all todos
export const getTodos: RequestHandler = async (req, res, next) => {
    try {
        const todos = await TodoModel.find().exec();
        res.status(200).json(todos);
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

    try {
        if (!text) throw createHttpError(400, 'Todo must have some text.');

        const newTodo = await TodoModel.create({
            text: text
        });

        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
}