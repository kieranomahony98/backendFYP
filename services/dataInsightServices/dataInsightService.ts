import { logger } from "../../helpers/logger";
import { getAllMovies } from "../dbServices/movieDbService";
export async function calculateMostPopularGenres(startingDate: String, endDate: String, prop: string) {
    const genreObj: any = await getGenres()
        .then((genres) => genres)
        .catch((err) => {
            logger.error(`Failed to get genres: ${err.message}`);
            throw err;
        });
    const movieObjs = await getAllMovies()
        .then((movies) => movies)
        .catch((err) => {
            logger.error(`Failed to get all movies for formatting: ${err.message}`);
            throw err;
        });
    const movies = movieObjs.map((user) => {
        return user.userMovies.filter((generation) => generation.movieGenerationDate >= startingDate && generation.movieGenerationDate <= endDate);
    }).reduce((acc, value: any) => {
        return acc.concat(value);
    }, []);

    for (const movieGen of movies) {
        if (movieGen.movieSearchCriteria) {
            for (const [key, value] of Object.entries(movieGen.movieSearchCriteria)) {
                if (key === "with_genres") {
                    const genreList = value.split(",");
                    genreList.map((genre: any) => {
                        genreObj[genre] += 1;
                    })
                }
            }
        }
    }
    return genreObj;
}

export async function calculateDailyGenerations() {

}

export async function calculateMostPopularProductionStudios() {

}

export async function calculateMostPopularFilters() {

}

export async function calculateMostPopularKeywords() {

}
async function getGenres() {
    return {
        "37": 0,
        "28": 0,
        "12": 0,
        "16": 0,
        "35": 0,
        "80": 0,
        "99": 0,
        "18": 0,
        "10751": 0,
        "14": 0,
        "36": 0,
        "27": 0,
        "10402": 0,
        "9648": 0,
        "10749": 0,
        "878": 0,
        "10770": 0,
        "53": 0,
        "10752": 0
    };
}