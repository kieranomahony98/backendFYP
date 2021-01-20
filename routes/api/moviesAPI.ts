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
    returnMovies(JSON.parse(JSON.stringify(req.body.MovieGenerationModel)))
        .then((formattedMovies) => {
            if (id) {
                writeToDatabase(formattedMovies, id)
                    .then((movieWritten) => {
                        logger.info(`Movie successfully wrote to DB`);
                    }).catch((err) => {
                        logger.error(err);
                    });
            };
            res.send(JSON.stringify(formattedMovies));
        }).catch((err) => {
            logger.error(`${err} error in api`);
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
                res.status(404).send('Unabel to find user movies');
            }
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
});

router.post('/getPlaylists', movieAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;
    if (!id) {
        return res.status(401).send("Please log in to see your playlists")
    }
    getPlaylistsFromDatabase(id)
        .then((playlists) => {
            return res.send(JSON.stringify(playlists));
        })
        .catch(err => {
            logger.error('Failed to get playlists');
            res.status(404).send('Failed to get user movies from database');
        });
});
export default router;
