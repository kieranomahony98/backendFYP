/* eslint-disable */
import { MovieDb } from 'moviedb-promise';
import { logger } from '../../helpers/logger';
import config from 'config';
import { listMatcher } from '../../helpers/genreMatcher';
import { movieObject, movieSearchCriteriaModel, singleGenerationObject, MovieResult, discoverMovies } from '../../tsModels/movieGernerationModel';
import { revisedQuery } from '../../helpers/revisedQuery';
import dotenv from 'dotenv'
dotenv.config();
const movieDbURI = (process.env.TMDB3) ? process.env.TMDB3 : '';
export const moviedb = new MovieDb(movieDbURI);

/**
 * @Desc function returns list of movies from api
 * @param {object} movieSearchCriteria object of the user input
 */
export async function getMovies(movieSearchCriteria: movieSearchCriteriaModel): Promise<discoverMovies> {
    const movieResults = await moviedb.discoverMovie(movieSearchCriteria)
        .then((movies) => {
            return movies.results;
        }).catch((err) => {
            logger.error(`${err} in getting Movies`);
            throw err;
        });
    if (movieResults && movieResults.length === 0) {
        return await getMovies(await revisedQuery(movieSearchCriteria));
    }
    return {
        movieResults,
        movieSearchCriteria,
    } as discoverMovies;

}

/**
 * desc: function filters the movies
 * @param {Object} movieResults JSON from api with list of movies
 * @param {movieSearchCriteriaModel} movieSearchCriteria object of the user input
 */

export async function filterMovies({ movieResults, movieSearchCriteria }: discoverMovies): Promise<singleGenerationObject> {
    let filteredMoves: MovieResult[] = [];
    try {
        filteredMoves = movieResults.filter((movie: any, index: number) => {
            return index <= 8;
        });
    } catch (err) {
        logger.error(`Error in filtering movies ${err}`);
        throw err;
    }

    try {
        const movies = await Promise.all(filteredMoves.map(async (movie) => {
            const genres: string = await listMatcher(movie.genre_ids)
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
        return {
            movieGenerationDate: new Date().toISOString(),
            movieSearchCriteria,
            movies
        } as singleGenerationObject;

    } catch (err) {
        logger.error(`Failed to format movies ${err}`);
        throw err;
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
    } as movieObject;
}

/**
 * @Desc returns fotmatted movies to the api
 */
export async function returnMovies(movieSearchCriteria: movieSearchCriteriaModel): Promise<singleGenerationObject> {
    return (
        getMovies(movieSearchCriteria))
        .then((movies) => filterMovies(movies))
        .then((filteredMovies) => filteredMovies)
        .catch((err) => {
            logger.error(`Failed to return movies ${err} `);
            throw err;
        });
}

