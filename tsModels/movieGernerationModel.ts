import * as mongoose from "mongoose";


export interface movieSearchCriteriaModel {
    region?: string;
    sort_by?: 'popularity.asc' | 'popularity.desc' | 'release_date.asc' | 'release_date.desc' | 'revenue.asc' | 'revenue.desc' | 'primary_release_date.asc' | 'primary_release_date.desc' | 'original_title.asc' | 'original_title.desc' | 'vote_average.asc' | 'vote_average.desc' | 'vote_count.asc' | 'vote_count.desc';
    certification_country?: string;
    certification?: string;
    'certification.lte'?: string;
    'certification.gte'?: string;
    include_adult?: boolean;
    include_video?: boolean;
    page?: number;
    primary_release_year?: number;
    'primary_release_date.gte'?: string;
    'primary_release_date.lte'?: string;
    'release_date.gte'?: string;
    'release_date.lte'?: string;
    with_release_type?: number;
    year?: number;
    'vote_count.gte'?: number;
    'vote_count.lte'?: number;
    'vote_average.gte'?: number;
    'vote_average.lte'?: number;
    with_cast?: string;
    with_crew?: string;
    with_people?: string;
    with_companies?: string;
    with_genres?: string;
    without_genres?: string;
    with_keywords?: string;
    without_keywords?: string;
    'with_runtime.gte'?: number;
    'with_runtime.lte'?: number;
    with_original_language?: string;
}

export interface MovieResult {
    poster_path?: string;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: Array<number>;
    id?: number;
    media_type?: 'movie';
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
}
export interface discoverMovies {
    movieResults: MovieResult[],
    movieSearchCriteria: movieSearchCriteriaModel
}
export interface movieObject {
    movieId: number,
    movieTitle: string | undefined,
    movieDescription: string | undefined,
    movieReleaseYear: string | undefined,
    movieGenres: string | undefined,
    moviePopularity: string | undefined,
    movieImagePath: string | undefined
}

export interface singleGenerationObject {
    _id: String,
    movieGenerationDate: string
    movieSearchCriteria: movieSearchCriteriaModel,
    movies: movieObject[],
}

export interface movieGenerationModel extends mongoose.Document {
    userId: string,
    userMovies: singleGenerationObject[],
    weeklyPlaylists: singleGenerationObject,
    monthlyPlaylists: singleGenerationObject,
    userPlaylists: databasePlaylistReturn
}

export interface databasePlaylistReturn {
    weeklyPlaylists: singleGenerationObject,
    monthlyPlaylists: singleGenerationObject,
    allTimePlaylists: singleGenerationObject,
}

