function TaskCounter({ total, completed, icon }) {
  return (
    <p className="task-counter" aria-label={`${total} tasks, ${completed} completed`}>
      <img src={icon} alt="" />
      <span>{total} / {completed}</span>
    </p>
  )
}

export default TaskCounter
