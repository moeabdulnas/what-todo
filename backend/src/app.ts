import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import env from './utils/validateEnv';
import router from './routes/todoRoutes';
import morgan from 'morgan';

const app = express();

// We will put middleware and router here
// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/todos', router);

export default app;