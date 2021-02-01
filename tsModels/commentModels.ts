import mongoose from 'mongoose';

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
};
