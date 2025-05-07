import { useState } from 'react'

function BodyWrapper ({ isDarkMode }) {
  document.body.style.backgroundColor = isDarkMode
    ? 'hsl(235, 21%, 11%)'
    : '#ffffff'
  return null
}

// console.log('working')
export default function App () {
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    return storedTodos || []
  })

  const [filterStatus, setFilterStatus] = useState('all')

  const [isDarkMode, setIsDarkMode] = useState(true)

  function handleDarkmode () {
    setIsDarkMode(isDarkMode => !isDarkMode)
  }

  function handleIsCompleted (id) {
    const updatedTodo = todoList.map(curTodo => {
      return curTodo.id === id
        ? { ...curTodo, completed: !curTodo.completed }
        : curTodo
    })
    setTodoList(updatedTodo)
    localStorage.setItem('todos', JSON.stringify(updatedTodo))
  }

  function handleDelete (id) {
    const newTodoList = todoList.filter(todo => todo.id !== id)
    setTodoList(newTodoList)
    localStorage.setItem('todos', JSON.stringify(newTodoList))
  }

  function addNewTodo (newTodo) {
    const newTodoList = [...todoList, newTodo]

    setTodoList(newTodoList)
    localStorage.setItem('todos', JSON.stringify(newTodoList))
    // setTodoList(todo => [...todo, newTodo])
  }

  function handleClearCompleted () {
    setTodoList(todoList => todoList.filter(todo => !todo.completed))
  }

  function filterTodo () {
    if (filterStatus === 'active') {
      return todoList.filter(todo => !todo.completed)
    } else if (filterStatus === 'completed') {
      return todoList.filter(todo => todo.completed)
    }

    return todoList
  }

  return (
    <div
      className={`App ${
        isDarkMode ? 'dark-mode dark-mode-bg' : 'light-mode light-mode-bg'
      }`}
    >
      <BodyWrapper isDarkMode={isDarkMode} />
      <div className='container'>
        <CreateNewTodo
          onAddNewTodo={addNewTodo}
          todoList={todoList}
          isDarkMode={isDarkMode}
          onHandleDarkMode={handleDarkmode}
        />
        <div className='todo'>
          <TodoList
            todoList={todoList}
            filterTodo={filterTodo}
            onHandleIsCompleted={handleIsCompleted}
            onHandleDelete={handleDelete}
            onHandleFilterTodos={filterTodo}
            onSetFilter={setFilterStatus}
            filterStatus={filterStatus}
            onHandleClearCompleted={handleClearCompleted}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  )
}

function CreateNewTodo ({
  onAddNewTodo,
  todoList,
  isDarkMode,
  onHandleDarkMode
}) {
  const [todo, setTodo] = useState('')

  function handleSubmit (e) {
    e.preventDefault()

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
        </form>
      </div>
    </div>
  )
}

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

function TodoList ({
  onHandleIsCompleted,
  onHandleDelete,
  filterTodo,
  onSetFilter,
  filterStatus,
  onHandleClearCompleted,
  isDarkMode
}) {
  return (
    <ul className=''>
      <div
        className={`list-container ${isDarkMode ? 'dark-mode' : 'light-mode '}`}
      >
        {filterTodo().length === 0 && filterStatus === 'all' && (
          <p className={`${isDarkMode ? 'dark-mode' : 'light-mode-text'}`}>
            Looks like you haven't added any tasks yet. 📝
          </p>
        )}
        {filterTodo().length === 0 && filterStatus === 'completed' && (
          <p className={` ${isDarkMode ? 'dark-mode' : 'light-mode '}`}>
            No todo yet 😥, note that every todo you complete is a step closer
            to your goals. You've got this! 💪
          </p>
        )}
        {filterTodo().length === 0 && filterStatus === 'active' && (
          <p className={`${isDarkMode ? 'dark-mode' : 'light-mode-text '}`}>
            Ready for what's next? 🤔Whether you've cleared your list or just
            getting started, your journey awaits. Keep moving forward!
          </p>
        )}

        {filterTodo().map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
            onHandleIsCompleted={onHandleIsCompleted}
            onHandleDelete={onHandleDelete}
            isDarkMode={isDarkMode}
          />
        ))}

        <Summary
          filterTodo={filterTodo}
          onHandleClearCompleted={onHandleClearCompleted}
          onSetFilter={onSetFilter}
          filterStatus={filterStatus}
          isDarkMode={isDarkMode}
        />
      </div>

      <SummarySmallScreenSize
        onSetFilter={onSetFilter}
        filterStatus={filterStatus}
        isDarkMode={isDarkMode}
      />
    </ul>
  )
}

function Todo ({ todo, onHandleIsCompleted, onHandleDelete, isDarkMode }) {
  function handleCompleted () {
    onHandleIsCompleted(todo.id)
  }

  function handleDelete () {
    onHandleDelete(todo.id)
  }

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

function Summary ({
  filterTodo,
  onHandleClearCompleted,
  onSetFilter,
  filterStatus,
  isDarkMode
}) {
  function handleFilter (filter) {
    onSetFilter(filter)
  }

  return (
    <footer className='summary'>
      <p>
        {filterTodo().length} item{filterTodo().length > 1 && 's'} left
      </p>

      <div className='summary-largescreen'>
        <button
          onClick={() => handleFilter('all')}
          className={`${
            isDarkMode ? 'not-active-dark-mode' : 'not-active-light-mode'
          } ${filterStatus === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilter('active')}
          className={`${
            isDarkMode ? 'not-active-dark-mode' : 'not-active-light-mode'
          } ${filterStatus === 'active' ? 'active' : ''}`}
        >
          Active
        </button>
        <button
          onClick={() => handleFilter('completed')}
          className={`${
            isDarkMode ? 'not-active-dark-mode' : 'not-active-light-mode'
          } ${filterStatus === 'completed' ? 'active' : ''}`}
        >
          Completed
        </button>
      </div>

      <button className='summary-btn' onClick={() => onHandleClearCompleted()}>
        Clear Completed
      </button>
    </footer>
  )
}

function SummarySmallScreenSize ({ onSetFilter, filterStatus, isDarkMode }) {
  function handleFilter (newFilter) {
    onSetFilter(newFilter)
  }

  return (
    <div
      className={`summary-smallscreen   ${
        isDarkMode ? 'dark-mode' : 'light-mode '
      }`}
    >
      <button
        onClick={() => handleFilter('all')}
        className={`${
          isDarkMode ? 'not-active-dark-mode' : 'not-active-light-mode'
        } ${filterStatus === 'all' ? 'active' : ''}`}
      >
        All
      </button>
      <button
        onClick={() => handleFilter('active')}
        className={`${
          isDarkMode ? 'not-active-dark-mode' : 'not-active-light-mode'
        } ${filterStatus === 'active' ? 'active' : ''}`}
      >
        Active
      </button>
      <button
        onClick={() => handleFilter('completed')}
        className={`${
          isDarkMode ? 'not-active-dark-mode' : 'not-active-light-mode'
        } ${filterStatus === 'completed' ? 'active' : ''}`}
      >
        Completed
      </button>
    </div>
  )
}
