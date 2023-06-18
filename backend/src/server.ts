import app from './app';
import mongoose from 'mongoose';
import env from './utils/validateEnv';

mongoose.connect(env.MONGO_STRING)
    .then(() => {
        console.log('Connected to mongodb')
        app.listen(env.PORT, () => {
            console.log('Server listening on port: ' + env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })