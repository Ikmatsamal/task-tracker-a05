# AGENTS.md
## Purpose
Small task tracker (React + TypeScript + Vite). The user can add a task with a
priority (low/medium/high), mark it done or not done, delete it, and filter the
list by All / Active / Done. Data lives only in React state (no backend, no
database, no persistence). The project is used for Software Engineering
Assignment #05 (agent readiness and risk review).
## Architecture
- src/lib/tasks.ts: pure functions with the business logic (createTask,
  toggleTask, deleteTask, filterTasks, countActive, sortByPriority).
- src/lib/tasks.test.ts: Vitest unit tests for those functions.
- src/App.tsx: UI and React state. It calls the functions from tasks.ts.
- src/main.tsx: entry point. src/App.css and src/index.css: styles.
## Setup and commands
- Install: npm install
- Dev server: npm run dev
- Tests: npm test
- Lint: npm run lint
- Build: npm run build
Safe to run without asking: the commands above, reading files, git status,
git diff.
## Coding conventions
- TypeScript. Keep business logic in src/lib, not inside components.
- Functions in tasks.ts stay pure and must not mutate their input.
- Keep changes small: one focused change at a time.
- Every change in behaviour needs a test in src/lib/tasks.test.ts.
## Test expectations
- Before finishing a task run npm test, npm run lint and npm run build.
- Report the real output (pass/fail counts). Never claim a check passed
  without running it, and never invent results.
## Acceptance criteria (must stay true after any change)
1. A new task is added with a trimmed title, priority medium by default, not done.
2. An empty or whitespace-only title is not added.
3. Toggling a task changes its status and the "active" counter.
4. Filters All / Active / Done show the correct tasks.
5. Deleting a task removes only that task and updates the counter.
## Forbidden actions
- No secrets, API keys, tokens or .env files in code or commits.
- No deployment or publishing.
- No destructive commands (rm -rf, git reset --hard, git push --force).
- No adding, removing or upgrading dependencies, and no "npm audit fix --force",
  without explicit human approval.
- Do not edit package-lock.json by hand.
- Do not touch the .bolt folder. Do not commit dist or node_modules.
## Review gates
- A human reviews every diff before it is accepted.
- Stop and ask if a task needs changes outside the files it names.
## Known issues (do not fix silently, ask first)
- Empty-title check exists only in App.tsx, not in createTask.
- No title length limit.
- npm audit reports 6 vulnerabilities in dev dependencies (vite/vitest chain).
- Tasks are lost on page reload.
