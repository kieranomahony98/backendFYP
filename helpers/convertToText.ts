import { singleGenerationObject, movieSearchCriteriaModel } from '../tsModels/movieGernerationModel';
import { keywordController } from './keywordsHelper';
import { listMatcher } from './genreMatcher';
import { logger } from './logger';

export async function convertToText(playlist: singleGenerationObject): Promise<singleGenerationObject> {
    try {
        const genreList = (playlist.movieSearchCriteria.with_genres) ? await Promise.all(playlist.movieSearchCriteria.with_genres.split(",").map((g: any) => listMatcher(g.trim()))) : null;
        const keywords = (playlist.movieSearchCriteria.with_keywords) ? await keywordController(playlist.movieSearchCriteria.with_keywords) : null;
        if (genreList) {
            playlist.movieSearchCriteria.with_genres = genreList.toString();
        }
        if (keywords) {
            playlist.movieSearchCriteria.with_keywords = keywords.toString();
        }

        return playlist;

    } catch (err) {
        logger.error(`Failed to convert genres: ${err.message}`);
        throw err;
    }

}
export async function convertToTextGeneration(movieSearchCriteria: movieSearchCriteriaModel): Promise<movieSearchCriteriaModel> {
    try {
        const genreList = (movieSearchCriteria.with_genres) ? await Promise.all(movieSearchCriteria.with_genres.toString().split(",").map((g: any) => listMatcher(g.trim()))) : null;
        const keywords = (movieSearchCriteria.with_keywords) ? await keywordController(movieSearchCriteria.with_keywords.toString()) : null;
        if (genreList) {
            movieSearchCriteria.with_genres = genreList.toString();
        }
        if (keywords) {
            movieSearchCriteria.with_keywords = keywords.toString();
        }
        return movieSearchCriteria;

    } catch (err) {
        logger.error(`Failed to convert genres: ${err.message}`);
        throw err;
    }

}
