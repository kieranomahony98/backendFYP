"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToTextGeneration = exports.convertToText = void 0;
const keywordsHelper_1 = require("./keywordsHelper");
const genreMatcher_1 = require("./genreMatcher");
const logger_1 = require("./logger");
async function convertToText(playlist) {
    try {
        const genreList = (playlist.movieSearchCriteria.with_genres) ? await Promise.all(playlist.movieSearchCriteria.with_genres.split(",").map((g) => genreMatcher_1.listMatcher(g.trim()))) : null;
        const keywords = (playlist.movieSearchCriteria.with_keywords) ? await keywordsHelper_1.keywordController(playlist.movieSearchCriteria.with_keywords) : null;
        if (genreList) {
            playlist.movieSearchCriteria.with_genres = genreList.toString();
        }
        if (keywords) {
            playlist.movieSearchCriteria.with_keywords = keywords.toString();
        }
        return playlist;
    }
    catch (err) {
        logger_1.logger.error(`Failed to convert genres: ${err.message}`);
        throw err;
    }
}
exports.convertToText = convertToText;
async function convertToTextGeneration(movieSearchCriteria) {
    try {
        const genreList = (movieSearchCriteria.with_genres) ? await Promise.all(movieSearchCriteria.with_genres.toString().split(",").map((g) => genreMatcher_1.listMatcher(g.trim()))) : null;
        const keywords = (movieSearchCriteria.with_keywords) ? await keywordsHelper_1.keywordController(movieSearchCriteria.with_keywords.toString()) : null;
        if (genreList) {
            movieSearchCriteria.with_genres = genreList.toString();
        }
        if (keywords) {
            movieSearchCriteria.with_keywords = keywords.toString();
        }
        return movieSearchCriteria;
    }
    catch (err) {
        logger_1.logger.error(`Failed to convert genres: ${err.message}`);
        throw err;
    }
}
exports.convertToTextGeneration = convertToTextGeneration;
//# sourceMappingURL=convertToText.js.map