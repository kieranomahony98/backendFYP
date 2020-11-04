import {MovieDb} from 'moviedb-promise';
import dotenv from 'dotenv';
import winston from 'winston';

const moviedb = new MovieDb(dotenv.config().parsed.TMDB3);


export const movies = async () => {
    return await moviedb.discoverMovie({
        with_genres: '28,53',
    }).then((movies) => {
        return movies;
    }).catch((err) =>{
        winston.error(err);
        throw new Error();
    });
};
