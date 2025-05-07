const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

const {
  getAllTodos,
  additionalInfos,
  createTodo,
  deleteTodo,
  updateTodo,
  deleteCompleted
} = todoController

router
  .route('/')
  .get(getAllTodos)
  .post(additionalInfos, createTodo)
  .delete(deleteCompleted)
router.route('/:id').delete(deleteTodo).patch(updateTodo)

module.exports = router
