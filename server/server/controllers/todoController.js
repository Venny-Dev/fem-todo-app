const Todo = require('../models/todoModel')

exports.additionalInfos = (req, res, next) => {
  req.body.createdAt = new Date()

  next()
}

exports.getAllTodos = async (req, res) => {
  try {
    const { filter } = { ...req.query }
    // console.log(filter)

    let filterObj = {}
    if (filter === 'active') {
      filterObj.completed = false
    } else if (filter === 'completed') {
      filterObj.completed = true
    }

    const todos = await Todo.find(filterObj).sort({ createdAt: -1 })
    // console.log(todos)
    res.status(200).json({
      status: 'success',
      results: todos.length,
      data: {
        todos
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}

exports.createTodo = async (req, res) => {
  try {
    // console.log(req.body)
    const newTodo = await Todo.create(req.body)

    res.status(201).json({
      status: 'success',
      data: { todo: newTodo }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    // console.log(todo)

    res.status(200).json({
      status: 'success',
      data: { todo }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'invalid data sent'
    })
  }
}

exports.deleteCompleted = async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true })

    // console.log(result)
    res.status(200).json({
      status: 'success',
      deleted: result.deletedCount
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }
}
