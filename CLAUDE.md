# Trulia Clone - Development Guide

## Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production app
- `npm run start` - Run production build
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **Components**: PascalCase, feature-based organization (home/, layout/, etc.)
- **Client Components**: Mark with "use client" directive at top
- **Imports**: React first, Next.js second, UI components, then utilities
- **Types**: Use TypeScript interfaces for props with clear naming
- **Styling**: Use Tailwind, follow existing color/typography styles
- **Naming**: Descriptive, feature-oriented names for components and files
- **Props**: Optional props with ? notation and default values
- **Exports**: Default exports for components
- **Images**: Use Next.js Image component for optimization
- **Responsiveness**: Follow mobile-first approach with Tailwind breakpoints
- **UI Components**: Leverage existing shadcn/ui components

## Path Aliases
- Use `@/*` imports to reference files from the src/ directory