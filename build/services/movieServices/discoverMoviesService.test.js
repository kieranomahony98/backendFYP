"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discoverMovies = __importStar(require("./discoverMoviesService"));
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
const movieSearchCriteria = [
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
];
const mockMovieDbCall = {
    id: 1,
    results: movieSearchCriteria
};
const mockFilterMoviesReturn = {
    movieGenerationDate: new Date().toISOString(),
    movieSearchCriteria: mockSurveyRequest,
    movies: [
        {
            movieId: 682377,
            movieTitle: 'Chick Fight',
            movieDescription: 'When Anna Wyncomb is introduced to an an underground, all-female fight club in order to turn the mess of her life around, she discovers she is much more personally connected to the history of the club than she could ever imagine.',
            movieReleaseYear: '2020',
            movieGenres: 'Action, Comedy',
            moviePopularity: '71%',
            movieImagePath: '/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg'
        },
        {
            movieId: 724989,
            movieTitle: 'Hard Kill',
            movieDescription: 'The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.',
            movieReleaseYear: '2020',
            movieGenres: 'Action, Thriller',
            moviePopularity: '49%',
            movieImagePath: '/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg'
        },
        {
            movieId: 531219,
            movieTitle: "Roald Dahl's The Witches",
            movieDescription: "In late 1967, a young orphaned boy goes to live with his loving grandma in the rural Alabama town of Demopolis. As the boy and his grandmother encounter some deceptively glamorous but thoroughly diabolical witches, she wisely whisks him away to a seaside resort. Regrettably, they arrive at precisely the same time that the world's Grand High Witch has gathered.",
            movieReleaseYear: '2020',
            movieGenres: 'Fantasy, Family, Adventure, Comedy, Horror',
            moviePopularity: '69%',
            movieImagePath: '/betExZlgK0l7CZ9CsCBVcwO1OjL.jpg'
        },
        {
            movieId: 400160,
            movieTitle: 'The SpongeBob Movie: Sponge on the Run',
            movieDescription: 'When his best friend Gary is suddenly snatched away, SpongeBob takes Patrick on a madcap mission far beyond Bikini Bottom to save their pink-shelled pal.',
            movieReleaseYear: '2020',
            movieGenres: 'Animation, Fantasy, Adventure, Comedy, Family',
            moviePopularity: '80%',
            movieImagePath: '/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg'
        },
        {
            movieId: 524047,
            movieTitle: 'Greenland',
            movieDescription: "John Garrity, his estranged wife and their young son embark on a perilous journey to find sanctuary as a planet-killing comet hurtles toward Earth. Amid terrifying accounts of cities getting levelled, the Garrity's experience the best and worst in humanity. As the countdown to the global apocalypse approaches zero, their incredible trek culminates in a desperate and last-minute flight to a possible safe haven.",
            movieReleaseYear: '2020',
            movieGenres: 'Action, Thriller',
            moviePopularity: '72%',
            movieImagePath: '/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg'
        },
        {
            movieId: 671039,
            movieTitle: 'Rogue City',
            movieDescription: 'Caught in the crosshairs of police corruption and Marseille’s warring gangs, a loyal cop must protect his squad by taking matters into his own hands.',
            movieReleaseYear: '2020',
            movieGenres: 'Thriller, Action, Drama, Crime',
            moviePopularity: '58%',
            movieImagePath: '/9HT9982bzgN5on1sLRmc1GMn6ZC.jpg'
        },
        {
            movieId: 337401,
            movieTitle: 'Mulan',
            movieDescription: 'When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.',
            movieReleaseYear: '2020',
            movieGenres: 'Action, Adventure, Drama, Fantasy',
            moviePopularity: '72%',
            movieImagePath: '/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg'
        }
    ],
};
describe('tests for discover movie', () => {
    it('should return a blank movie object', () => {
        const emptyObject = discoverMovies.returnMovieGenerationObject();
        expect(emptyObject).toEqual(emptyMovieObject);
    });
    // it('should return a filterd list of movies', async () => {
    //     discoverMovies.filterMovies({ movieSearchCriteria, mockSurveyRequest })
    //         .then((filteredMovies) => {
    //             expect(typeof filteredMovies.movieGenerationDate).toEqual(typeof "");
    //             expect(filteredMovies.movies).toEqual(mockFilterMoviesReturn.movies);
    //             expect(filteredMovies.movieSearchCriteria).toEqual(mockFilterMoviesReturn.movieSearchCriteria);
    //         });
    // });
    // it('should throw a filter error', async () => {
    //     discoverMovies.filterMovies(null, mockSurveyRequest)
    //         .catch((err) => {
    //             expect(typeof err).toEqual(typeof {});
    //         });
    // });
});
//# sourceMappingURL=discoverMoviesService.test.js.map