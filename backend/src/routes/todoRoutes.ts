// Here we add all routers for the todo-app

import * as TodosController from '../controllers/todoControllers';
import express from 'express';

const router = express.Router();

router.get('/', TodosController.getTodos);

router.post('/', TodosController.createTodo);

export default router;