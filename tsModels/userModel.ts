import mongoose from "mongoose";

export interface userModel extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    Date: Date
}

export interface loginModel {
    token: string,
    user: {
        name: string,
        email: string
    }
}