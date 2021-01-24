"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywordController = void 0;
const movieKeywordsObj = {
    '10183': 'independent Films',
    '4344': 'musical',
    '3149': 'gangster',
    '9799': 'romantic Comedy',
    '18257': 'educational'
};
async function keywordMatcher(keywords) {
    let returnkeywords = '';
    for (const keyword of keywords) {
        returnkeywords += movieKeywordsObj[keyword] ? (returnkeywords.length === 0) ? `${movieKeywordsObj[keyword]}` : `, ${movieKeywordsObj[keyword]}` : null;
    }
    return returnkeywords;
}
async function keywordController(movieGenres) {
    if (!movieGenres) {
        return '';
    }
    ;
    const genres = movieGenres.split(",");
    return await keywordMatcher(genres);
}
exports.keywordController = keywordController;
//# sourceMappingURL=keywordsHelper.js.map