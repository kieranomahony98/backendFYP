import mongoose, { Schema } from 'mongoose';

const CommunityUploads = new Schema({
    user: {
        userId: mongoose.Types.ObjectId,
        userName: {
            type: String,
            required: true
        }
    },
    userMovies: [
        {
            movieTitle: {
                type: String,
                required: true
            },
            MovieDescription: {
                type: String,
                required: true
            },
            moviePlaybackPath: {
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
    ]
});

export default mongoose.model('communityMovies', CommunityUploads);
