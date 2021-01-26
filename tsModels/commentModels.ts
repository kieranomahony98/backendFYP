import mongoose from 'mongoose';
export interface comment extends mongoose.Document {
    movieId: string,
    movieImageURI: string,
    comments: userComment[]

}

export interface userComment {
    user: {
        userID: string,
        userName: string
    },
    commentText: string,
    commentUpvotes: number,
    commentDownvotes: number,
    commentTimeStamp: string,
    parent: null | string[],
    commentReplies: userComment[]
}

