import mongoose from 'mongoose';
export interface comment {
    movieId: string,
    movieImageURI: string,
    comments: userCommentObj[]

}

export interface userCommentObj {
    user: {
        userID: string,
        userName: string
    },
    comments: userComment[]
}

export interface userComment {
    commentText: string,
    commentUpvotes: number,
    commentDownvotes: number,
    commentTimeStamp: string,
    parent: null | string[],
    commentReplies: userComment[],
    commentId: string,
}

export interface structureCommentReturn {
    userComments: comment,
    ids: string[]
}

export interface tsCommentSchema {
    movieId: string,
    parentId?: mongoose.Schema.Types.ObjectId,
    postedDate?: string,
    user: {
        userId: mongoose.Schema.Types.ObjectId,
        userName: string
    },
    depth?: Number,
    commentText?: string,
    commentDownVotes: Number,
    commentUpVotes: Number,
    isDeleted: Boolean
}
