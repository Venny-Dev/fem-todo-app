import SummarySmallScreenSize from './SummarySmallScreenSize'

function TodoList ({
  filterTodo,
  onSetFilter,
  filterStatus,
  isDarkMode,
  children
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

        {children}
      </div>

      <SummarySmallScreenSize
        onSetFilter={onSetFilter}
        filterStatus={filterStatus}
        isDarkMode={isDarkMode}
      />
    </ul>
  )
}

export default TodoList
