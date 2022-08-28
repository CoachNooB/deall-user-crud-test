import {  model, Schema } from "mongoose";

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, "Please add Username."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add Password."],
    },
    role: {
        type: String,
        required: [true, "Please add Role."],
    },
}, {
    timestamps: true
});

export const User = model("User", userSchema);