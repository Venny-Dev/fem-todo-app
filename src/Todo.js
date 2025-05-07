function Todo ({ todo, onHandleIsCompleted, onHandleDelete, isDarkMode }) {
  function handleCompleted () {
    onHandleIsCompleted(todo.id)
  }

  function handleDelete () {
    onHandleDelete(todo.id)
  }

  // const dotenv = require('dotenv')
  // dotenv.config({ path: './config.env' })

  // // const app = require('./app')

  // const port = process.env.PORT || 3000

  // app.listen(port, () => {
  // console.log(`App running on port ${port}...`)
  // })

  return (
    <li
      className={`${todo.completed ? 'completed' : ''} ${
        isDarkMode
          ? 'dark-mode-input dark-mode-list'
          : 'light-mode  light-mode-list'
      }`}
    >
      <span>
        <Button todo={todo} onClick={() => handleCompleted()} />
      </span>
      <span className={`${todo.completed ? 'completed-text' : ''} `}>
        {todo.todo}
      </span>
      <span className='last-el'>
        <button className='last-el-btn' onClick={() => handleDelete()}>
          <img
            src={process.env.PUBLIC_URL + 'images/icon-cross.svg'}
            alt='cross'
          />
        </button>
      </span>
    </li>
  )
}

export default Todo

function Button ({ todo, onClick }) {
  return (
    <button
      className={`form-container-btn ${todo.completed ? 'btn-complete' : ''}`}
      onClick={onClick}
    >
      {todo.completed && (
        <img
          src={process.env.PUBLIC_URL + 'images/icon-check.svg'}
          alt='complete'
        />
      )}
    </button>
  )
}
