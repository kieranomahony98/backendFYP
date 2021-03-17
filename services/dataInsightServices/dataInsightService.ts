import { logger } from '../../helpers/logger';
import { getAllMovies } from '../dbServices/movieDbService';
export async function calculateData(startDate: string, endDate: string, propObj: any = null, propList: any, type: string) {
    try {

        const movies = propList.map((user: any) => {
            return user.userMovies.filter((generation: any) => generation.movieSearchCriteria && generation.movieGenerationDate > startDate && generation.movieGenerationDate < endDate);
        }).reduce((acc: any, value: any) => {
            return acc.concat(value);
        }, []);

        movies.map((movieGen: any) => {
            if (type === 'with_genres' || type === 'with_keywords') {

                const propGenList: string[] = movieGen.movieSearchCriteria && movieGen.movieSearchCriteria[type] ? movieGen.movieSearchCriteria[type].split(",") : "";
                if (!propGenList) return;
                propGenList.map((prop: any) => {

                    if (prop !== '') propObj[prop] += 1;
                });
                return;
            }
            if (movieGen?.movieSearchCriteria?.release_date?.gte && type === 'release_date.gte') {
                const prop = movieGen.movieSearchCriteria.release_date.gte.split("-")[0];
                propObj[prop] += 1;
            }

        });
        const data: any = [];
        const labels: any = [];
        Object.entries(propObj).map(([key, value]: any) => {
            data.push(value);
            labels.push(key);
        });

        return {
            labels: {
                labels
            },
            datasets: [{
                label: 'Number of Selections',
                data,
                backgroundColor: ['#c532d4', '#e3e5c2', '#96d535', '#80f7bc', '#049e5b', '#011ebc', '#50ee0c', '#63496d', '#9d5eea', '#f56c2c', '#4a351b', '#bc62d6', '#3d7d12', '#01489b', '#e83e45', '#b54bbb', '#984303', '#3106fc', '#34146a', '#e3cea1']
            }]
        }
    } catch (err) {
        logger.error(`Failed to get genre data :${err.message}`);
        throw err;
    }

}

export async function calculateDailyGenerations(startDate: any, endDate: any, moviesObj: any) {
    try {

        const movies = moviesObj.map((user: any) => {
            return user.userMovies.filter((generation: any) => generation.movieGenerationDate > startDate && generation.movieGenerationDate < endDate);
        }).reduce((acc: any, value: any) => {
            return acc.concat(value);
        }, []);
        const dates = [];
        const count = [];

        do {

            let futureDate: any = new Date(startDate).getTime() + 86400000;
            futureDate = new Date(futureDate).toISOString();
            const l = movies.filter((generation: any) => {
                return generation.movieGenerationDate >= startDate && generation.movieGenerationDate <= futureDate
            });
            dates.push(futureDate);
            count.push(l.length);
            startDate = futureDate;
        } while (startDate < endDate);
        return {
            labels: {
                labels: dates
            },
            datasets: [{
                label: 'Number of Selections',
                data: count,
                backgroundColor: ['#c532d4', '#e3e5c2', '#96d535', '#80f7bc', '#049e5b', '#011ebc', '#50ee0c', '#63496d', '#9d5eea', '#f56c2c', '#4a351b', '#bc62d6', '#3d7d12', '#01489b', '#e83e45', '#b54bbb', '#984303', '#3106fc', '#34146a', '#e3cea1']
            }]
        }
    } catch (err) {
        logger.error(`Failed to get data for daily generations: ${err.data}`);
        throw err;
    }

}

export async function releaseYearController(startDate: string, endDate: string, moviesObj: any) {
    const releaseYearObj = await getReleaseYears()
        .then((obj) => obj)
        .catch((err) => {
            logger.error(`Failed to get release year object: ${err.message}`);
            throw err;
        });
    return await calculateData(startDate, endDate, releaseYearObj, moviesObj, 'release_date.gte')
        .then((data) => data)
        .catch((err) => {
            logger.error(`Failed to get release date data: ${err.message}`);
            throw err;
        });
}

export async function genreController(startDate: string, endDate: string, movieObjs: any) {
    const genreObj: any = await getGenres()
        .then((genres) => genres)
        .catch((err) => {
            logger.error(`Failed to get genres: ${err.message}`);
            throw err;
        });

    return await calculateData(startDate, endDate, genreObj, movieObjs, 'with_genres')
        .then((data) => data)
        .catch((err) => {
            logger.error(`Failed to get genre data: ${err.message}`);
            throw err;
        });
}

export async function filterController(startDate: string, endDate: string, movieObjs: any) {
    const sortByObj: any = await sortBy()
        .then((s) => s)
        .catch((err) => {
            logger.error(`Failed to get sort by obj:${err.message}`);
            throw err;
        });
    return calculateData(startDate, endDate, sortByObj, movieObjs, 'sort_by')
        .then((data) => data)
        .catch((err) => {
            logger.error(`Failed to calculate data for filters: ${err.message}`);
            throw err;
        });
}

export async function keywordController(startDate: string, endDate: string, movieObjs: any) {
    const keyWordObj: any = await keywords()
        .then(k => k)
        .catch((err) => {
            logger.error(`Failed to get keywords: ${err.message}`);
            throw err;
        });

    return await calculateData(startDate, endDate, keyWordObj, movieObjs, 'with_keywords')
        .then((data) => data)
        .catch((err) => {
            logger.error(`Failed to get keywords data: ${err.message}`);
            throw err;
        });
}
async function getReleaseYears() {
    return {
        "2020": 0,
        "2014": 0,
        "2010": 0,
        "2005": 0,
        "2000": 0,
        "1995": 0,
        "1990": 0

    }
}
async function getGenres() {
    return {
        '37': 0,
        '28': 0,
        '12': 0,
        '16': 0,
        '35': 0,
        '80': 0,
        '99': 0,
        '18': 0,
        '10751': 0,
        '14': 0,
        '36': 0,
        '27': 0,
        '10402': 0,
        '9648': 0,
        '10749': 0,
        '878': 0,
        '10770': 0,
        '53': 0,
        '10752': 0
    };
}
async function sortBy() {
    return {
        'popularity.desc': 0,
        'revenue.desc': 0,
        'vote_average.desc': 0,
        'vote_count.desc': 0,
    }
}
async function keywords() {
    return {
        '10183': 0,
        '4344': 0,
        '3149': 0,
        '9799': 0,
        '18257': 0
    }
}

export async function chartController(startDate: string, endDate: string, chartType: string) {
    const movieObjs = await getAllMovies()
        .then((movies) => movies)
        .catch((err) => {
            logger.error(`Failed to get all movies for formatting: ${err.message}`);
            throw err;
        });
    switch (chartType) {
        case 'Genres':
            return await genreController(startDate, endDate, movieObjs)
                .then((data) => data)
                .catch((err) => {
                    logger.error(`Failed to get most popular genres: ${err.message}`);
                    throw err;
                });
        case 'Filters':
            return await filterController(startDate, endDate, movieObjs)
                .then((data) => data)
                .catch((err) => {
                    logger.error(`Failed to get most popular filters: ${err.message}`);
                    throw err;
                });
        case "Keywords":
            return await keywordController(startDate, endDate, movieObjs)
                .then((data) => data)
                .catch((err) => {
                    logger.error(`Failed to get data for keywords: ${err.message}`);
                    throw err;
                });
        case "DailyGenerations":
            return await calculateDailyGenerations(startDate, endDate, movieObjs)
                .then((data) => data)
                .catch((err) => {
                    logger.error(`Failed to get daily generations data: ${err.message}`);
                    throw err;
                });

        case "ReleaseYears":
            return await releaseYearController(startDate, endDate, movieObjs)
                .then((data) => data)
                .catch((err) => {
                    logger.error(`Failed to get data on release years: ${err.message}`);
                    throw err;
                });
        case '':

        default:
            break;
    }

}