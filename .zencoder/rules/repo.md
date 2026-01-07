---
description: Repository Information Overview
alwaysApply: true
---

# CRM Frontend Information

## Summary
The **CRM Frontend** is a modern web application built with **React** and **Vite**. It provides a user interface for managing leads, tracking pipelines, and team collaboration. The project utilizes **Tailwind CSS 4** for styling and **React Router Dom 7** for navigation.

## Structure
- **src/**: Main source code directory.
  - **assets/**: Contains SVGs, logos, and images used in the application.
  - **components/**: Reusable UI components like `LeadsListView`, `LeadsPipelineView`, and `PipelineCard`.
  - **data/**: Contains mock data (`mockData.js`) for development and testing.
  - **layouts/**: Defines structural templates like `AuthLayout` for login/signup and `DashboardLayout` for the main app.
  - **pages/**: Page-level components including `Dashboard`, `Leads`, `Login`, `Signup`, and `LeadProfile`.
  - **utils/**: Utility functions such as `leadsStorage.js` for data persistence logic.
- **public/**: Static assets that are served directly.
- **index.html**: The main HTML entry point for the Vite application.

## Language & Runtime
**Language**: JavaScript (JSX)  
**Version**: ES Modules (specified as `"type": "module"` in `package.json`)  
**Build System**: Vite 7  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `react-router-dom`: ^7.11.0
- `tailwindcss`: ^4.1.18
- `@tailwindcss/vite`: ^4.1.18
- `lucide-react`: ^0.562.0

**Development Dependencies**:
- `vite`: ^7.2.4
- `eslint`: ^9.39.1
- `@vitejs/plugin-react`: ^5.1.1
- `eslint-plugin-react-hooks`: ^7.0.1
- `eslint-plugin-react-refresh`: ^0.4.24

## Build & Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint the codebase
npm run lint

# Preview production build
npm run preview
```

## Main Files & Resources
- **Entry Point**: `src/main.jsx`
- **Main App Component**: `src/App.jsx` (handles routing)
- **Global Styles**: `src/index.css` (Tailwind CSS 4 configuration)
- **Vite Config**: `vite.config.js`
- **ESLint Config**: `eslint.config.js`
- **Main Layouts**:
  - `src/layouts/DashboardLayout.jsx`
  - `src/layouts/AuthLayout.jsx`
