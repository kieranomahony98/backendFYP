"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringMatcher = exports.listMatcher = void 0;
const movieGenreOBJ = {
    '37': 'Western',
    '28': 'Action',
    '12': 'Adventure',
    '16': 'Animation',
    '35': 'Comedy',
    '80': 'Crime',
    '99': 'Documentary',
    '18': 'Drama',
    '10751': 'Family',
    '14': 'Fantasy',
    '36': 'History',
    '27': 'Horror',
    '10402': 'Music',
    '9648': 'Mystery',
    '10749': 'Romance',
    '878': 'Sci-Fi',
    '10770': 'TV Movie',
    '53': 'Thriller',
    '10752': 'War'
};
function genreMatcher(genres) {
    let returnGenres = '';
    for (const genre of genres) {
        returnGenres += movieGenreOBJ[genre] ? (returnGenres.length === 0) ? `${movieGenreOBJ[genre]}` : `, ${movieGenreOBJ[genre]}` : null;
    }
    return returnGenres;
}
async function listMatcher(movieGenres) {
    if (!movieGenres) {
        return '';
    }
    const genres = movieGenres.toString().split(",");
    return genreMatcher(genres);
}
exports.listMatcher = listMatcher;
async function stringMatcher(movieGenres) {
    if (!movieGenres) {
        return 'All Genres';
    }
    ;
    const genres = movieGenres.split(",");
    return genreMatcher(genres);
}
exports.stringMatcher = stringMatcher;
//# sourceMappingURL=genreMatcher.js.map