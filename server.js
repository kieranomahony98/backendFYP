import express from 'express';
import bodyParser from 'body-parser';
import apiUserRoutes from './routes/api/users';
import apiMovieRoutes from './routes/api/movies';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {logger} from './helpers/logger';

const app = express();
const env = dotenv.config().parsed;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(env.PORT, () => {
    logger.info(`app is listening to port ${env.PORT}`);
});

// config mongodb
const db = env.MONGO_URI;
// connect to db
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Mongoose successfully connected');
    }).catch((err) => {
        logger.error(err);
    });

app.use('/api/users', apiUserRoutes);
app.use('/api/movies', apiMovieRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to babel node');
});
