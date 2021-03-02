import MovieSchema from '../../MongoModels/movieModel';
import { logger } from '../../helpers/logger';
import { movieGenerationModel, singleGenerationObject, databasePlaylistReturn } from '../../tsModels/movieGernerationModel';
import TrendingSchema from '../../MongoModels/trending';
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
            return user.userMovies;
        }
    } catch (err) {
        logger.error(`failed to retrieve user movies for ${err.message}`);
        throw err;
    }
    return null;
}

export async function getPlaylistsFromDatabase(userId: string) {
    const trendingNow = getTrendingNowPage();
    const userPlaylists = await getUser(userId)
        .then((user) => {
            if (user) {
                return user.userPlaylists;
            }
            return undefined;
        }).catch((err) => {
            logger.error(`Failed to get playlists from database: ${err.message}`);
            throw err;
        });

    return {
        ...userPlaylists,
        trendingNow: await Promise.resolve(trendingNow)
    }
}

async function getTrendingNowPage() {
    return await TrendingSchema.find({}).lean()
        .then((res) => res[0])
        .catch((err) => {
            logger.error(`failed to get trending now page: ${err.message}`);
            throw err;
        })
}

export async function getAllMovies() {
    return await MovieSchema.find({}).lean()
        .then((movies) => movies)
        .catch((err) => {
            logger.error(`Failed to get all movies :${err.message}`);
            throw err;
        });
}


