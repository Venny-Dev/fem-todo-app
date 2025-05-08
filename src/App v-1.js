import { useEffect, useState } from 'react'
import Summary from './components/Summary'
import CreateNewTodo from './components/CreateNewTodo'
import TodoList from './components/TodoList'
import Todo from './components/Todo'
import { ToastContainer } from 'react-toastify'
import BodyWrapper from './components/BodyWrapper'
import { useTodos } from './reactQueryHooks/useTodos'

export default function App () {
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    return storedTodos || []
  })

  const [filterStatus, setFilterStatus] = useState('all')

  const { todos, isGettingTodos } = useTodos()
  console.log(todos)

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
  }

  function handleDelete (id) {
    setTodoList(todoList => todoList.filter(todo => todo.id !== id))
  }

  function addNewTodo (newTodo) {
    setTodoList(todoList => [...todoList, newTodo])
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

  useEffect(
    function () {
      localStorage.setItem('todos', JSON.stringify(todoList))
    },
    [todoList]
  )

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
            filterTodo={filterTodo}
            onHandleFilterTodos={filterTodo}
            onSetFilter={setFilterStatus}
            filterStatus={filterStatus}
            isDarkMode={isDarkMode}
          >
            {filterTodo().map(todo => (
              <Todo
                todo={todo}
                key={todo.id}
                onHandleIsCompleted={handleIsCompleted}
                onHandleDelete={handleDelete}
                isDarkMode={isDarkMode}
              />
            ))}
            <Summary
              filterTodo={filterTodo}
              onHandleClearCompleted={handleClearCompleted}
              onSetFilter={setFilterStatus}
              filterStatus={filterStatus}
              isDarkMode={isDarkMode}
            />
          </TodoList>
        </div>
      </div>

      <ToastContainer hideProgressBar={true} autoClose={2000} />
    </div>
  )
}
