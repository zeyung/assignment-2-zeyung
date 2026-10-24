import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanText = text.trim()
    if (!cleanText) return

    onAddTask(cleanText)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task">New task</label>
      <input
        id="new-task"
        name="task"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a task"
        autoComplete="off"
      />
      <button type="submit" className="add-task-button">Add task</button>
    </form>
  )
}

export default TaskForm
