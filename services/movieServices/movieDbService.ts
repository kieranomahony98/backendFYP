import MovieSchema from '../../MongoModels/movieModel';
import { logger } from '../../helpers/logger';
import { movieGenerationModel, singleGenerationObject, databasePlaylistReturn } from '../../tsModels/movieGernerationModel';
import { listMatcher, stringMatcher } from '../../helpers/genreMatcher';
import { moviedb } from './discoverMoviesService';
import { keywordController } from '../../helpers/keywordsHelper';
import { convertToText } from '../../helpers/convertToText';
/**
 * Check if user
 * @param {String} ID
 */
async function getUser(userId: string) {
    return await MovieSchema.findOne({ userId })
        .then((user) => {
            return user;
        }).catch((err) => {
            logger.error(err);
            throw err;
        });
}

/**
 * @Desc writes users to movies to database
 * @param {MovieObject} movieGeneration generated movies to write to databaes
 * @param {String} userId the id of the user in question
 */
export async function writeToDatabase(userMovies: singleGenerationObject, userId: string): Promise<movieGenerationModel> {
    const user = await getUser(userId)
        .then((user) => user)
        .catch((err) => {
            logger.error(`Error in getting user ${err}`);
            throw err;
        });

    if (user) {
        return MovieSchema.updateOne(
            { userId },
            { $push: { userMovies } })
            .then((written) => {
                return written;
            }).catch((err) => {
                logger.error(`Failed to update user movies: ${err.message}`);
                throw err;
            });

    } else {
        const newuserMovies = new MovieSchema({
            userId,
            userMovies
        });
        return newuserMovies.save()
            .then((res) => {
                return res;
            }).catch((err) => {
                logger.error(`Failed to crete user Movies ${err.message}`);
                throw err;
            });
    }
}

/**
 * get movie curation for a user
 * @param {String} userId
 */
export async function getMoviesFromDatabase(userId: string): Promise<singleGenerationObject[] | null> {
    const user = await getUser(userId)
        .then((user) => user)
        .catch((err) => {
            logger.error(`Error in getting user ${err}`);
            throw err;
        });
    try {
        if (user) {
            for (const c of user.userMovies) {
                c.movieSearchCriteria.with_genres = (c.movieSearchCriteria.with_genres) ? await stringMatcher(c.movieSearchCriteria.with_genres[0]) : 'All Genres';
            }
            return user.userMovies;
        }
    } catch (err) {
        logger.error(`failed to retrieve user movies for ${err.message}`);
        throw err;
    }
    return null;
}

export async function getPlaylistsFromDatabase(userId: string): Promise<databasePlaylistReturn | undefined> {
    return getUser(userId)
        .then((user) => {
            if (user) {
                const genres = [convertToText(user.userPlaylists.weeklyPlaylists), convertToText(user.userPlaylists.monthlyPlaylists), convertToText(user.userPlaylists.allTimePlaylists)];
                return Promise.all(genres)
                    .then((playlists) => {
                        return {
                            weeklyPlaylists: playlists[0],
                            monthlyPlaylists: playlists[1],
                            allTimePlaylists: playlists[2]
                        } as databasePlaylistReturn;
                    });
            }
        }).catch((err) => {
            logger.error(`Failed to get playlists from database: ${err.message}`);
            throw err;
        });
}



