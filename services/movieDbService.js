import MovieSchema from '../models/movie';
import {logger} from '../helpers/logger';
/**
 * @Desc writes users to movies to database
 * @param {MovieObject }movieGeneration generated movies to write to databaes
 * @param {String} userId the id of the user in question
 */
export async function writeToDatabase(movieGeneration, userId) {
    const user = await MovieSchema.findOne({userId: userId})
        .then((user) => user)
        .catch((err) => {
            logger.error(err);
            throw new Error();
        });
    console.log(user);
    if (user) {
        MovieSchema.updateOne(
            {userId: userId},
            {$push: {userMovies: movieGeneration}})
            .then((written) => {
                logger.info(`${written} has been added to database`);
            });
    } else {
        const newuserMovies = new MovieSchema({
            userId: userId,
            userMovies: movieGeneration,
        });
        newuserMovies.save()
            .then((res) => {
                logger.info(`User Movies generated for: ${userId}`);
            }).catch((err) => {
                logger.error(`Failed to crete user Movies ${err}`);
                throw new Error();
            });
    }
}

/**
 * get movie curation for a user
 * @param {String} userId
 */
export async function getMoviesFromDatabase(userId) {
    return await MovieSchema.findOne({userId: userId})
        .then((movieGens) => {
            return movieGens.userMovies;
        });
}


