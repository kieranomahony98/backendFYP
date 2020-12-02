import express from 'express';
import { logger } from '../../helpers/logger';
import { returnMovies } from '../../services/movieServices/discoverMoviesService';
import { writeToDatabase, getMoviesFromDatabase } from '../../services/movieServices/movieDbService';
import { movieAuth } from '../../middleware/auth';

// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @Route /api/movies/movieGeneration
 * @Desc retrieve user input and filter movies
 */
router.post('/movieGeneration', movieAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;

    returnMovies(JSON.parse(JSON.stringify(req.body)))
        .then((formattedMovies) => {
            if (id) {
                console.log('going into if');
                writeToDatabase(formattedMovies, id)
                    .then((movieWritten) => {
                        logger.info(`Movie successfully wrote to DB: ${movieWritten}`);
                    }).catch((err) => {
                        logger.error(err);
                    });
            };
            res.send(JSON.stringify(formattedMovies));
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
