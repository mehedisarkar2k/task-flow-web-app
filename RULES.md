# Next.js Architecture Rules

- Don't import react in the component lavel
eg (wrong): import React from 'react'

eg (correct): 
import { useState } from "react";

## Tech Stack

Always use:

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* TanStack Query
* React Hook Form
* Zod
* Axios
* Zustand

Do not introduce alternative libraries unless explicitly requested.

---

# Core Principles

* Write clean, readable, maintainable code.
* Prefer simplicity over clever solutions.
* Reuse existing modules before creating new ones.
* Keep business logic separate from UI.
* Prefer composition over inheritance.
* Follow existing project conventions.
* Avoid duplicate code.
* Build scalable and modular features.

---

# AI Agent Rules

Before creating:

* component
* hook
* utility
* type
* service
* query
* mutation

Search the codebase first.

If an implementation already exists:

* reuse it
* extend it if necessary

Do not create duplicate functionality.

---

# File Size Rules

Preferred:

* 50-150 lines

Warning:

* 200+ lines

Maximum:

* 300 lines

If a file grows too large:

* extract components
* extract hooks
* extract services
* extract utilities
* extract types

Never create massive files.

---

# Folder Structure

src/

├── app
├── screens
├── components
├── hooks
├── clients
├── services
│ ├── api
│ ├── query
│ ├── mutation
│ └── keys
├── stores
├── types
├── constants
├── utils
└── lib

---

# App Router Rules

The app directory should only contain routing-related files.

Allowed:

app/
├── page.tsx
├── layout.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx

Pages should:

* receive params
* receive searchParams
* define metadata
* render screen components

Pages must remain thin.

Do not place:

* business logic
* complex UI
* large forms
* data transformation

inside route files.

Example:

app/users/page.tsx

return <UsersScreen />

---

# Server Components

Prefer Server Components by default.

Only use "use client" when necessary.

Valid reasons:

* useState
* useEffect
* browser APIs
* event handlers
* TanStack Query hooks
* React Hook Form

Do not add "use client" unnecessarily.

---

# Screens

All feature screens must live inside:

src/screens

Example:

src/screens/users/

├── users-screen.tsx
├── _components
├── hooks
├── constants.ts
├── types.ts

Each screen owns its local UI.

---

# Feature Components

Feature-specific components:

src/screens/[feature]/_components

Example:

src/screens/users/_components/user-card.tsx

These components should only be used by the feature.

If a component becomes reusable:

Move it to:

src/components

---

# Shared Components

Reusable UI belongs in:

src/components

Example:

src/components/

├── ui
├── forms
├── tables
├── layouts
├── modals

Shared components must:

* be reusable
* be feature agnostic
* contain no business logic

---

# shadcn/ui Rules

Always prefer shadcn/ui components.

Before creating a custom component:

Check whether shadcn already provides it.

Examples:

* Button
* Dialog
* Sheet
* DropdownMenu
* Popover
* Tabs
* Form
* Table

Prefer composition over modifying shadcn source files.

Do not edit generated shadcn components unless absolutely necessary.

---

# Tailwind Rules

Use Tailwind CSS for styling.
Never create a custom UI component if an equivalent shadcn/ui component already exists.

Do not use:

* inline styles
* CSS modules
* styled-components
* emotion

Prefer utility classes.

Extract repeated class patterns into reusable components.

Use cn() utility for conditional classes.

Example:

cn(
"rounded-md",
isActive && "bg-primary"
)

---

# Feature Boundaries

Features must not import from other feature folders.

Bad:

screens/users
→ importing from
screens/bookings

Good:

Move shared code to:

* components
* hooks
* services
* types
* utils

Keep features isolated.

---

# Components

One component should have one responsibility.

Avoid components that:

* fetch data
* manage forms
* handle business logic
* render complex UI

all at the same time.

Split large components.

---

# Types

Feature types:

src/screens/[feature]/types.ts

Shared types:

src/types

Avoid duplicate interfaces.

Avoid any.

Prefer explicit typing.

---

# API Clients

All clients live inside:

src/clients

Example:

src/clients/

├── api-client.ts
├── query-client.ts

api-client.ts responsibilities:

* axios instance
* interceptors
* auth token handling
* error normalization

query-client.ts responsibilities:

* QueryClient setup
* query defaults
* mutation defaults

Never create axios instances elsewhere.

---

# Services

All server communication belongs inside:

src/services

Structure:

src/services/

├── api
├── query
├── mutation
└── keys

---

# API Services

Location:

src/services/api

Responsibilities:

* endpoint definitions
* HTTP requests
* request mapping
* response mapping

Examples:

* getUsers
* getUser
* createUser
* updateUser

Must not contain:

* React hooks
* UI logic

---

# Query Services

Location:

src/services/query

Responsibilities:

* query hooks
* query options

Examples:

* useUsersQuery
* useUserQuery

Must consume:

services/api

Never call axios directly.

---

# Mutation Services

Location:

src/services/mutation

Responsibilities:

* mutation hooks
* optimistic updates
* invalidation logic

Examples:

* useCreateUserMutation
* useUpdateUserMutation
* useDeleteUserMutation

Must consume:

services/api

Never call axios directly.

---

# Query Keys

All query keys belong inside:

src/services/keys

Example:

export const userKeys = {
all: ["users"],
lists: () => [...userKeys.all, "list"],
detail: (id: string) => [...userKeys.all, id],
}

Never hardcode query keys.

Always use centralized keys.

---

# TanStack Query

Use TanStack Query for server state.

Never store API data inside:

* useState
* Zustand
* Context

unless there is a clear reason.

Server state belongs to TanStack Query.

---

# Zustand

Use Zustand only for:

* auth session
* theme
* sidebar state
* filters
* wizard state
* UI state

Do not use Zustand as an API cache.

---

# Forms

Always use:

* React Hook Form
* Zod

Do not manage large forms with useState.

Validation schemas should live near the feature.

---

# Hooks

Reusable hooks:

src/hooks

Examples:

* useDebounce
* useDisclosure
* usePagination

Feature hooks:

src/screens/[feature]/hooks

---

# Constants

Shared constants:

src/constants

Feature constants:

src/screens/[feature]/constants.ts

Avoid magic strings.

---

# Utilities

Location:

src/utils

Utilities must:

* be pure functions
* contain no React code
* contain no API calls

---

# Naming Rules

Components:

* UserCard
* BookingTable
* UserForm

Hooks:

* useUserQuery
* useUsersQuery
* useCreateUserMutation

Functions:

* createUser
* updateBooking
* deleteSession

Avoid generic names:

* helper
* util
* data
* temp
* stuff

---

# Imports

Allowed dependency flow:

Page
↓
Screen
↓
Component
↓
Query/Mutation
↓
API Service
↓
Client

Never reverse this dependency flow.

Good:

Screen
→ Query Hook
→ API Service
→ api-client

Bad:

API Service
→ Screen

Bad:

Query Hook
→ Component

---

# Error Handling

Never silently ignore errors.

Always:

* normalize API errors
* show meaningful messages
* handle loading states
* handle empty states

Avoid empty catch blocks.

---

# Code Generation Rule

Whenever generating code:

1. Follow existing architecture.
2. Reuse existing modules.
3. Keep files under 300 lines.
4. Use TypeScript.
5. Use Tailwind CSS.
6. Use shadcn/ui.
7. Use TanStack Query.
8. Use React Hook Form + Zod for forms.
9. Avoid duplication.
10. Produce production-ready code.
