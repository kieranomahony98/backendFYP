import express from 'express';
import { logger } from '../../helpers/logger';
import { returnMovies, test } from '../../services/movieServices/discoverMoviesService';
import { writeToDatabase, getMoviesFromDatabase, getPlaylistsFromDatabase, getSingleGeneration } from '../../services/dbServices/movieDbService';
import { auth, getAuth, generationAuth } from '../../middleware/auth';
import { addComment, updateSingleComment, getCommentsForPost, deleteComment, setScore } from '../../services/commentServices/commentService';
import { checkIfDiscussionExists, createDiscussion, getAllDiscussions, getMovie } from '../../services/dbServices/discussionDbservice';
import { createCommunityMovie, getAllCommunityMovies, deleteCommunityMovie, getUserUploadsForSingleUser, getSingleCommunityMoive, updateUserMovie } from "../../services/communityMovies/communityMoviesService";
// eslint-disable-next-line new-cap
const router = express.Router();

/**
 * @Route /api/movies/movieGeneration
 * @Desc retrieve user input and filter movies
 */
router.post('/movieGeneration', generationAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;
    returnMovies((req.body.MovieGenerationModel))
        .then((formattedMovies) => {
            if (!id) {
                const returnObj = (req.body.MovieGenerationModel !== formattedMovies.movieSearchCriteria) ? { ...formattedMovies, isRevised: true } : { ...formattedMovies, isRevised: false };
                res.send(returnObj);
                return;
            }
            writeToDatabase(formattedMovies, id)
                .then((dbFormattedMovies) => {
                    const returnObj = (req.body.MovieGenerationModel !== formattedMovies.movieSearchCriteria) ? { ...dbFormattedMovies, isRevised: true } : { ...dbFormattedMovies, isRevised: false };
                    res.send(JSON.stringify(returnObj));
                    logger.info(`Movie successfully wrote to DB`);
                }).catch((err) => {
                    logger.error(`Failed to write movies to DB: ${err.message}`);
                    const returnObj = (req.body.MovieGenerationModel !== formattedMovies.movieSearchCriteria) ? { formattedMovies, isRevised: true } : { formattedMovies, isRevised: false };
                    return res.send(returnObj);
                });
        }).catch((err) => {
            logger.error(`${err} error in api`);
            return res.status(404).send("Error getting movies");
        });
});

router.get(`/generations/single/:generationId`, (req, res) => {
    getSingleGeneration(req.params.generationId)
        .then((geneartion) => {
            res.send(geneartion);
        }).catch((err) => {
            logger.error(`Failed to get single generation: ${err.message}`);
            res.send(500).send(`Failed to get generation`);
        });
});

/**
 * @Route /api/movies/returnMovies
 * @Desc retrieves all generations for a user
 */
router.get('/returnMovies', getAuth, (req, res) => {
    const { id } = req.token;
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

router.get('/getPlaylists', getAuth, (req, res) => {
    const { id } = req.token;
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

router.get('/getMovie/:movieId', (req, res) => {
    getMovie(req.params.movieId)
        .then((movie) => {
            res.send(movie);
        }).catch((err) => {
            logger.error(`Failed to get movie from DB: ${err.message}`);
            res.status(404).send('Failed to get movie from database');
        });
});

router.post('/discussions/create', (req, res) => {
    checkIfDiscussionExists(req.body.movieId)
        .then((isThere) => {
            if (!isThere) {
                createDiscussion(req.body)
                    .then((movie) => {
                        res.send(movie);
                    });
            }
        }).catch((err) => {
            logger.error(`Failed to check if discussion exists or create one :${err.message}`);
            res.status(500).send(`Failed to check if discussion exists or create one `);
        })
})
/**
 * @Route /api/movies/comments/addComments
 * @Desc adds comment to database
 */
router.post('/comments/addComments', auth, (req, res) => {
    addComment(req.body)
        .then((commentAdded) => {
            res.send(commentAdded);
        })
        .catch((err) => {
            logger.error(`Failed to add comment: ${err.message}`);
            res.status(500).send('Sorry, but youre comment could not be added right now, please try again later');
        });
});

/**
 * @Route /api/movies/comments/getComments
 * @param postId: id of post to query in db
 * @Desc adds comment to database
 */
router.post('/comments/getComments', (req, res) => {
    getCommentsForPost(req.body)
        .then((comments) => {
            res.send(comments);
        }).catch((err) => {
            logger.error(`Failed to get comments: ${err.message}`);
            res.status(500).send('Failed to get comments for this post');
        });
});

/**
 * @Route /api/movies/comments/update
 * @param postId: id of post to query in db
 * @Desc adds comment to database
 */
router.post('/comments/update', auth, (req, res) => {
    const { commentText, commentId } = req.body;
    updateSingleComment(commentId, commentText)
        .then((comments) => {
            res.send(comments);
        }).catch((err) => {
            logger.error(`Failed to get comments: ${err.message}`);
            res.status(500).send('Failed to get comments for this post');
        });
});

/**
 * @Route /api/movies/comments/delete/commentId
 * @param commetnId String id of post to query in db
 * @Desc deletes comment to database
 */
router.get('/comments/delete/:commentId/:userId/:commentUserId', getAuth, (req, res) => {
    if (req.params.userId !== req.params.commentUserId) {
        return res.status(403).send('You do not have the authorization to delete this comment');
    }
    deleteComment(req.params.commentId)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            logger.error(`failed to delete comment: ${err.message}`);
            res.status(500).send('Failed to delete comment, try again later');
        })
});

/**
 * @Route /api/movies/comments/score/commentID/commentScore
 * @param commentId @type string: id of comment to query in db
 * @param commentScore @type Number: Score of the comment
 * @Desc adds comment to database
 */
router.post('/comments/set/score', auth, (req, res) => {
    const { commentId, commentScore, value, user, changeFromDownVote, changeFromUpvote } = (req.body.user) ? req.body : null;
    if (!user) {
        return res.status(401).send('Please log in to vote on comments');
    }

    setScore(commentId, commentScore, value, user.id, changeFromUpvote, changeFromDownVote)
        .then((comment) => {
            res.send(comment);
        })
        .catch((err) => {
            logger.error(`failed to increase comment score: ${err.message}`);
            res.status(500).send(`Failed to incrase score`);
        })
});

router.get('/discussions/getDiscussions', (req, res) => {
    getAllDiscussions()
        .then((discussions) => {
            res.send(discussions);
        })
        .catch((err) => {
            logger.error(`Failed to get all discussions: ${err.message}`);
            res.status(404).send('Failed to get discussions');
        })
});

router.post('/indie/create', auth, (req, res) => {
    const { movieObj, user, currentUser } = req.body;
    if (!user.id) {
        return res.status(401).send("Please log in to create a post");
    }
    createCommunityMovie(movieObj, currentUser)
        .then((userMovie) => {
            res.status(200).send(userMovie);
        }).catch((err) => {
            logger.error(`Failed to add user movie: ${err.message}`);
            res.status(500).send('Failed to add user movie');
        });
});

router.get('/indie/get', (req, res) => {
    getAllCommunityMovies()
        .then((movies) => {

            res.send(movies);
        }).catch((err) => {
            logger.error(`failed to get community movies: ${err.message}`);
            res.status(404).send('Failed to get user movies');
        });
});

router.get('/indie/delete/:movieId/:userId/:movieUserId', (req, res) => {
    if (req.params.userId !== req.params.movieUserId) {
        return res.status(403).send('You do not have authorization to delete this movie');
    }

    deleteCommunityMovie(req.params.movieId)
        .then((deleted) => {
            res.send(`Movie successfuly deleted: ${deleted}`);
        }).catch((err) => {
            logger.error(`Failed to delete user movie ${err.message}`);
            res.status(404).send('Failed to get delete user movie');
        });
});

router.get('/indie/get/:userId', (req, res) => {
    getUserUploadsForSingleUser(req.params.userId)
        .then((movies) => {
            res.send(movies);
        }).catch((err) => {
            logger.error(`Failed to get community movies for a single user: ${err.message}`);
            res.status(404).send('Failed to get user movies for a single user');

        });
});

router.post('/indie/delete', auth, (req, res) => {
    const { user, movieDetails } = req.body;
    if (!user || user.id !== movieDetails.userId) {
        return res.status(403).send("You do not have the authorisation to delete this movie");
    }
    deleteCommunityMovie(movieDetails.movieId)
        .then((movies) => {
            res.send(movies);
        }).catch((err) => {
            logger.error(`Failed to get community movies for a single user: ${err.message}`);
            res.status(404).send('Failed to get user movies for a single user');

        });
});

router.post('/indie/user/movie/update', auth, (req, res) => {
    const { user, movieDetails } = req.body;

    if (user && movieDetails.user.userId !== user.id || !user) {
        return res.status(403).send('You do not have the authorisation to prefrom this action');
    }
    updateUserMovie(movieDetails)
        .then((movies) => {
            res.send(movies);
        }).catch((err) => {
            logger.error(`Failed to get community movies for a single user: ${err.message}`);
            res.status(404).send('Failed to get user movies for a single user');

        });
});

router.get('/indie/user/single/movie/:movieId', getAuth, (req, res) => {
    const { id } = req.token;

    if (!id) return res.status(403).send('You do not have the authorisation to update this movie');
    getSingleCommunityMoive(req.params.movieId, id)
        .then((movie) => {
            if (!movie) return res.status(403).send('You do not have the authorisation to update this movie');
            res.send(movie);
        }).catch((err) => {
            logger.error(`Failed to get user movie :${err.message}`);
            res.status(404).send('Unable to get user movie');
        });
});



export default router;
