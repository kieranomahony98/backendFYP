import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    userId: String,
    userMovies: [
        {
            movieGenerationDate: {
                type: Date,
                required: true,
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
                    movieDescription: {
                        type: String,
                        required: true,
                    },
                    movieReleaseYear: {
                        type: String,
                        required: false,
                    },
                    movieGenres: {
                        type: Array,
                        required: true,
                    },
                    moviePopularity: {
                        type: Number,
                        required: false,
                    },
                },
            ],
        },
    ],

});


export default mongoose.model('movies', MovieSchema);
