import { useState } from 'react'
import { toast } from 'react-toastify'
import { useCreateTodo } from '../reactQueryHooks/useTodos'
import Loader from './Loader'

function CreateNewTodo ({ isDarkMode, onHandleDarkMode }) {
  const [todo, setTodo] = useState('')
  const { createTodo, isCreatingTodo } = useCreateTodo()

  function handleSubmit (e) {
    e.preventDefault()

    if (!todo) return toast.error('Please add a todo')
    const newTodo = {
      name: todo,
      completed: false
    }
    createTodo(newTodo, {
      onSuccess: () => {
        setTodo('')
      }
    })
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
            disabled={isCreatingTodo}
            onChange={e => setTodo(e.target.value)}
          />

          {isCreatingTodo && (
            <div className='loader-container-create'>
              <Loader />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default CreateNewTodo
