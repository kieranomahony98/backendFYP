import { logger } from '../helpers/logger';
import { MovieDb } from 'moviedb-promise';
import * as movieService from '../services/movieServices/discoverMoviesService';
import * as helperQuery from '../helpers/revisedQuery';
import * as matcher from '../helpers/genreMatcher';
import dotenv from 'dotenv'
dotenv.config();

import config from 'config';
jest.mock('moviedb-promise');




const emptyMovieObject = {
    movieId: 0,
    movieTitle: '',
    movieDescription: '',
    movieReleaseYear: '',
    movieGenres: '',
    moviePopularity: '',
    movieImagePath: '',

};
const mockSurveyRequest = {
    'with_genres': '1,2,3'
};
const mockgetMoviesReturn = [
    {
        video: false,
        id: 682377,
        popularity: 1400.086,
        vote_count: 12,
        release_date: '2020-11-13',
        adult: false,
        backdrop_path: '/fTDzKoQIh1HeyjfpG5AHMi2jxAJ.jpg',
        title: 'Chick Fight',
        genre_ids: [28, 35],
        vote_average: 7.1,
        original_language: 'en',
        original_title: 'Chick Fight',
        poster_path: '/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg',
        overview: 'When Anna Wyncomb is introduced to an an underground, all-female fight club in order to turn the mess of her life around, she discovers she is much more personally connected to the history of the club than she could ever imagine.'
    },
    {
        video: false,
        vote_average: 4.9,
        popularity: 1051.376,
        vote_count: 178,
        release_date: '2020-10-23',
        adult: false,
        backdrop_path: '/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg',
        overview: 'The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.',
        genre_ids: [28, 53],
        id: 724989,
        original_language: 'en',
        original_title: 'Hard Kill',
        poster_path: '/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg',
        title: 'Hard Kill'
    },
    {
        video: false,
        id: 531219,
        popularity: 837.997,
        vote_count: 795,
        release_date: '2020-10-26',
        adult: false,
        backdrop_path: '/8rIoyM6zYXJNjzGseT3MRusMPWl.jpg',
        vote_average: 6.9,
        genre_ids: [14, 10751, 12, 35, 27],
        overview: "In late 1967, a young orphaned boy goes to live with his loving grandma in the rural Alabama town of Demopolis. As the boy and his grandmother encounter some deceptively glamorous but thoroughly diabolical witches, she wisely whisks him away to a seaside resort. Regrettably, they arrive at precisely the same time that the world's Grand High Witch has gathered.",
        original_language: 'en',
        original_title: "Roald Dahl's The Witches",
        poster_path: '/betExZlgK0l7CZ9CsCBVcwO1OjL.jpg',
        title: "Roald Dahl's The Witches"
    },
    {
        video: false,
        vote_average: 8,
        popularity: 824.295,
        overview: 'When his best friend Gary is suddenly snatched away, SpongeBob takes Patrick on a madcap mission far beyond Bikini Bottom to save their pink-shelled pal.',
        release_date: '2020-08-14',
        adult: false,
        backdrop_path: '/wu1uilmhM4TdluKi2ytfz8gidHf.jpg',
        original_language: 'en',
        genre_ids: [16, 14, 12, 35, 10751],
        vote_count: 1546,
        title: 'The SpongeBob Movie: Sponge on the Run',
        original_title: 'The SpongeBob Movie: Sponge on the Run',
        poster_path: '/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg',
        id: 400160
    },
    {
        video: false,
        id: 524047,
        popularity: 810.626,
        overview: "John Garrity, his estranged wife and their young son embark on a perilous journey to find sanctuary as a planet-killing comet hurtles toward Earth. Amid terrifying accounts of cities getting levelled, the Garrity's experience the best and worst in humanity. As the countdown to the global apocalypse approaches zero, their incredible trek culminates in a desperate and last-minute flight to a possible safe haven.",
        release_date: '2020-07-29',
        adult: false,
        backdrop_path: '/2Fk3AB8E9dYIBc2ywJkxk8BTyhc.jpg',
        title: 'Greenland',
        genre_ids: [28, 53],
        vote_average: 7.2,
        original_language: 'en',
        original_title: 'Greenland',
        poster_path: '/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg',
        vote_count: 672
    },
    {
        video: false,
        id: 671039,
        popularity: 719.436,
        vote_count: 237,
        release_date: '2020-10-30',
        adult: false,
        backdrop_path: '/gnf4Cb2rms69QbCnGFJyqwBWsxv.jpg',
        vote_average: 5.8,
        genre_ids: [53, 28, 18, 80],
        overview: 'Caught in the crosshairs of police corruption and Marseille’s warring gangs, a loyal cop must protect his squad by taking matters into his own hands.',
        original_language: 'fr',
        original_title: 'Bronx',
        poster_path: '/9HT9982bzgN5on1sLRmc1GMn6ZC.jpg',
        title: 'Rogue City'
    },
    {
        video: false,
        vote_average: 7.2,
        popularity: 647.283,
        overview: 'When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.',
        release_date: '2020-09-04',
        adult: false,
        backdrop_path: '/qAKvUu2FSaDlnqznY4VOp5PmjIF.jpg',
        vote_count: 3009,
        genre_ids: [28, 12, 18, 14],
        original_language: 'en',
        title: 'Mulan',
        original_title: 'Mulan',
        poster_path: '/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
        id: 337401
    },
]

const mockReturnedMovies = {
    page: 1,
    results: [
        {
            video: false,
            id: 682377,
            popularity: 1400.086,
            vote_count: 12,
            release_date: '2020-11-13',
            adult: false,
            backdrop_path: '/fTDzKoQIh1HeyjfpG5AHMi2jxAJ.jpg',
            title: 'Chick Fight',
            genre_ids: [28, 35],
            vote_average: 7.1,
            original_language: 'en',
            original_title: 'Chick Fight',
            poster_path: '/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg',
            overview: 'When Anna Wyncomb is introduced to an an underground, all-female fight club in order to turn the mess of her life around, she discovers she is much more personally connected to the history of the club than she could ever imagine.'
        },
        {
            video: false,
            vote_average: 4.9,
            popularity: 1051.376,
            vote_count: 178,
            release_date: '2020-10-23',
            adult: false,
            backdrop_path: '/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg',
            overview: 'The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.',
            genre_ids: [28, 53],
            id: 724989,
            original_language: 'en',
            original_title: 'Hard Kill',
            poster_path: '/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg',
            title: 'Hard Kill'
        },
        {
            video: false,
            id: 531219,
            popularity: 837.997,
            vote_count: 795,
            release_date: '2020-10-26',
            adult: false,
            backdrop_path: '/8rIoyM6zYXJNjzGseT3MRusMPWl.jpg',
            vote_average: 6.9,
            genre_ids: [14, 10751, 12, 35, 27],
            overview: "In late 1967, a young orphaned boy goes to live with his loving grandma in the rural Alabama town of Demopolis. As the boy and his grandmother encounter some deceptively glamorous but thoroughly diabolical witches, she wisely whisks him away to a seaside resort. Regrettably, they arrive at precisely the same time that the world's Grand High Witch has gathered.",
            original_language: 'en',
            original_title: "Roald Dahl's The Witches",
            poster_path: '/betExZlgK0l7CZ9CsCBVcwO1OjL.jpg',
            title: "Roald Dahl's The Witches"
        },
        {
            video: false,
            vote_average: 8,
            popularity: 824.295,
            overview: 'When his best friend Gary is suddenly snatched away, SpongeBob takes Patrick on a madcap mission far beyond Bikini Bottom to save their pink-shelled pal.',
            release_date: '2020-08-14',
            adult: false,
            backdrop_path: '/wu1uilmhM4TdluKi2ytfz8gidHf.jpg',
            original_language: 'en',
            genre_ids: [16, 14, 12, 35, 10751],
            vote_count: 1546,
            title: 'The SpongeBob Movie: Sponge on the Run',
            original_title: 'The SpongeBob Movie: Sponge on the Run',
            poster_path: '/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg',
            id: 400160
        },
        {
            video: false,
            id: 524047,
            popularity: 810.626,
            overview: "John Garrity, his estranged wife and their young son embark on a perilous journey to find sanctuary as a planet-killing comet hurtles toward Earth. Amid terrifying accounts of cities getting levelled, the Garrity's experience the best and worst in humanity. As the countdown to the global apocalypse approaches zero, their incredible trek culminates in a desperate and last-minute flight to a possible safe haven.",
            release_date: '2020-07-29',
            adult: false,
            backdrop_path: '/2Fk3AB8E9dYIBc2ywJkxk8BTyhc.jpg',
            title: 'Greenland',
            genre_ids: [28, 53],
            vote_average: 7.2,
            original_language: 'en',
            original_title: 'Greenland',
            poster_path: '/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg',
            vote_count: 672
        },
        {
            video: false,
            id: 671039,
            popularity: 719.436,
            vote_count: 237,
            release_date: '2020-10-30',
            adult: false,
            backdrop_path: '/gnf4Cb2rms69QbCnGFJyqwBWsxv.jpg',
            vote_average: 5.8,
            genre_ids: [53, 28, 18, 80],
            overview: 'Caught in the crosshairs of police corruption and Marseille’s warring gangs, a loyal cop must protect his squad by taking matters into his own hands.',
            original_language: 'fr',
            original_title: 'Bronx',
            poster_path: '/9HT9982bzgN5on1sLRmc1GMn6ZC.jpg',
            title: 'Rogue City'
        },
        {
            video: false,
            vote_average: 7.2,
            popularity: 647.283,
            overview: 'When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.',
            release_date: '2020-09-04',
            adult: false,
            backdrop_path: '/qAKvUu2FSaDlnqznY4VOp5PmjIF.jpg',
            vote_count: 3009,
            genre_ids: [28, 12, 18, 14],
            original_language: 'en',
            title: 'Mulan',
            original_title: 'Mulan',
            poster_path: '/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
            id: 337401
        },
    ]
}
const mockFilterMoviesInput =
    [{
        video: false,
        id: 671039,
        popularity: 719.436,
        vote_count: 237,
        release_date: '2020-10-30',
        adult: false,
        backdrop_path: '/gnf4Cb2rms69QbCnGFJyqwBWsxv.jpg',
        vote_average: 5.8,
        genre_ids: [53, 28, 18, 80],
        overview: 'Caught in the crosshairs of police corruption and Marseille’s warring gangs, a loyal cop must protect his squad by taking matters into his own hands.',
        original_language: 'fr',
        original_title: 'Bronx',
        poster_path: '/9HT9982bzgN5on1sLRmc1GMn6ZC.jpg',
        title: 'Rogue City'
    }]

const mockFilterMoviesReturn = {
    movieGenerationDate: new Date().toISOString(),
    movieSearchCriteria: mockSurveyRequest,
    movies: [
        {
            movieId: 671039,
            movieTitle: 'Rogue City',
            movieDescription: 'Caught in the crosshairs of police corruption and Marseille’s warring gangs, a loyal cop must protect his squad by taking matters into his own hands.',
            movieReleaseYear: '2020',
            movieGenres: 'Action, Comedy',
            moviePopularity: '58%',
            movieImagePath: '/9HT9982bzgN5on1sLRmc1GMn6ZC.jpg'
        },
    ],
};

describe('tests for discover movie', () => {
    it('should return a list of movies', () => {
        const spy = jest.spyOn(MovieDb.prototype, "discoverMovie").mockResolvedValue(mockReturnedMovies);
        movieService.getMovies(mockSurveyRequest)
            .then((movies) => {
                expect(typeof movies).toEqual(typeof {});
                expect(movies.movieResults).toEqual(mockgetMoviesReturn);
                expect(movies.movieSearchCriteria).toEqual(mockSurveyRequest);
            });
        spy.mockClear();
    });

    it('should be called twice', () => {
        const spy = jest.spyOn(MovieDb.prototype, "discoverMovie").mockResolvedValueOnce({ results: [] }).mockResolvedValueOnce(mockReturnedMovies);
        const spyQuery = jest.spyOn(helperQuery, "revisedQuery").mockResolvedValueOnce({});
        movieService.getMovies(mockSurveyRequest)
            .then((movies) => {
                expect(movies.movieSearchCriteria).toEqual({});
                expect(movies.movieResults).toEqual(mockgetMoviesReturn);
            });
        spy.mockClear();
    });
    it('should return a filtered movie', () => {
        const list = jest.spyOn(matcher, "listMatcher").mockResolvedValue('Action, Comedy');
        movieService.filterMovies({ movieResults: mockFilterMoviesInput, movieSearchCriteria: mockSurveyRequest })
            .then((res) => {
                expect(typeof res).toEqual(typeof {});
                expect(res.movies).toEqual(mockFilterMoviesReturn.movies);
                expect(res.movieSearchCriteria).toEqual(mockSurveyRequest);
            });
        list.mockClear();
    })
    // it('should return a list of filtered movies', () => {
    //     const getMovies = jest.spyOn(movieService, "getMovies").mockResolvedValueOnce({ movieResults: mockgetMoviesReturn, movieSearchCriteria: mockSurveyRequest });
    //     const filteredMovies = jest.spyOn(movieService, "filterMovies").mockResolvedValueOnce(mockFilterMoviesReturn);
    //     movieService.returnMovies(mockSurveyRequest)
    //         .then((res) => {
    //             expect(res.movieSearchCriteria).toEqual(mockSurveyRequest)
    //             expect(res.movies).toEqual(mockgetMoviesReturn.results)
    //         });
    // });
    it('should throw an error from API', () => {
        const movies = jest.spyOn(MovieDb.prototype, "discoverMovie").mockRejectedValueOnce(null);
        movieService.getMovies(mockSurveyRequest)
            .catch((err) => {
                expect(err).toBe(null);
            });
        movies.mockClear();
    });
    it('should throw an error from list matcher', () => {
        const movies = jest.spyOn(MovieDb.prototype, "discoverMovie").mockResolvedValueOnce({ page: 1, results: [] })
        const query = jest.spyOn(helperQuery, "revisedQuery").mockRejectedValueOnce(`Failed to create new query`);
        movieService.getMovies(mockSurveyRequest)
            .catch((err) => {
                expect(err).toBe("Failed to create new query");
            });
        movies.mockClear();
    });

});
