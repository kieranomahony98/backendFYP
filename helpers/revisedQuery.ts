import { movieSearchCriteriaModel } from '../tsModels/movieGernerationModel';
import { logger } from './logger';
export async function revisedQuery({ with_genres, with_keywords, sort_by, primary_release_year }: movieSearchCriteriaModel) {
    try {
        if (primary_release_year) {
            return {
                with_genres,
                with_keywords,
                sort_by
            }
        }
        if (with_keywords) {
            const keywordsList = with_keywords.split(",");
            keywordsList.splice(-1, 1);
            return {
                with_genres,
                sort_by,
                with_keywords: keywordsList.toString()
            }
        }
        if (sort_by) {
            return {
                with_genres
            }
        }
        if (with_genres) {
            const genreList = with_genres.split(",");
            genreList.splice(-1, 1);

            return {
                with_genres: genreList.toString()
            }
        }
        return {};
    } catch (err) {
        logger.error(`Failed to revise query: ${err.message}`);
        throw err;
    }
}

export async function formatQuery(movieSearchCriteria: movieSearchCriteriaModel) {
    if (movieSearchCriteria.primary_release_year) {
        const yearRange = movieSearchCriteria.primary_release_year.toString().split("-");
        movieSearchCriteria['release_date.gte'] = `${yearRange[0]}-01-01`;
        movieSearchCriteria['release_date.lte'] = `${yearRange[1]}-01-01`;
        delete movieSearchCriteria.primary_release_year;
    }
    return movieSearchCriteria;
}

