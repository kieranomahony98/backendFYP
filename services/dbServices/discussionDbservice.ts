import { logger } from '../../helpers/logger';
import MovieDiscussion from '../../MongoModels/discussionModel';
import movieModel from '../../MongoModels/movieModel';
import { discussion } from '../../tsModels/discussionInterface';
import { movieObject } from '../../tsModels/movieGernerationModel';
export async function checkIfDiscussionExists(movieId: Number): Promise<Boolean> {
    return await MovieDiscussion.findOne({ movieId })
        .then((discussion) => {
            if (discussion) {
                return true;
            }
            return false;
        }).catch((err) => {
            logger.error(`Failed to find movie discussion: ${err.message}`);
            throw err;
        });
}

export async function createDiscussion(movie: movieObject): Promise<Boolean> {
    return await new MovieDiscussion(movie).save()
        .then((discussion) => true)
        .catch((err) => {
            logger.error(`Failed to create new discussion: ${err.message}`);
            throw err;
        });
}

export async function getAllDiscussions() {
    return await MovieDiscussion.find({}).lean()
        .then((discussions) => discussions)
        .catch((err) => {
            logger.error(`Failed to get all discussions: ${err.message}`);
            throw err;
        })
}
export async function getMovie(movieId: string) {
    return await MovieDiscussion.find({ movieId })
        .then((movie) => {
            return movie;
        })
        .catch((err) => {
            logger.error(`failed to get movie from database: ${err.message}`);
            throw err;
        })

}