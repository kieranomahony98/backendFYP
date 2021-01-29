import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    movieImagePath: {
        type: String,
        required: true
    },
});
export default mongoose.model('comments', CommentSchema);

