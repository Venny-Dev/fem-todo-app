import { useState } from 'react'
import Summary from './components/Summary'
import CreateNewTodo from './components/CreateNewTodo'
import TodoList from './components/TodoList'
import Todo from './components/Todo'
import { ToastContainer } from 'react-toastify'
import BodyWrapper from './components/BodyWrapper'
import { useTodos } from './reactQueryHooks/useTodos'

export default function App () {
  const [filterStatus, setFilterStatus] = useState('all')

  const { todos, isGettingTodos } = useTodos(filterStatus)

  const [isDarkMode, setIsDarkMode] = useState(true)

  function handleDarkmode () {
    setIsDarkMode(isDarkMode => !isDarkMode)
  }
  // console.log(todos)

  return (
    <div
      className={`App ${
        isDarkMode ? 'dark-mode dark-mode-bg' : 'light-mode light-mode-bg'
      }`}
    >
      <BodyWrapper isDarkMode={isDarkMode} />
      <div className='container'>
        <CreateNewTodo
          isDarkMode={isDarkMode}
          onHandleDarkMode={handleDarkmode}
        />
        <div className='todo'>
          <TodoList
            filterTodo={todos?.data?.todos}
            onSetFilter={setFilterStatus}
            filterStatus={filterStatus}
            isDarkMode={isDarkMode}
            isLoading={isGettingTodos}
          >
            {!isGettingTodos &&
              todos?.data?.todos.map(todo => (
                <Todo todo={todo} key={todo._id} isDarkMode={isDarkMode} />
              ))}
            <Summary
              filterTodo={todos?.data?.todos}
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
