import { logger } from "../../helpers/logger";
import communityUploadsModel from "../../MongoModels/communityUploadsModel";

export async function createCommunityMovie(movieDetails: any, user: any) {
    return await new communityUploadsModel({
        user: {
            userId: user.id,
            userName: user.userName
        },
        movieDetails
    }).save()
        .then(((userMovie) => userMovie))
        .catch((err) => {
            logger.error(`failed to create new user movie: ${err.message}`);
            throw err;
        });
}

export async function deleteCommunityMovie(_id: string) {
    return await communityUploadsModel.deleteOne({ _id })
        .then((deleted) => true)
        .catch((err) => {
            logger.error(`failed to delete movie: ${err.message}`);
            throw err;
        });
}

export async function getUserUploadsForSingleUser(id: string) {
    return await communityUploadsModel.find({ "user.userId": id })
        .then((user) => user)
        .catch((err) => {
            logger.error(`Failed to get movies for a user: ${err.message}`);
            throw err;
        });
}

export async function getAllCommunityMovies() {
    return await communityUploadsModel.find({})
        .then((movies) => movies)
        .catch((err) => {
            logger.error(`failed to get community movies: ${err.message}`);
            throw err;
        });
}
