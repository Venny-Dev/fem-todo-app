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

export default SummarySmallScreenSize
