import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        createdBy: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export const Todo = mongoose.model('Todo', todoSchema)