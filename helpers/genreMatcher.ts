export async function listMatcher(movieGenres: number[] | string[] | undefined): Promise<string> {
    if (!movieGenres) {
        return '';
    }
    const genres: string[] = movieGenres.toString().split(",");
    return genreMatcher(genres);
}

function genreMatcher(genres: string[]): string {
    let returnGenres = '';
    for (const genre of genres) {
        returnGenres += movieGenreOBJ[genre] ? (returnGenres.length === 0) ? `${movieGenreOBJ[genre]}` : `, ${movieGenreOBJ[genre]}` : null;
    }
    return returnGenres;
}

const movieGenreOBJ: movieobj = {
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
}

interface movieobj {
    [key: string]: string
}