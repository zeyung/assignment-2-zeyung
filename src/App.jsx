import { useState } from 'react'
import './App.css'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import checkIcon from './assets/check_icon.png'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskCounter from './components/TaskCounter.jsx'

const startingTasks = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

const filters = ['All', 'Active', 'Completed']

function App() {
  const [tasks, setTasks] = useState(startingTasks)
  const [filter, setFilter] = useState('All')

  const addTask = (text) => {
    const cleanText = text.trim()
    if (!cleanText) return

    setTasks((currentTasks) => {
      const nextId = currentTasks.reduce((largestId, task) => Math.max(largestId, task.id), 0) + 1
      return [...currentTasks, { id: nextId, text: cleanText, completed: false }]
    })
  }

  const toggleTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )))
  }

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="header-left">
          <button type="button" className="menu-button" aria-label="Menu">
            <img src={menuIcon} alt="" />
          </button>
          <form className="quick-find" role="search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="quick-find-input" className="visually-hidden">Quick find</label>
            <img src={searchIcon} alt="" className="search-icon" />
            <input type="search" id="quick-find-input" placeholder="Quick find" />
          </form>
        </div>
        <TaskCounter total={tasks.length} completed={completedCount} icon={checkIcon} />
      </header>

      <div className="page-body">
        <nav className="sidebar" aria-label="Task categories">
          <ul className="nav-list">
            <li className="nav-item nav-item-active">
              <a href="#inbox" aria-current="page">
                <img src={inboxIcon} alt="" className="nav-icon" />
                <span className="nav-label">Inbox</span>
                <span className="nav-count">{tasks.length}</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#today">
                <img src={calendarIcon} alt="" className="nav-icon" />
                <span className="nav-label">Today</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#upcoming">
                <img src={upcomingIcon} alt="" className="nav-icon" />
                <span className="nav-label">Upcoming</span>
              </a>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <section className="task-section" id="inbox" aria-labelledby="task-section-title">
            <div className="task-section-heading">
              <h1 id="task-section-title">Inbox</h1>
              <span className="section-total" aria-label={`${tasks.length} total tasks`}>{tasks.length}</span>
            </div>

            <div className="task-filters" role="group" aria-label="Filter tasks">
              {filters.map((filterName, index) => (
                <span className="filter-option" key={filterName}>
                  {index > 0 && <span className="filter-separator" aria-hidden="true">|</span>}
                  <button
                    type="button"
                    className={`filter-button${filter === filterName ? ' filter-button-active' : ''}`}
                    aria-pressed={filter === filterName}
                    onClick={() => setFilter(filterName)}
                  >
                    {filterName}
                  </button>
                </span>
              ))}
            </div>

            <TaskForm onAddTask={addTask} />
            <TaskList tasks={visibleTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
