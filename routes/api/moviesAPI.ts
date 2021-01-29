import express from 'express';
import { logger } from '../../helpers/logger';
import { returnMovies } from '../../services/movieServices/discoverMoviesService';
import { writeToDatabase, getMoviesFromDatabase, getPlaylistsFromDatabase } from '../../services/dbServices/movieDbService';
import { movieAuth } from '../../middleware/auth';
import { addComment, updateSingleComment, getCommentsForPost } from '../../services/commentServices/commentService'
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

/**
 * @Route /api/movies/returnMovies
 * @Desc retrieves all generations for a user
 */
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
/**
 * @Route /api/movies/getPlaylists
 * @Desc retrieves all user playlists from database
 */

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

/**
 * @Route /api/movies/comments/addComments
 * @Desc adds comment to database
 */
router.post('/comments/addComments', movieAuth, (req, res) => {

    addComment(req.body)
        .then((commentAdded) => {
            res.send(commentAdded);
        })
        .catch((err) => {
            logger.error(`Failed to add comment: ${err.message}`);
            res.status(500).send('Sorry, but youre comment could not be added right now, please try again later');
        })
});

/**
 * @Route /api/movies/comments/getComments
 * @param postId: id of post to query in db
 * @Desc adds comment to database
 */
router.get('/comments/getComments/:postId', (req, res) => {
    console.log(req.params.postId)
    getCommentsForPost(req.params.postId)
        .then((comments) => {
            console.log(comments);
            res.send(comments)
        }).catch((err) => {
            logger.error(`Failed to get comments: ${err.message}`);
            res.status(500).send('Failed to get comments for this post');

        })
})

// router.post('/comments/updateComment', movieAuth, (req, res) => {
//     updateSingleComment()
// })
export default router;
