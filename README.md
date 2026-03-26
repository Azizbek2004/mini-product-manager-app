# ProductMgr - Mini Product Management System

![GitHub repo size](https://img.shields.io/github/repo-size/Azizbek2004/mini-product-manager-app)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff007f)

ProductMgr is a modern, high-performance Product and Category Management dashboard built completely on the client-side utilizing React, Next.js App Router, and browser `localStorage`. It features a pristine, Framer-inspired glassmorphism UI, fluid animations, and complete localization in the Uzbek language.

## 🌟 Key Features

- **No Backend Required:** Completely local, persistent state via robust `localStorage` abstractions.
- **Relational Data Handling:** Products are securely linked to Categories. Deleting a Category safely cascades to dependent Products.
- **Advanced Data Table:**
  - Multi-field Sorting (Name, Price, Date).
  - Real-time intelligent search.
  - Granular filtering by category.
- **Premium UI/UX System:**
  - Fluid spring animations courtesy of `framer-motion`.
  - Glassmorphic backdrop-blurs, large tactile typography, and custom micro-interactions.
  - Fully responsive, mobile-first design (bottom navigation bar gracefully replacing the sidebar on small screens).
- **Uzbek Localization:** All UI components, empty states, toasts, and form validation strictly output in Uzbek.

## 🏗 Architecture & Tech Stack

This project was developed mimicking best practices by mid/senior level frontend engineers:
- **Framework:** Next.js (App Router, strictly CSR for this constraint)
- **Language:** TypeScript (Strict Mode)
- **Styling:** TailwindCSS with custom utility abstractions (`cn` via `clsx` and `tailwind-merge`).
- **Icons:** Lucide React
- **Toast Notifications:** Sonner
- **Animation:** Framer Motion

### Directory Structure
```
📂 src/
 ├── 📂 app/              # Next.js App Router endpoints (Dashboard, Categories)
 ├── 📂 components/       # Presentational UI components and Modals
 ├── 📂 hooks/            # Custom React Hooks (e.g., useStore for synced state)
 ├── 📂 services/         # Layered abstractions (e.g., storageService for localStorage)
 ├── 📂 types/            # Global TypeScript interfaces
 └── 📂 utils/            # Pure utility functions (sorting, validation, tailwind-merging)
```

## 🚀 Getting Started

First, install all node dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing and Verification
Because the app relies completely on `localStorage`, you do not need any database or API keys. Simply running the app and navigating between tabs automatically synchronizes data flawlessly.

To verify type safety and linting compliance across the entire codebase, run:
```bash
npm run build
```

## 📝 License
This project is open-source and free to be used under the MIT License.
