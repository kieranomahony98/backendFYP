import express from 'express';
import bodyParser from 'body-parser';
import apiUserRoutes from './routes/api/usersAPI';
import apiMovieRoutes from './routes/api/moviesAPI';
import apiAuthRoutes from './routes/api/auth'
import mongoose from 'mongoose';
import { logger } from './helpers/logger';
import cors from 'cors';
import helmet from 'helmet';
import config from 'config';
const app = express();


app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(config.get('PORT'), () => {
    logger.info(`app is listening to port ${config.get('PORT')}`);
});

// config mongodb
const db: string = config.get('MONGO_URI');
// connect to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Mongoose successfully connected');
    }).catch((err) => {
        logger.error(err);
    });

app.use('/api/users', apiUserRoutes);
app.use('/api/movies', apiMovieRoutes);
app.use('/api/auth', apiAuthRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to babel node');
});
