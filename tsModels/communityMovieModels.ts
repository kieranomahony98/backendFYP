import mongoose from "mongoose";

export interface CommmunityMoviesModel extends mongoose.Document {
    user: {
        userId: String,
        userName: String,
    },
    movieDetails: {
        movieTitle: String,
        movieDescription: String,
        moviePlaybackPath: String,
        movieReleaseYear: String,
        movieImagePath: String,
        movieStudio: String,
        movieCredits: String,
    }
}