import 'dotenv/config';
import express, { NextFunction, Request, Response} from 'express';
import todoRouter from './routes/todoRoutes';
import userRouter from './routes/userRoutes';
import morgan from 'morgan';
import createHttpError, {isHttpError} from 'http-errors';
import cors from 'cors';

const app = express();

// We will put middleware and router here
// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/todos', cors(), todoRouter);
app.use('/api/users', cors(), userRouter);
app.use((req, res, next) => {
    next(createHttpError(404, 'Endpoint not found'));
});

// Express error handler. Moved from above to here. Comment below is for NextFunction yellow.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    
    // Make sure it's a http error before returning 500 error.
    let errorMessage = "Unknown internal server error";
    let statusCode = 500;
    if (isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage})
});

export default app;