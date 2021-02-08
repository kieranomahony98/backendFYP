import mongoose from 'mongoose';
import { userModel } from '../tsModels/userModel';
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.model<userModel>('users', UserSchema);
