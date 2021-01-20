import MovieSchema from '../../MongoModels/movieModel';
import { logger } from '../../helpers/logger';
import { movieGenerationModel, singleGenerationObject, databasePlaylistReturn } from '../../tsModels/movieGernerationModel';
import { listMatcher } from '../../helpers/genreMatcher';
/**
 * @Desc writes users to movies to database
 * @param {MovieObject} movieGeneration generated movies to write to databaes
 * @param {String} userId the id of the user in question
 */
export async function writeToDatabase(movieGeneration: singleGenerationObject, userId: string): Promise<movieGenerationModel> {
    const user = await getUser(userId)
        .then(user => user)
        .catch((err) => {
            logger.error(`Error in getting user ${err}`);
        });

    if (user) {
        return MovieSchema.updateOne(
            { userId: userId },
            { $push: { userMovies: movieGeneration } })
            .then((written) => {
                return written;
            }).catch((err) => {
                logger.error(`Failed to update user movies: ${err.message}`);
                throw err;
            });

    } else {
        const newuserMovies = new MovieSchema({
            userId: userId,
            userMovies: movieGeneration,
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
    try {
        const user = await getUser(userId)
            .then((user) => user)
            .catch((err) => {
                logger.error(`Error in getting user ${err}`);
                throw err;
            });
        if (user) {
            for (const c of user.userMovies) {
                c.movieSearchCriteria.with_genres = (c.movieSearchCriteria.with_genres) ? await listMatcher(c.movieSearchCriteria.with_genres[0].split(',')) : 'All Genres';
            }
            return user.userMovies;
        } else {
            return null;
        }
    } catch (err) {
        logger.error(`failed to retrieve user movies for ${userId}`);
        throw err;
    }
}

export async function getPlaylistsFromDatabase(userId: string): Promise<databasePlaylistReturn | undefined> {
    return await getUser(userId)
        .then((user) => {
            if (user) {
                return {
                    weeklyPlaylists: user.weeklyPlaylists,
                    monthlyPlaylists: user.monthlyPlaylists
                }
            }
        }).catch(err => {
            logger.error(`Failed to get user from database: ${err.message}`);
            throw err;
        });
}

/**
 * Check if user
 * @param {String} ID
 */
async function getUser(ID: string) {
    return await MovieSchema.findOne({ userId: ID })
        .then((user) => {
            return user;
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
}


