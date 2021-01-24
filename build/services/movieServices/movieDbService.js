"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistsFromDatabase = exports.getMoviesFromDatabase = exports.writeToDatabase = void 0;
const movieModel_1 = __importDefault(require("../../MongoModels/movieModel"));
const logger_1 = require("../../helpers/logger");
const genreMatcher_1 = require("../../helpers/genreMatcher");
const convertToText_1 = require("../../helpers/convertToText");
/**
 * Check if user
 * @param {String} ID
 */
async function getUser(userId) {
    return await movieModel_1.default.findOne({ userId })
        .then((user) => {
        return user;
    }).catch((err) => {
        logger_1.logger.error(err);
        throw err;
    });
}
/**
 * @Desc writes users to movies to database
 * @param {MovieObject} movieGeneration generated movies to write to databaes
 * @param {String} userId the id of the user in question
 */
async function writeToDatabase(userMovies, userId) {
    const user = await getUser(userId)
        .then((user) => user)
        .catch((err) => {
        logger_1.logger.error(`Error in getting user ${err}`);
        throw err;
    });
    if (user) {
        return movieModel_1.default.updateOne({ userId }, { $push: { userMovies } })
            .then((written) => {
            return written;
        }).catch((err) => {
            logger_1.logger.error(`Failed to update user movies: ${err.message}`);
            throw err;
        });
    }
    else {
        const newuserMovies = new movieModel_1.default({
            userId,
            userMovies
        });
        return newuserMovies.save()
            .then((res) => {
            return res;
        }).catch((err) => {
            logger_1.logger.error(`Failed to crete user Movies ${err.message}`);
            throw err;
        });
    }
}
exports.writeToDatabase = writeToDatabase;
/**
 * get movie curation for a user
 * @param {String} userId
 */
async function getMoviesFromDatabase(userId) {
    const user = await getUser(userId)
        .then((user) => user)
        .catch((err) => {
        logger_1.logger.error(`Error in getting user ${err}`);
        throw err;
    });
    try {
        if (user) {
            for (const c of user.userMovies) {
                c.movieSearchCriteria.with_genres = (c.movieSearchCriteria.with_genres) ? await genreMatcher_1.stringMatcher(c.movieSearchCriteria.with_genres[0]) : 'All Genres';
            }
            return user.userMovies;
        }
    }
    catch (err) {
        logger_1.logger.error(`failed to retrieve user movies for ${err.message}`);
        throw err;
    }
    return null;
}
exports.getMoviesFromDatabase = getMoviesFromDatabase;
async function getPlaylistsFromDatabase(userId) {
    return getUser(userId)
        .then((user) => {
        if (user) {
            const genres = [convertToText_1.convertToText(user.userPlaylists.weeklyPlaylists), convertToText_1.convertToText(user.userPlaylists.monthlyPlaylists), convertToText_1.convertToText(user.userPlaylists.allTimePlaylists)];
            return Promise.all(genres)
                .then((playlists) => {
                return {
                    weeklyPlaylists: playlists[0],
                    monthlyPlaylists: playlists[1],
                    allTimePlaylists: playlists[2]
                };
            });
        }
    }).catch((err) => {
        logger_1.logger.error(`Failed to get playlists from database: ${err.message}`);
        throw err;
    });
}
exports.getPlaylistsFromDatabase = getPlaylistsFromDatabase;
//# sourceMappingURL=movieDbService.js.map