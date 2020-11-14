import express from 'express';
import bodyParser from 'body-parser';
import apiUserRoutes from './routes/api/usersAPI';
import apiMovieRoutes from './routes/api/moviesAPI';
import mongoose from 'mongoose';
import {logger} from './helpers/logger';
import cors from 'cors';
import helmet from 'helmet';
import endpoints from './endpoints.config';

const app = express();


app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(endpoints.PORT, () => {
    logger.info(`app is listening to port ${endpoints.PORT}`);
});

// config mongodb
const db = endpoints.MONGO_URI;
// connect to db
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        logger.info('Mongoose successfully connected');
    }).catch((err) => {
        logger.error(err);
    });

app.use('/api/users', apiUserRoutes);
app.use('/api/movies', apiMovieRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to babel node');
});
