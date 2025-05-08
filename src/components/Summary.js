import { useDeleteCompleted } from '../reactQueryHooks/useTodos'

function Summary ({ filterTodo, onSetFilter, filterStatus, isDarkMode }) {
  const { deleteCompleted } = useDeleteCompleted()
  function handleFilter (filter) {
    onSetFilter(filter)
  }

  return (
    <footer className='summary'>
      <p>
        {filterTodo?.length} item{filterTodo?.length > 1 && 's'} left
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

      <button className='summary-btn' onClick={deleteCompleted}>
        Clear Completed
      </button>
    </footer>
  )
}
export default Summary
