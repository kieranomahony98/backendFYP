/* eslint-disable */
import { MovieDb } from 'moviedb-promise';
import { logger } from '../../helpers/logger';
import config from 'config';
import { listMatcher } from '../../helpers/genreMatcher';
import { movieObject, movieSearchCriteriaModel, singleGenerationObject, MovieResult } from '../../tsModels/movieGernerationModel';

const moviedb = new MovieDb(config.get('TMDB3'));

/**
 * @Desc function returns list of movies from api
 * @param {object} movieSearchCriteria object of the user input
 */
async function getMovies(movieSearchCriteria: movieSearchCriteriaModel): Promise<MovieResult[] | undefined> {
    return await moviedb.discoverMovie(movieSearchCriteria)
        .then((movies) => {
            return movies.results;
        }).catch((err) => {
            logger.error(`${err} in getting Movies`);
            throw new Error();
        });
}

/**
 * desc: function filters the movies
 * @param {Object} allMovies JSON from api with list of movies
 * @param {movieSearchCriteriaModel} movieSearchCriteria object of the user input
 */

export async function filterMovies(allMovies: any, movieSearchCriteria: movieSearchCriteriaModel): Promise<singleGenerationObject> {
    let filteredMoves: MovieResult[] = [];
    try {
        filteredMoves = allMovies.filter((movie: any, index: number) => {
            return index <= 8;
        });
    } catch (err) {
        logger.error(`Error in filtering movies ${err}`);
        throw err;
    }

    const movieReturnObj: singleGenerationObject = {
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
            newMovieObj.movieReleaseYear = (movie.release_date) ? movie.release_date.split('-')[0] : undefined;
            newMovieObj.movieGenres = await listMatcher(movie.genre_ids)
            newMovieObj.moviePopularity = movie.vote_average ? `${movie.vote_average * 10}%` : 'This movie has no votes';
            newMovieObj.movieImagePath = movie.poster_path;
            movieReturnObj.movies.push(newMovieObj);
            console.log(newMovieObj.movieGenres);
        }
        return movieReturnObj;
    } catch (err) {
        logger.error(` Failed to format movies ${err}`);
        throw new Error();
    }
}

/**
 * @desc place holder for movieGeneration object
 * @return {Object} returns a blank movie object
 */
export function returnMovieGenerationObject(): movieObject {
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
async function convertValues(movieSearchCriteria: movieSearchCriteriaModel) {
    if (movieSearchCriteria.with_genres) {
        movieSearchCriteria.with_genres = movieSearchCriteria.with_genres.toString();
    }
    return movieSearchCriteria;
}
/**
 * @Desc returns fotmatted movies to the api
 */
export async function returnMovies(movieSearchCriteria: movieSearchCriteriaModel): Promise<singleGenerationObject> {
    return (convertValues(movieSearchCriteria)
        .then((searchCriteria) => getMovies(searchCriteria)))
        .then((movies) => filterMovies(movies, movieSearchCriteria))
        .then((filteredMovies) => {
            return filteredMovies;
        }).catch((err) => {
            logger.error(`Failed to return movies ${err} `);
            throw new Error();
        });
}

