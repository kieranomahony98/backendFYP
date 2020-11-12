import mongoose from "mongoose";

export interface userModel extends mongoose.Document{
    name: String,
    email: String,
    password: String,
    Date: Date
}
