import mongoose, { Schema } from 'mongoose';
import { CommmunityMoviesModel } from '../tsModels/communityMovieModels';
const CommunityUploads = new Schema({
    user: {
        userId: String,
        userName: {
            type: String,
            required: true
        }
    },
    movieDetails: {
        movieTitle: {
            type: String,
            required: true
        },
        movieDescription: {
            type: String,
            required: true
        },
        moviePlaybackPath: {
            type: String,
            required: true
        },
        movieReleaseYear: {
            type: String,
            required: true
        },
        movieImagePath: {
            type: String,
            required: true
        },
        movieGenres: {
            type: String,
            required: false
        },
        movieStudio: {
            type: String,
            required: false,
            default: null
        },
        movieCredits: {
            type: String,
            required: false,
            default: null
        }
    }

});

export default mongoose.model<CommmunityMoviesModel>('communityMovies', CommunityUploads);
