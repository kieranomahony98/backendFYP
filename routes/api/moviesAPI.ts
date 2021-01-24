import express from 'express';
import { logger } from '../../helpers/logger';
import { returnMovies } from '../../services/movieServices/discoverMoviesService';
import { writeToDatabase, getMoviesFromDatabase, getPlaylistsFromDatabase } from '../../services/movieServices/movieDbService';
import { movieAuth } from '../../middleware/auth';

// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @Route /api/movies/movieGeneration
 * @Desc retrieve user input and filter movies
 */
router.post('/movieGeneration', movieAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;
    returnMovies((req.body.MovieGenerationModel))
        .then((formattedMovies) => {
            if (id) {
                writeToDatabase(formattedMovies, id)
                    .then((movieWritten) => {
                        logger.info(`Movie successfully wrote to DB`);
                    }).catch((err) => {
                        logger.error(`Failed to write movies to DB: ${err.message}`);
                        throw err;
                    });
            };
            const returnObj = (req.body.MovieGenerationModel !== formattedMovies.movieSearchCriteria) ? { formattedMovies, isRevised: true } : { formattedMovies, isRevised: false };
            res.send(JSON.stringify(returnObj));
        }).catch((err) => {
            logger.error(`${err} error in api`);
            return res.status(404).send("Error getting movies");
        });
});

router.post('/returnMovies', movieAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;
    if (!id) {
        return res.status(401).send("Please log in to access previous curations");
    }
    getMoviesFromDatabase(id)
        .then((userMovieGenerations) => {
            if (userMovieGenerations) {
                res.status(200).send(userMovieGenerations);
            } else {
                res.status(404).send('Unable to find user movies');
            }
        }).catch((err) => {
            logger.error(err);
            res.status(404).send('Unable to find user movies');
        });
});

router.post('/getPlaylists', movieAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;
    if (!id) {
        return res.status(401).send("Please log in to see your playlists");
    }
    getPlaylistsFromDatabase(id)
        .then((playlists) => {
            return res.send(JSON.stringify(playlists));
        })
        .catch((err) => {
            logger.error(`Failed to get playlists ${err.message}`);
            res.status(404).send('Failed to get user movies from database');
        });
});
export default router;
