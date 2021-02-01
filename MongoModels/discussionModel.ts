import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// Create Schema
const DiscusionScehma = new Schema({

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


});
export default mongoose.model('discussions', DiscusionScehma);

