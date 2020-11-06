import express from 'express';
import {logger} from '../../helpers/logger';
import {returnMovies} from '../../services/filterMovies';
import {writeToDatabase, getMoviesFromDatabase} from '../../services/movieDbService';

// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @Route /api/movies/testingMovies
 * @Desc retrieve user input and filter movies
 */

router.get('/testingMovies', (req, res) => {
    returnMovies()
        .then((formattedMoivies) => {
            writeToDatabase(formattedMoivies, 'kieran@123.ie')
                .then((movieWritten) =>{
                    res.send(JSON.stringify(formattedMoivies));
                });
        }).catch((err) => {
            logger.error(`${err} error in api`);
        });
});

router.get('/returnMovies', (req, res) => {
    getMoviesFromDatabase('kieran@123.ie')
        .then((userMovieGenerations) =>{
            res.send(userMovieGenerations);
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
});

export default router;
