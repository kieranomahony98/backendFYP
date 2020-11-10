import {MovieDb} from 'moviedb-promise';
import dotenv from 'dotenv';
import {logger} from '../helpers/logger';

const moviedb = new MovieDb(dotenv.config().parsed.TMDB3);

/**
 * @Desc function returns list of movies from api
 * @param {object} movieSearchCriteria object of the user input
 */
async function getMovies(movieSearchCriteria) {
    return await moviedb.discoverMovie(movieSearchCriteria).then((movies) => {
        return movies.results;
    }).catch((err) => {
        logger.error(`${err} in getting Movies`);
        throw new Error();
    });
}

/**
 * desc: function filters the movies
 * @param {Object} allMovies JSON from api with list of movies
 * @param {object} movieSearchCriteria object of the user input
 */
async function filterMovies(allMovies, movieSearchCriteria) {
    let filteredMoves = [];
    try {
        filteredMoves = allMovies.filter((movie, index) => {
            return index <= 10;
        });
    } catch (err) {
        logger.error(`Error in filtering movies ${err}`);
    }

    const movieReturnObj = {
        movieGenerationDate: new Date().toISOString(),
        movieSearchCriteria: movieSearchCriteria,
        movies: [],
    };

    try {
        for (const movie of filteredMoves) {
            const newMovieObj = returnMovieGenerationObject();
            newMovieObj.movieId = movie.id;
            newMovieObj.movieTitle = movie.title;
            newMovieObj.movieDescription = movie.overview;
            newMovieObj.movieReleaseYear = movie.release_date.split('-')[0];
            // TODO will have to make a dictionary with genres so they can be properly returned
            newMovieObj.movieGenres = movie.genre_ids;
            newMovieObj.moviePopularity = movie.popularity;
            movieReturnObj.movies.push(newMovieObj);
        }
        return movieReturnObj;
    } catch (err) {
        logger.error(` Failed to format movies ${err}`);
    }
}

/**
 * @desc place holder for movieGeneration object
 * @return {Object} returns a blank movie object
 */
function returnMovieGenerationObject() {
    return {
        movieId: null,
        movieTitle: null,
        movieDescription: null,
        movieReleaseYear: null,
        movieGenres: null,
        moviePopularity: null,
    };
}
/**
 * @Desc returns fotmatted movies to the api
 */
export async function returnMovies() {
    const movieSearchCriteria = {
        sort_by: 'popularity.desc',
        with_genres: '28,53',
        primary_release_year: 2015,
    };

    return getMovies(movieSearchCriteria)
        .then((movies) => filterMovies(movies, movieSearchCriteria))
        .then((filteredMovies) => {
            return filteredMovies;
        }).catch((err) => {
            logger.error(`Failed to return movies ${err}`);
        });
}

