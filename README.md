## Deployment

The application is deployed and can be accessed at the following URL: [https://mikeduarte.github.io/pokemon](https://mikeduarte.github.io/pokemon)

Feel free to visit the deployment to see the live version of the app in action!

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Change into the project directory: `cd <project_directory>`
3. Install the dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Open your browser and navigate to `http://localhost:5173/pokemon` to see the application.

## Scripts

The following npm scripts are available for the project:

- `dev`: Starts the development server.
- `build`: Builds the production-ready application.
- `serve`: Serves the production build locally.
- `lint`: Runs ESLint to check for code style and errors.
- `preview`: Roots up a local static web server that serves the files from dist.
- `test`: Runs the unit tests using Vitest.
- `test:e2e`: Runs end-to-end tests in headless using Cypress (Please be sure that you run dev command first).
- `cypress`: Opens Cypress (Use this to rune the end-to-end test manually in a browser).

## Code Formatting and Linting

This project uses Prettier, ESLint and Husky to maintain consistent code formatting and identify code errors and style issues before commits.

## Library/Tools Used

### React w/ Typescript

Self explanatory? Love this combination. It improves code quality, reduces errors, enhances developer productivity, and results in more maintainable and scalable projects.

### React Query

React Query adds the ability to easily retrieve data from APIs and handle the different states of data fetching, such as loading, success, error. React Query also automatically caches fetched data with background updates, which helps with managing global and local application state. It supports pagination strategies and can handle infinite scrolling.

### Material-UI v5

Material-UI v5 was used since it offers out-of-the-box accessibility and responsive design support. It also offers many components needed for the requirements of the project, such as Tabs, Text Inputs, Select Inputs, Information Cards, as well as the ability to customize theming.

### Mocking API Requests with MSW

This project uses MSW (Mock Service Worker) to mock API requests during unit testing, The mock handlers are defined in the `src/TestUtils/__mocks__` directory. The decision to use this was based off the fact that the project is heavily API driven.

### Vite

Why Vite? Vite was chosen for its small size and build speed. With the announcement of Create React App no longer being supported, some of the alternatives are Next.js, Remix, Vite, etc. The decision to use Vite was made as a learning experience and to explore something new.