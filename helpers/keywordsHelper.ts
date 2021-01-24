const movieKeywordsObj: keywordsObj = {
    '10183': 'independent Films',
    '4344': 'musical',
    '3149': 'gangster',
    '9799': 'romantic Comedy',
    '18257': 'educational'
};

interface keywordsObj {
    [key: string]: string
}

async function keywordMatcher(keywords: string[]) {
    let returnkeywords = '';
    for (const keyword of keywords) {
        returnkeywords += movieKeywordsObj[keyword] ? (returnkeywords.length === 0) ? `${movieKeywordsObj[keyword]}` : `, ${movieKeywordsObj[keyword]}` : null;
    }
    return returnkeywords;
}


export async function keywordController(movieGenres: String): Promise<string> {
    if (!movieGenres) {
        return '';
    };
    const genres: string[] = movieGenres.split(",");
    return await keywordMatcher(genres);

}


