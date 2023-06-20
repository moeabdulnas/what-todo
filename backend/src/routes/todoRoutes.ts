// Here we add all routers for the todo-app

import * as TodosController from '../controllers/todoControllers';
import express from 'express';

const router = express.Router();

// Get all todos
router.get('/', TodosController.getTodos);

// Get specific todo
router.get('/:todoId', TodosController.getTodo);
// Create a todo
router.post('/', TodosController.createTodo);

// Mark a todo done
router.patch('/:todoId', TodosController.markTodoDone);

// Delete a todo
router.delete('/:todoId', TodosController.deleteTodo);

export default router;