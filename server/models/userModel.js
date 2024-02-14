import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        todos: {
            type: Array,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', userSchema)