import { logger } from "../../helpers/logger";
import communityUploadsModel from "../../MongoModels/communityUploadsModel";

export async function createMovie(movieObj: any) {

    const userUploads = await communityUploadsModel.findOne({ 'user.userId': movieObj.user.userId })
        .then((userUploads) => userUploads)
        .catch((err) => {
            logger.error(`Failed to check if user has movies in the database: ${err.message}`);
            throw err;
        });
    if (userUploads) {
        return await userUploads.updateOne({ 'user.userId': movieObj.user.userId }, { $push: { userMovies: movieObj.movie } })
            .then((movie) => movie)
            .catch((err) => {
                logger.error(`Failed to push user movie: ${err.message}`);
                throw err;
            });
    }
    return await new communityUploadsModel({
        user: {
            userId: movieObj.user.userId,
            userName: movieObj.user.userName
        },
        userMovies: [
            movieObj.movie
        ]
    }).save()
        .then(((userMovie) => userMovie))
        .catch((err) => {
            logger.error(`failed to create new user movie: ${err.message}`);
            throw err;
        });
}

export async function deleteMovie(_id: string) {
    return await communityUploadsModel.deleteOne({ _id })
        .then((deleted) => true)
        .catch((err) => {
            logger.error(`failed to delete movie: ${err.message}`);
            throw err;
        })

}