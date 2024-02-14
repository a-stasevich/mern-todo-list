import express from 'express'
import { User } from '../models/userModel.js';

export const authRoute = express.Router();

authRoute.post('/', async (req, res) => {
    const user = await User.findOne({ login: req.body.login })
    if (!user) {
        return res.status(404).send({ message: 'User not found' })
    }

    if (user.password !== req.body.password) {
        return res.status(400).send({ message: 'Invalid data' })
    }

    return res.status(200).send(user)
})
