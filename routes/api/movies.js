import express from 'express';
import {logger} from '../../helpers/logger';
import {movies} from '../../helpers/theMovieDb';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/testingMovies', (req, res) => {
    movies()
        .then((m) => {
            res.send(JSON.stringify(m));
        }).catch((err) => {
            logger.error(err);
        });
});
export default router;
