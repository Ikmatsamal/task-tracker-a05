export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  priority: Priority
  done: boolean
}

export type Filter = 'all' | 'active' | 'done'

let idCounter = 0

export const MAX_TITLE_LENGTH = 100

export function createTask(title: string, priority: Priority = 'medium'): Task {
  const trimmed = title.trim()
  if (!trimmed) {
    throw new Error('Task title must not be empty')
  }
  if (trimmed.length > MAX_TITLE_LENGTH) {
    throw new Error(`Task title must be at most ${MAX_TITLE_LENGTH} characters`)
  }
  idCounter += 1
  return {
    id: `task-${idCounter}`,
    title: trimmed,
    priority,
    done: false,
  }
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  )
}

export function deleteTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id)
}

export function filterTasks(tasks: Task[], filter: Filter): Task[] {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.done)
    case 'done':
      return tasks.filter((task) => task.done)
    default:
      return tasks
  }
}

export function countActive(tasks: Task[]): number {
  return tasks.filter((task) => !task.done).length
}

export function sortByPriority(tasks: Task[]): Task[] {
  const order: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority])
}
