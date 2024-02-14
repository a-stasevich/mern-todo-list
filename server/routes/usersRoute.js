import express from 'express'
import { User } from '../models/userModel.js';

export const usersRoute = express.Router();


usersRoute.post('', async (req, res) => {
  try {
    if (!req.body.name || !req.body.surname || !req.body.password || !req.body.login) {
      return res.status(400).send({
        message: 'Invalid data'
      })
    }
    const existedUser = await User.find({ login: req.body.login })
    if (existedUser) {
      return res.status(400).send({
        message: 'User with this login already exist'
      })
    }
    const newUser = {
      name: req.body.name,
      surname: req.body.surname,
      login: req.body.login,
      password: req.body.password
    }
    const user = await User.create(newUser)
    return res.status(201).send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})

usersRoute.get('', async (req, res) => {
  try {
    const users = await User.find({})

    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})

usersRoute.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})

usersRoute.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        message: 'Not found'
      })
    }

    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})

