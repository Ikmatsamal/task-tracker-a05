# Task Tracker

Small task tracker built with React, TypeScript and Vite. It is a training project for Software Engineering Assignment #05 (agent readiness and risk review).

## What it does
- Add a task with a title (max 100 characters) and a priority: low, medium or high.
- Mark a task as done or not done, and delete it.
- Filter the list: All, Active, Done. A counter shows how many tasks are still active.
- Tasks are kept only in React state. There is no backend and no database, so the list is lost when the page is reloaded.

## Run it
- npm install
- npm run dev (opens on http://localhost:5173/)
- npm test (Vitest unit tests for the task logic)
- npm run lint
- npm run build

## Project structure
- src/lib/tasks.ts: task logic as plain functions (createTask, toggleTask, deleteTask, filterTasks, countActive, sortByPriority)
- src/lib/tasks.test.ts: unit tests for those functions
- src/App.tsx: user interface and React state
- AGENTS.md: rules for AI coding agents (safe commands, forbidden actions, review gates)

## Known limitations
- Tasks are not saved after a reload.
- There are no UI tests, only tests for the logic.
- npm audit reports 6 vulnerabilities in development dependencies (vite / vitest chain). They are not fixed yet because the fix needs a breaking upgrade.
