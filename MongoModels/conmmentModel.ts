import mongoose from 'mongoose';
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
    commentScore: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

});
export default mongoose.model('comments', CommentSchema);



