I analyzed the test assignment in your PDF. Here is a **clear breakdown of the task + a very strong prompt you can give to an AI coding agent** (Cursor, Claude Code, GPT, etc.) so it generates a **complete high-quality project** instead of a basic one.

---

# 1. Proper Analysis of the Task

The assignment is a **Mini Product Management App (CRUD)** built with **React or Next.js** where **all data is stored in localStorage** (no backend).

Source: 

## Core Goal

Build a **Product + Category manager** with CRUD operations.

---

# 2. Entities

## Category

Fields:

```
id: string
name: string
```

Operations:

* Create category
* List categories
* Edit category
* Delete category

---

## Product

Fields:

```
id: string
name: string
categoryId: string
description: string
price: number
createdAt: string
updatedAt: string
```

Operations:

* Create product
* List products
* Edit product
* Delete product

---

# 3. Product List Requirements

Each product row must show:

```
name
category name
description
price
createdAt
updatedAt
```

---

# 4. Extra Features (IMPORTANT)

The app must also include:

### Search

Search products by **name**

### Filter

Filter by **category**

### Sorting

Sort products by:

```
name
price
createdAt
updatedAt
```

---

# 5. Validation Rules

Must validate:

```
required fields
price > 0
```

---

# 6. Technical Restrictions

Must follow:

```
NO backend
NO API
ONLY localStorage
React OR Next.js
TypeScript preferred
```

---

# 7. Expected Submission

You must provide:

```
GitHub repository
Vercel deployed link
```

---

# 8. What Interviewers Actually Expect (Hidden Evaluation)

They will likely check:

### Code structure

Good folder structure.

### State management

Proper state handling.

### Clean UI

Not ugly.

### Validation

Working forms.

### UX

Filtering, search, sorting.

### TypeScript usage

Interfaces and types.

---

# 9. Ideal Project Architecture

A strong solution should look like:

```
src
 ├── components
 │    ├── CategoryForm.tsx
 │    ├── ProductForm.tsx
 │    ├── ProductTable.tsx
 │    ├── SearchBar.tsx
 │    └── FilterBar.tsx
 │
 ├── hooks
 │    └── useLocalStorage.ts
 │
 ├── services
 │    └── storageService.ts
 │
 ├── types
 │    └── index.ts
 │
 ├── utils
 │    ├── validation.ts
 │    └── sorting.ts
 │
 ├── pages / app
 │    └── index.tsx
```

---

# 10. BEST AI AGENT PROMPT (USE THIS)

Here is the **optimized prompt** you can give to an AI coding agent to generate the entire project.

---

## FULL PROMPT

```
You are a senior frontend engineer.

Build a production-quality mini CRUD application based on the following requirements.

Project Type:
React or Next.js (prefer Next.js App Router)
Language: TypeScript
Styling: TailwindCSS
State: React hooks
Storage: localStorage only (NO backend)

PROJECT GOAL
Create a Product Management Mini App with Category support.

DATA STORAGE
All data must be stored in browser localStorage.
Do NOT use any API or backend.

ENTITIES

Category:
{
  id: string
  name: string
}

Product:
{
  id: string
  name: string
  categoryId: string
  description: string
  price: number
  createdAt: string
  updatedAt: string
}

FEATURES

CATEGORY CRUD
- Add category
- List categories
- Edit category
- Delete category

PRODUCT CRUD
- Add product
- List products
- Edit product
- Delete product

PRODUCT TABLE MUST DISPLAY
- name
- category name (resolved from categoryId)
- description
- price
- createdAt
- updatedAt

EXTRA FEATURES

Search:
- search products by name

Filter:
- filter by category

Sorting:
- name
- price
- createdAt
- updatedAt

VALIDATION

Forms must validate:
- required fields
- price must be positive

UX REQUIREMENTS

- responsive layout
- simple clean UI
- modal or form for add/edit
- confirmation for delete

TECHNICAL REQUIREMENTS

- use TypeScript interfaces
- separate components
- create reusable hooks
- abstract localStorage logic into service
- use UUID for ids
- use date formatting for createdAt / updatedAt

PROJECT STRUCTURE

src/
 components/
   CategoryForm.tsx
   ProductForm.tsx
   ProductTable.tsx
   SearchBar.tsx
   FilterBar.tsx

 hooks/
   useLocalStorage.ts

 services/
   storageService.ts

 types/
   index.ts

 utils/
   validation.ts
   sorting.ts

Deliverables:
1. Full working code
2. Clean folder structure
3. Instructions to run
4. Ready to deploy on Vercel

Also ensure code quality similar to a real production frontend project.

