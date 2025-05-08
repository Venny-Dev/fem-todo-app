import { useCallback, useEffect, useRef, useState } from 'react'
import { useDeleteTodo, useUpdateTodo } from '../reactQueryHooks/useTodos'

function Todo ({ todo, isDarkMode }) {
  const [editingId, setEditingId] = useState('')
  const inputRefs = useRef({})
  const [editingValue, setEditingValue] = useState(todo.name)

  const { updateTodo } = useUpdateTodo()
  const { deleteTodo, isDeletingTodo } = useDeleteTodo()

  const [isChecked, setIsChecked] = useState(todo.completed)

  const enterEditMode = useCallback(id => {
    setEditingId(id)
    setTimeout(() => {
      inputRefs.current[id]?.focus()
    }, 0)
  }, [])

  useEffect(() => {
    if (editingId === null) return

    function handleClickOutside (e) {
      const inputEl = inputRefs.current[editingId]
      if (!inputEl || !inputEl.contains(e.target)) {
        const data = {
          updatedTodo: { name: editingValue },
          id: todo._id
        }
        if (editingValue !== todo.name) {
          updateTodo(data)
        }
        setEditingId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingId, todo.name, editingValue, updateTodo, todo._id])

  function handleCompleted () {
    const data = {
      updatedTodo: { completed: !todo.completed },
      id: todo._id
    }
    // console.log(data)
    updateTodo(data, {
      onError: () => {
        setIsChecked(todo.completed)
      }
    })
    setIsChecked(!isChecked)
  }

  function handleDelete () {
    deleteTodo(todo._id)
  }

  function handleEdit () {
    if (editingId === todo._id) {
      setEditingId(null)
    } else {
      enterEditMode(todo._id)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      const data = {
        updatedTodo: { name: editingValue },
        id: todo._id
      }
      updateTodo(data)
      setEditingId(null)
    }
  }

  // For some reasons this does not run, so i save in the useEffect above
  // function handleEditSave () {
  //   console.log(editingValue, todo._id)
  //   setEditingId(null)
  //   // setEditingValue(todo.name)
  // }

  return (
    <li
      className={`${isChecked || isDeletingTodo ? 'completed' : ''} ${
        isDarkMode
          ? 'dark-mode-input dark-mode-list'
          : 'light-mode  light-mode-list'
      }`}
    >
      <span>
        <Button isChecked={isChecked} onClick={handleCompleted} />
      </span>
      {editingId !== todo._id && (
        <span className={`${isChecked ? 'completed-text' : ''} `}>
          {editingValue || todo.name}
        </span>
      )}
      {editingId === todo._id && (
        <input
          value={editingValue}
          ref={el => (inputRefs.current[todo.id] = el)}
          autoFocus
          onKeyDown={handleKeyDown}
          onChange={e => setEditingValue(e.target.value)}
          className={`${
            isDarkMode ? 'editing-input-dark' : 'editing-input-light'
          }`}
        />
      )}
      <span className='last-el'>
        <button className='last-el-btn' onClick={() => handleDelete()}>
          <img src='/images/icon-cross.svg' alt='cross' />
        </button>

        {editingId !== todo._id && (
          <button className='last-el-btn' onClick={handleEdit}>
            <img src='/images/icon-edit.svg' alt='cross' />
          </button>
        )}
        {editingId === todo._id && (
          <button className='last-el-btn'>Save</button>
        )}
      </span>
    </li>
  )
}

export default Todo

function Button ({ isChecked, onClick }) {
  return (
    <button
      className={`form-container-btn ${isChecked ? 'btn-complete' : ''}`}
      onClick={onClick}
    >
      {isChecked && <img src='/images/icon-check.svg' alt='complete' />}
    </button>
  )
}
