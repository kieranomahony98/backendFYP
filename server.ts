import express from 'express';
import apiUserRoutes from './routes/api/usersAPI';
import apiMovieRoutes from './routes/api/moviesAPI';
import apiAuthRoutes from './routes/api/auth';
import apiDataRoutes from './routes/api/insights';
import mongoose from 'mongoose';
import { logger } from './helpers/logger';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv'
dotenv.config();
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
    logger.info(`app is listening to port ${process.env.PORT}`);
});


// config mongodb
const db = (process.env.MONGO_URI) ? process.env.MONGO_URI : '';
// connect to db
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        logger.info('Mongoose successfully connected');
    }).catch((err) => {
        logger.error(err);
    });

app.use('/api/users', apiUserRoutes);
app.use('/api/movies', apiMovieRoutes);
app.use('/api/auth', apiAuthRoutes);
app.use('/api/data/insights', apiDataRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to babel node');
});
