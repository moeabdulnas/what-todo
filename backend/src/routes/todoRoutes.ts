// Here we add all routers for the todo-app

import * as TodosController from '../controllers/todoControllers';
import express from 'express';

const router = express.Router();

// Get all todos
router.get('/', TodosController.getTodos);

// Get specific todo

// Create a todo
router.post('/', TodosController.createTodo);

// Update a todo


// Delete a todo

// Mark a todo done

export default router;