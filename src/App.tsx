import { useMemo, useState } from 'react'
import './App.css'
import {
  createTask,
  MAX_TITLE_LENGTH,
  toggleTask,
  deleteTask,
  filterTasks,
  countActive,
  sortByPriority,
  type Filter,
  type Priority,
  type Task,
} from './lib/tasks'

const FILTERS: Filter[] = ['all', 'active', 'done']

const PRIORITY_CLASS: Record<Priority, string> = {
  low: 'badge-low',
  medium: 'badge-medium',
  high: 'badge-high',
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const visible = useMemo(
    () => sortByPriority(filterTasks(tasks, filter)),
    [tasks, filter],
  )
  const activeCount = countActive(tasks)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    setTasks((prev) => [createTask(trimmed, priority), ...prev])
    setTitle('')
    setPriority('medium')
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Tasks</h1>
        <span className="counter" aria-live="polite">
          {activeCount} active
        </span>
      </header>

      <form className="add-form" onSubmit={handleAdd}>
        <input
          className="add-input"
          type="text"
          placeholder="What needs doing?"
          value={title}
          maxLength={MAX_TITLE_LENGTH}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Task title"
        />
        <select
          className="add-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          aria-label="Priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="add-button" type="submit" disabled={!title.trim()}>
          Add
        </button>
      </form>

      <nav className="filters" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-chip${filter === f ? ' is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </nav>

      {visible.length === 0 ? (
        <p className="empty">
          {filter === 'done'
            ? 'Nothing done yet.'
            : filter === 'active'
              ? 'All caught up!'
              : 'No tasks yet. Add one above.'}
        </p>
      ) : (
        <ul className="task-list">
          {visible.map((task) => (
            <li key={task.id} className={`task${task.done ? ' is-done' : ''}`}>
              <label className="task-main">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => setTasks((prev) => toggleTask(prev, task.id))}
                  aria-label={`Mark "${task.title}" as ${task.done ? 'not done' : 'done'}`}
                />
                <span className="task-title">{task.title}</span>
                <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>
                  {task.priority}
                </span>
              </label>
              <button
                type="button"
                className="task-delete"
                onClick={() => setTasks((prev) => deleteTask(prev, task.id))}
                aria-label={`Delete "${task.title}"`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
