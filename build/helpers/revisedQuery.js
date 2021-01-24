"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revisedQuery = void 0;
async function revisedQuery({ with_genres, with_keywords, sort_by, primary_release_year }) {
    if (primary_release_year) {
        return {
            with_genres,
            with_keywords,
            sort_by
        };
    }
    if (with_keywords) {
        const keywordsList = with_keywords.split(",");
        keywordsList.splice(-1, 1);
        return {
            with_genres,
            sort_by,
            with_keywords: keywordsList.toString()
        };
    }
    if (sort_by) {
        return {
            with_genres
        };
    }
    if (with_genres) {
        const genreList = with_genres.split(",");
        genreList.splice(-1, 1);
        return {
            with_genres: genreList.toString()
        };
    }
    return {};
}
exports.revisedQuery = revisedQuery;
//# sourceMappingURL=revisedQuery.js.map