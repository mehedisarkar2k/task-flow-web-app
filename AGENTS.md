<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Engineering Rules

## Code Quality

- Write clean, readable, maintainable code.
  - Prefer simplicity over clever solutions.
  - Avoid unnecessary abstractions.
  - Follow SOLID principles where applicable.
  - Keep business logic separate from UI and infrastructure.
  - STRICT: All UI must be Mobile First and smoothly responsive across all breakpoints (mobile, sm, md, lg, xl).

## File Size

- A file should generally not exceed 300 lines.
- Prefer splitting files around 200 lines.
- If a file grows too large:
  - extract components
  - extract hooks
  - extract services
  - extract utilities
  - extract types

## Reusability

- Reuse existing modules before creating new ones.
- Search for existing implementations first.
- Avoid duplicate business logic.
- Shared logic should live in reusable modules.

## Naming

- Use meaningful names.
- Avoid abbreviations unless industry standard.
- Functions should be verbs.
- Components should be nouns.
- STRICT: Always use **Arrow Functions** for component declarations (`export const Comp = () => {}`). Do NOT use `function Comp() {}`.
- STRICT: Avoid `React.FC`. Explicitly type component props instead.

Examples:

Good:
- createUser
- updateBooking
- UserCard

Bad:
- doStuff
- temp
- helper1

## Icons — STRICT RULE

- **ALWAYS** use **Lucide** icons (`lucide-react`) — bundled with shadcn/ui.
- **NEVER** use Material Symbols, Material Icons, Heroicons, or any other icon library.
- Import directly: `import { LayoutDashboard, Bell } from "lucide-react"`.
- Do NOT add `<link>` tags for Google Fonts icon fonts anywhere in the code.
- If a Lucide icon doesn't exist, pick the closest available Lucide alternative.

## Types

- Avoid `any`.
- Prefer explicit typing.
- Create reusable types.
- Keep API contracts strongly typed.

## Imports

- Prefer absolute imports.
- Remove unused imports.
- Avoid circular dependencies.

## Comments

- Write self-explanatory code.
- Use comments only when business context is necessary.
- Do not comment obvious code.

## Error Handling

- Never silently ignore errors.
- Return meaningful error messages.
- Log unexpected failures.

## AI Agent Behavior

Before creating code:

1. Search for existing implementations.
2. Reuse if possible.
3. Keep architecture consistent.
4. Do not create duplicate patterns.
5. Follow existing folder structure.

<!-- Project rule start -->
 FOLLOW THE PATTERN DESCRIBE IN RULES GUIDE @RULES.md
<!-- END:project-rule-state -->
