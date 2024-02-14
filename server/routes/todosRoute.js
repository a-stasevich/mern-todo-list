import express from 'express'
import { Todo } from '../models/todoModel.js';

export const todosRoute = express.Router();

todosRoute.get('', async (req, res) => {
  try {
    const todos = await Todo.find({})

    return res.status(200).json(todos)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})


todosRoute.post('', async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: 'Invalid data'
      })
    }
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      createdBy: req.body.createdBy
    }

    const todo = await Todo.create(newTodo)
    return res.status(201).send(todo)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})

todosRoute.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await Todo.findById(id)

    return res.status(200).json(todo)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})


todosRoute.post('/my-todos', async (req, res) => {
  try {
    const { id } = req.body
    console.log(id)
    const todo = await Todo.find({createdBy: id})
    console.log(todo)
    return res.status(200).json(todo)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
})


todosRoute.put('/:id', async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: 'Invalid data'
      })
    }
    const { id } = req.params

    const todo = await Todo.findByIdAndUpdate(id, req.body)

    if (!todo) {
      return res.status(404).send({
        message: 'Not found'
      })
    }

    return res.status(200).json({ message: 'success' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})


todosRoute.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const todo = await Todo.findByIdAndDelete(id)

    if (!todo) {
      return res.status(404).send({
        message: 'Not found'
      })
    }

    return res.status(200).json({ message: 'success' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})
