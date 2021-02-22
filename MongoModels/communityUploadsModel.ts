import mongoose, { Schema } from 'mongoose';

const CommunityUploads = new Schema({
    user: {
        userId: mongoose.Types.ObjectId,
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

export default mongoose.model('communityMovies', CommunityUploads);
