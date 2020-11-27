import express from 'express';
import { logger } from '../../helpers/logger';
import { returnMovies } from '../../services/movieServices/discoverMoviesService';
import { writeToDatabase, getMoviesFromDatabase } from '../../services/movieServices/movieDbService';

// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @Route /api/movies/testingMovies
 * @Desc retrieve user input and filter movies
 */
router.post('/movieGeneration', (req, res) => {
    returnMovies(JSON.parse(JSON.stringify(req.body)))
        .then((formattedMovies) => {
            res.send(JSON.stringify(formattedMovies));
            writeToDatabase(formattedMovies, 'kieran@123.ie')
                .then((movieWritten) => {
                    res.send(JSON.stringify(formattedMovies));
                });
        }).catch((err) => {
            logger.error(`${err} error in api`);
        });
});

router.get('/returnMovies', (req, res) => {
    getMoviesFromDatabase('kieran@123.ie')
        .then((userMovieGenerations) => {
            res.send(userMovieGenerations);
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
});

export default router;
