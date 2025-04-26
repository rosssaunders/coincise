# Extraction Projects Rules

## Project Structure

Each extraction project must follow this directory structure:

```
project-name/
├── config/ # json based config files
├── src/
│   ├── index.js           # Entry point
│   ├── utils/           # Utility functions
├── package.json
├── package-lock.json
└── README.md
```

## Dependencies

Required dependencies for all extraction projects:

- turndown: ^7.1.2
- turndown-plugin-gfm: ^1.0.2

Optional dependencies must be justified in the project's README.md.

## JavaScript Standards

- Use pure ES6 JavaScript only
- No TypeScript or other transpiled languages
- All files must use `.js` extension
- Use ES6 modules (`import`/`export`)
- Enable strict mode in all files
- Use async/await for asynchronous operations
- Follow ES6 class syntax for object-oriented code
- Use arrow functions where appropriate
- Use template literals for string interpolation
- Use destructuring and spread operators
- Use const/let instead of var

## Code Style

- Use 2 spaces for indentation
- Use semicolons
- Maximum line length: 100 characters
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_SNAKE_CASE for constants
