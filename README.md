# Modern UI Application Starter

A sleek, responsive application starter kit built with Tailwind CSS and shadcn/aceternity UI components. This project provides a solid foundation for your next web application with a modern tech stack and beautiful UI components ready to use.

## Features

- 🌈 **Modern UI** - Pre-configured with shadcn UI and aceternity UI components
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 🧱 **Component Library** - Ready-to-use UI components from shadcn/aceternity UI
- 🚀 **Developer Experience** - Optimized setup for efficient development
- 📱 **Responsive Design** - Mobile-first approach out of the box

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (v8 or newer) or [yarn](https://yarnpkg.com/) (v1.22 or newer) or [pnpm](https://pnpm.io/) (v7 or newer)

### Installation

1. Clone this repository:

   ```bash
   git clone <your-repo-url>
   cd <your-project-name>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── public/              # Public assets
├── src/
│   ├── components/      # UI components
│   │   └── ui/          # shadcn UI components
│   ├── lib/             # Utility functions
│   ├── styles/          # Global styles
│   ├── app/             # Application routes
│   └── ...
├── tailwind.config.js   # Tailwind CSS configuration
└── ...
```

## Customization

### Adding New Components

1. Install a shadcn UI component:

   ```bash
   npx shadcn-ui@latest add button
   ```

2. Use the component in your application:

   ```jsx
   import { Button } from "@/components/ui/button";

   export default function MyComponent() {
     return <Button>Click me</Button>;
   }
   ```

### Customizing Theme

Edit the `tailwind.config.js` file to customize colors, fonts, and other design tokens:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        primary: {
          DEFAULT: "#3b82f6",
          // Add color variations
        },
      },
      // Add other customizations
    },
  },
  // ...
};
```

### Adding New Pages

Create new pages in the `src/app` directory according to your routing preferences.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Adding Additional Libraries

You can extend this starter with various libraries based on your project needs:

- **State Management**: Redux, Zustand, or Jotai
- **Forms**: React Hook Form, Formik
- **Data Fetching**: TanStack Query, SWR
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js, Clerk

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
