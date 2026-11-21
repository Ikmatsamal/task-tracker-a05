import { describe, it, expect } from 'vitest'
import {
  createTask,
  toggleTask,
  deleteTask,
  filterTasks,
  countActive,
  sortByPriority,
  type Task,
} from './tasks'

const sample: Task[] = [
  { id: '1', title: 'Buy milk', priority: 'low', done: false },
  { id: '2', title: 'Pay rent', priority: 'high', done: true },
  { id: '3', title: 'Call mom', priority: 'medium', done: false },
]

describe('createTask', () => {
  it('creates a new task with defaults', () => {
    const task = createTask('Read a book')
    expect(task.title).toBe('Read a book')
    expect(task.priority).toBe('medium')
    expect(task.done).toBe(false)
    expect(task.id).toBeTruthy()
  })

  it('trims the title', () => {
    expect(createTask('  spaced  ').title).toBe('spaced')
  })
})

describe('toggleTask', () => {
  it('marks an active task as done', () => {
    const updated = toggleTask(sample, '1')
    expect(updated.find((t) => t.id === '1')?.done).toBe(true)
  })

  it('marks a done task as active', () => {
    const updated = toggleTask(sample, '2')
    expect(updated.find((t) => t.id === '2')?.done).toBe(false)
  })

  it('does not mutate the original array', () => {
    const before = sample.map((t) => t.done)
    toggleTask(sample, '1')
    expect(sample.map((t) => t.done)).toEqual(before)
  })
})

describe('deleteTask', () => {
  it('removes the task with the given id', () => {
    const remaining = deleteTask(sample, '2')
    expect(remaining.map((t) => t.id)).toEqual(['1', '3'])
  })

  it('returns the list unchanged for an unknown id', () => {
    expect(deleteTask(sample, 'nope')).toHaveLength(3)
  })
})

describe('filterTasks', () => {
  it('returns active tasks only', () => {
    expect(filterTasks(sample, 'active').map((t) => t.id)).toEqual(['1', '3'])
  })

  it('returns done tasks only', () => {
    expect(filterTasks(sample, 'done').map((t) => t.id)).toEqual(['2'])
  })

  it('returns all tasks otherwise', () => {
    expect(filterTasks(sample, 'all')).toHaveLength(3)
  })
})

describe('countActive', () => {
  it('counts tasks that are not done', () => {
    expect(countActive(sample)).toBe(2)
  })

  it('returns zero for an empty list', () => {
    expect(countActive([])).toBe(0)
  })
})

describe('sortByPriority', () => {
  it('orders tasks high, medium, low without mutating input', () => {
    const sorted = sortByPriority(sample)
    expect(sorted.map((t) => t.priority)).toEqual(['high', 'medium', 'low'])
    expect(sample.map((t) => t.id)).toEqual(['1', '2', '3'])
  })
})
