import mongoose from 'mongoose';
import { movieGenerationModel } from '../tsModels/movieGernerationModel';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    userId: String,
    userMovies: [
        {
            movieGenerationDate: {
                default: new Date().toISOString(),
                type: String,
                required: true,
            },
            movieSearchCriteria: {
                sort_by: {
                    type: String,
                    required: false,
                },
                with_genres: {
                    type: String,
                    required: false,
                },
                'release_date.lte': {
                    type: String,
                    required: false
                },
                'release_date.gte': {
                    type: String,
                    required: false
                },
                with_keywords: {
                    type: String,
                    required: false
                },
                with_companies: {
                    type: String,
                    required: false
                }

            },
            movies:
                [
                    {
                        movieId: {
                            type: Number,
                            required: true,
                        },
                        movieTitle: {
                            type: String,
                            required: false,
                        },
                        movieImagePath: {
                            type: String,
                            required: false
                        },
                        movieDescription: {
                            type: String,
                            required: false,
                        },
                        movieReleaseYear: {
                            type: String,
                            required: false,
                        },
                        movieGenres: {
                            type: String,
                            required: false,
                        },
                        moviePopularity: {
                            type: String,
                            required: false,
                        },

                    },
                ],
        },
    ],
    userPlaylists: {
        type: {
            weeklyPlaylists: {
                type: {
                    movieGenerationDate: {
                        type: String,
                        required: true,
                    },
                    movieSearchCriteria: {
                        sort_by: {
                            type: String,
                            required: false,
                        },
                        with_genres: {
                            type: Array,
                            required: false,
                        },

                        with_keywords: {
                            type: String,
                            required: false
                        },

                    },
                    movies:
                        [
                            {
                                movieId: {
                                    type: Number,
                                    required: true,
                                },
                                movieTitle: {
                                    type: String,
                                    required: true,
                                },
                                movieImagePath: {
                                    type: String,
                                    required: true
                                },
                                movieDescription: {
                                    type: String,
                                    required: true,
                                },
                                movieReleaseYear: {
                                    type: String,
                                    required: false,
                                },
                                movieGenres: {
                                    type: String,
                                    required: true,
                                },
                                moviePopularity: {
                                    type: String,
                                    required: false,
                                },

                            },
                        ],
                },
                required: false
            },
            monthlyPlaylists: {
                type: {

                    movieGenerationDate: {
                        type: String,
                        required: true,
                    },
                    movieSearchCriteria: {
                        sort_by: {
                            type: String,
                            required: false,
                        },
                        with_genres: {
                            type: Array,
                            required: false,
                        },
                        primary_release_year: {
                            type: String,
                            required: false,
                        },
                        with_keywords: {
                            type: String,
                            required: false
                        }
                    },
                    movies:
                        [
                            {
                                movieId: {
                                    type: Number,
                                    required: true,
                                },
                                movieTitle: {
                                    type: String,
                                    required: true,
                                },
                                movieImagePath: {
                                    type: String,
                                    required: true
                                },
                                movieDescription: {
                                    type: String,
                                    required: true,
                                },
                                movieReleaseYear: {
                                    type: String,
                                    required: false,
                                },
                                movieGenres: {
                                    type: String,
                                    required: true,
                                },
                                moviePopularity: {
                                    type: String,
                                    required: false,
                                },

                            },
                        ],
                },
                required: false
            },
            allTimePlaylists: {
                type: {

                    movieGenerationDate: {
                        type: String,
                        required: true,
                    },
                    movieSearchCriteria: {
                        sort_by: {
                            type: String,
                            required: false,
                        },
                        with_genres: {
                            type: Array,
                            required: false,
                        },
                        primary_release_year: {
                            type: String,
                            required: false,
                        },
                        with_keywords: {
                            type: String,
                            required: false
                        }
                    },
                    movies:
                        [
                            {
                                movieId: {
                                    type: Number,
                                    required: true,
                                },
                                movieTitle: {
                                    type: String,
                                    required: true,
                                },
                                movieImagePath: {
                                    type: String,
                                    required: true
                                },
                                movieDescription: {
                                    type: String,
                                    required: true,
                                },
                                movieReleaseYear: {
                                    type: String,
                                    required: false,
                                },
                                movieGenres: {
                                    type: String,
                                    required: true,
                                },
                                moviePopularity: {
                                    type: String,
                                    required: false,
                                },

                            },
                        ],
                },
                required: false
            },
            required: false
        },
    },
});



export default mongoose.model<movieGenerationModel>('movies', MovieSchema);
