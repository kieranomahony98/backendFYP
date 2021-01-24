"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnMovies = exports.returnMovieGenerationObject = exports.filterMovies = exports.getMovies = exports.moviedb = void 0;
/* eslint-disable */
const moviedb_promise_1 = require("moviedb-promise");
const logger_1 = require("../../helpers/logger");
const config_1 = __importDefault(require("config"));
const genreMatcher_1 = require("../../helpers/genreMatcher");
const convertToText_1 = require("../../helpers/convertToText");
const revisedQuery_1 = require("../../helpers/revisedQuery");
exports.moviedb = new moviedb_promise_1.MovieDb(config_1.default.get('TMDB3'));
/**
 * @Desc function returns list of movies from api
 * @param {object} movieSearchCriteria object of the user input
 */
async function getMovies(movieSearchCriteria) {
    const movieResults = await exports.moviedb.discoverMovie(movieSearchCriteria)
        .then((movies) => {
        return movies.results;
    }).catch((err) => {
        logger_1.logger.error(`${err} in getting Movies`);
        throw new Error();
    });
    if (movieResults && movieResults.length === 0) {
        return await getMovies(await revisedQuery_1.revisedQuery(movieSearchCriteria));
    }
    return {
        movieResults,
        movieSearchCriteria,
    };
}
exports.getMovies = getMovies;
/**
 * desc: function filters the movies
 * @param {Object} movieResults JSON from api with list of movies
 * @param {movieSearchCriteriaModel} movieSearchCriteria object of the user input
 */
async function filterMovies({ movieResults, movieSearchCriteria }) {
    let filteredMoves = [];
    try {
        filteredMoves = movieResults.filter((movie, index) => {
            return index <= 8;
        });
    }
    catch (err) {
        logger_1.logger.error(`Error in filtering movies ${err}`);
        throw err;
    }
    try {
        const movies = await Promise.all(filteredMoves.map(async (movie) => {
            const genres = await genreMatcher_1.listMatcher(movie.genre_ids);
            return ({
                movieId: movie.id,
                movieTitle: movie.title,
                movieDescription: movie.overview,
                movieReleaseYear: (movie.release_date) ? movie.release_date.split('-')[0] : undefined,
                movieGenres: genres,
                moviePopularity: movie.vote_average ? `${movie.vote_average * 10}%` : 'This movie has no votes',
                movieImagePath: movie.poster_path
            });
        }));
        const newMovieCriteria = await convertToText_1.convertToTextGeneration(movieSearchCriteria);
        return {
            movieGenerationDate: new Date().toISOString(),
            movieSearchCriteria: newMovieCriteria,
            newMovieCriteria,
            movies
        };
    }
    catch (err) {
        logger_1.logger.error(`Failed to format movies ${err}`);
        throw new Error();
    }
}
exports.filterMovies = filterMovies;
/**
 * @desc place holder for movieGeneration object
 * @return {Object} returns a blank movie object
 */
function returnMovieGenerationObject() {
    return {
        movieId: 0,
        movieImagePath: '',
        movieTitle: '',
        movieDescription: '',
        movieReleaseYear: '',
        movieGenres: '',
        moviePopularity: '',
    };
}
exports.returnMovieGenerationObject = returnMovieGenerationObject;
/**
 * @Desc returns fotmatted movies to the api
 */
async function returnMovies(movieSearchCriteria) {
    return (getMovies(movieSearchCriteria))
        .then((movies) => filterMovies(movies))
        .then((filteredMovies) => filteredMovies)
        .catch((err) => {
        logger_1.logger.error(`Failed to return movies ${err} `);
        throw new Error();
    });
}
exports.returnMovies = returnMovies;
//# sourceMappingURL=discoverMoviesService.js.map