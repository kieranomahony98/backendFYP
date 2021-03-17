/* eslint-disable */
import { MovieDb } from 'moviedb-promise';
import { logger } from '../../helpers/logger';
import { listMatcher } from '../../helpers/genreMatcher';
import { movieSearchCriteriaModel, singleGenerationObject, MovieResult, discoverMovies } from '../../tsModels/movieGernerationModel';
import { revisedQuery, formatQuery } from '../../helpers/revisedQuery';
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
        const newQuery = await revisedQuery(movieSearchCriteria)
            .then((query) => query)
            .catch((err) => {
                logger.error(`Failed to revise query ${err.message}`);
                throw err;
            });
        return await getMovies(newQuery);
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
            movieSearchCriteria,
            movies
        } as singleGenerationObject;

    } catch (err) {
        logger.error(`Failed to format movies ${err}`);
        throw err;
    }
}


/**
 * @Desc returns fotmatted movies to the api
 */
export async function returnMovies(movieSearchCriteria: movieSearchCriteriaModel): Promise<singleGenerationObject> {
    return (
        formatQuery(movieSearchCriteria)
            .then((query) => getMovies(query))
            .then((movies) => filterMovies(movies))
            .then((filteredMovies) => filteredMovies)
            .catch((err) => {
                logger.error(`Failed to return movies ${err} `);
                throw err;
            }));
}

export async function test() {
    moviedb.movieInfo("2667")
        .then((movie) => movie);
}
