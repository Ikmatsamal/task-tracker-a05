# Project memory

## Product intent & audience

- Small task tracker app for Software Engineering Assignment #05 (agent readiness and risk review).
- Audience: instructor/grader evaluating agent behavior, risk review, and code hygiene.
- Scope: add task with priority (low/medium/high), toggle done, delete, filter All/Active/Done. State-only, no backend/persistence.

## Brand personality & voice

- Practical, academic, instructional. Emphasis on correctness, traceability, and honest reporting of test/lint/build results.

## Visual design & UX direction

- Minimal UI; styling split across `src/App.css` and `src/index.css`.
- Core UI affordances: task input, priority selector, done toggle, delete, filter tabs (All/Active/Done), active counter.
- Title input now includes `maxLength={MAX_TITLE_LENGTH}` (100) for client-side length control.
- No design system or theme specified; keep styling simple and consistent with existing CSS.

## Decisions, constraints & rationale

- Stack: React + TypeScript + Vite; tests via Vitest.
- Architecture: business logic isolated in `src/lib/tasks.ts` as pure, non-mutating functions; UI/state in `src/App.tsx`; entry `src/main.tsx`.
- Every behavior change requires a test in `src/lib/tasks.test.ts`; current suite has 17 tests.
- `createTask` enforces all title validation at the source: throws on empty/whitespace-only trimmed title; throws when trimmed title exceeds `MAX_TITLE_LENGTH` (100).
- `MAX_TITLE_LENGTH = 100` exported from `tasks.ts` and imported by `App.tsx` for input `maxLength`.
- Safe to run without asking: npm install/dev/test/lint/build, git status, git diff, reading files.
- Forbidden: secrets/.env, deploy/publish, destructive git commands, dependency add/remove/upgrade or `npm audit fix --force`, manual `package-lock.json` edits, touching `.bolt`, committing `dist`/`node_modules`.
- Human review gate on every diff; ask before working outside named files.
- Acceptance criteria: trimmed title add; default priority medium + not done; reject empty/whitespace title; title length capped at 100; toggle updates status + active counter; filters correct; delete removes only target and updates counter.

## Open questions & assumptions

- Known issues (ask before fixing): 6 dev-dependency vulnerabilities (vite/vitest chain); tasks lost on reload.
- Assume no backend or persistence will be introduced.
- Assume styling conventions should follow whatever already exists in `App.css`/`index.css` rather than a new framework.