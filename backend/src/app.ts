import 'dotenv/config';
import express, { NextFunction, Request, Response} from 'express';
import todoRouter from './routes/todoRoutes';
import userRouter from './routes/userRoutes';
import session, { SessionOptions } from 'express-session';
import morgan from 'morgan';
import createHttpError, {isHttpError} from 'http-errors';
import cors from 'cors';
import env from './utils/validateEnv';
import MongoStore from 'connect-mongo';

const app = express();
let sessionOptions: SessionOptions = {
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: false
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_STRING,
        dbName: 'sessions-db'
    })
}

// We will put middleware and router here
// Middleware
if (app.get('env') === 'production'){
    app.set('trust proxy', 1);
    sessionOptions.cookie = sessionOptions.cookie || {}; // Initialize cookie if it's undefined
    sessionOptions.cookie.secure = true;
}
app.use(session(sessionOptions));
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