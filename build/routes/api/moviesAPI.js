"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("../../helpers/logger");
const discoverMoviesService_1 = require("../../services/movieServices/discoverMoviesService");
const movieDbService_1 = require("../../services/movieServices/movieDbService");
const auth_1 = require("../../middleware/auth");
// eslint-disable-next-line new-cap
const router = express_1.default.Router();
/**
 * @Route /api/movies/movieGeneration
 * @Desc retrieve user input and filter movies
 */
router.post('/movieGeneration', auth_1.movieAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;
    discoverMoviesService_1.returnMovies((req.body.MovieGenerationModel))
        .then((formattedMovies) => {
        if (id) {
            movieDbService_1.writeToDatabase(formattedMovies, id)
                .then((movieWritten) => {
                logger_1.logger.info(`Movie successfully wrote to DB`);
            }).catch((err) => {
                logger_1.logger.error(`Failed to write movies to DB: ${err.message}`);
                throw err;
            });
        }
        ;
        const returnObj = (req.body.MovieGenerationModel !== formattedMovies.movieSearchCriteria) ? { formattedMovies, isRevised: true } : { formattedMovies, isRevised: false };
        res.send(JSON.stringify(returnObj));
    }).catch((err) => {
        logger_1.logger.error(`${err} error in api`);
        return res.status(404).send("Error getting movies");
    });
});
router.post('/returnMovies', auth_1.movieAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;
    if (!id) {
        return res.status(401).send("Please log in to access previous curations");
    }
    movieDbService_1.getMoviesFromDatabase(id)
        .then((userMovieGenerations) => {
        if (userMovieGenerations) {
            res.status(200).send(userMovieGenerations);
        }
        else {
            res.status(404).send('Unable to find user movies');
        }
    }).catch((err) => {
        logger_1.logger.error(err);
        res.status(404).send('Unable to find user movies');
    });
});
router.post('/getPlaylists', auth_1.movieAuth, (req, res) => {
    const id = (req.body.user) ? req.body.user.id : null;
    if (!id) {
        return res.status(401).send("Please log in to see your playlists");
    }
    movieDbService_1.getPlaylistsFromDatabase(id)
        .then((playlists) => {
        return res.send(JSON.stringify(playlists));
    })
        .catch((err) => {
        logger_1.logger.error(`Failed to get playlists ${err.message}`);
        res.status(404).send('Failed to get user movies from database');
    });
});
exports.default = router;
//# sourceMappingURL=moviesAPI.js.map