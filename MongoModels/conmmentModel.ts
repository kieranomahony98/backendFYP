import mongoose from 'mongoose';
import { comment } from '../tsModels/commentModels';
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    depth: {
        type: Number,
        default: 1
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    postedDate: {
        type: String,
        default: new Date().toISOString()
    },
    user: {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String
    },
    commentText: {
        type: String,
        required: true
    },
    commentUpVotes: {
        type: Number,
        default: 0
    },
    commentDownVotes: {
        type: Number,
        default: 0
    }
});
export default mongoose.model('comments', CommentSchema);



