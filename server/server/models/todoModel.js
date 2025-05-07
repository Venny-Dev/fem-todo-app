const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  createdAt: { type: Date },
  id: { type: String }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
