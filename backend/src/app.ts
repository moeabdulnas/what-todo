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
const ONE_DAY_LIMIT =  60 * 60 * 1000 * 24;

let sessionOptions: SessionOptions = {
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ONE_DAY_LIMIT,
        secure: false
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_STRING,
        dbName: 'sessions-db'
    })
}

// Middleware
if (app.get('env') === 'production'){
    app.set('trust proxy', 1);
    sessionOptions.cookie = sessionOptions.cookie || {}; // Initialize cookie if it's undefined
    sessionOptions.cookie.secure = true;
}
app.use(session(sessionOptions));
app.use(express.json());
// Logging tool
app.use(morgan('dev'));
app.use(
    cors({
      origin: 'http://localhost:5173', // Replace with the actual origin of your frontend application
      credentials: true,
    })
  );
  
// Routes
app.use('/api/todos', todoRouter);
app.use('/api/users', userRouter);
app.use((req, res, next) => {
    next(createHttpError(404, 'Endpoint not found'));
});

// Express error handler. Moved from above to here, to be used last as next() in error handling.
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