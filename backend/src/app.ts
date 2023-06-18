import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import env from './utils/validateEnv';

const app = express();
const PORT = env.PORT;

const MONGO = env.MONGO_STRING;

mongoose.connect(MONGO)
    .then(() => {
        console.log('Connected to mongodb')
        app.listen(PORT, () => {
            console.log('Server listening on port: ' + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })

app.get('/', (req, res) => {
    res.send('Hello world')!
})
