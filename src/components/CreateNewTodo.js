import { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { useCreateTodo } from '../reactQueryHooks/useTodos'

function CreateNewTodo ({
  onAddNewTodo,
  todoList,
  isDarkMode,
  onHandleDarkMode
}) {
  const [todo, setTodo] = useState('')

  // useCreateTodo()

  function handleSubmit (e) {
    e.preventDefault()

    if (!todo) return toast.error('Please add a todo')
    const newTodo = {
      todo,
      id: todoList.length + 1,
      completed: false
    }
    onAddNewTodo(newTodo)

    setTodo('')
  }

  return (
    <div className=''>
      <div className='main'>
        <div className='header'>
          <header>TODO</header>
          <button className='btn' onClick={() => onHandleDarkMode()}>
            {isDarkMode ? (
              <img
                src={process.env.PUBLIC_URL + 'images/icon-sun.svg'}
                alt='sun'
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + 'images/icon-moon.svg'}
                alt='moon'
              />
            )}
          </button>
        </div>
        <form
          className={`form-container  ${
            isDarkMode ? 'dark-mode-input' : 'light-mode'
          }`}
          onSubmit={handleSubmit}
        >
          <button className='form-container-btn'></button>
          <input
            type='text'
            className={`form-container-input ${
              isDarkMode ? 'dark-mode-input' : 'light-mode'
            }`}
            placeholder='Create a new todo...'
            value={todo}
            onChange={e => setTodo(e.target.value)}
          />

          {/*  <div className='loader-container'>
            <Loader />
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default CreateNewTodo
