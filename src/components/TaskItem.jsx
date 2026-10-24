function TaskItem({ task, onToggleTask, onDeleteTask }) {
  const checkboxId = `task-${task.id}`

  return (
    <li className={`task-item${task.completed ? ' task-item-completed' : ''}`}>
      <input
        type="checkbox"
        id={checkboxId}
        className="task-check"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
      />
      <label htmlFor={checkboxId}>{task.text}</label>
      <button
        type="button"
        className="delete-task-button"
        aria-label={`Delete ${task.text}`}
        onClick={() => onDeleteTask(task.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}

export default TaskItem
