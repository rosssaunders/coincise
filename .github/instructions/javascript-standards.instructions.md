---
applyTo: "**/*.js"
---

# JavaScript Standards

- Use pure ES6 JavaScript only
- No TypeScript or other transpiled languages
- All files must use `.js` extension
- Use ES6 modules (`import`/`export`)
- Enable strict mode in all files
- Prefer synchronous calls over asynchronous ones whenever possible
- Use async/await for asynchronous operations only when necessary
- Follow functional programming paradigms and avoid object-oriented code
- DO NOT use ES6 classes unless absolutely necessary
- Use arrow functions where appropriate
- Use pure functions with no side effects whenever possible
- Use function composition over inheritance
- Use template literals for string interpolation
- Use destructuring and spread operators
- Use const/let instead of var
- Use 2 spaces for indentation
- Use semicolons
- Maximum line length: 100 characters
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_SNAKE_CASE for constants

# Logging Standards

- Use the built-in `console` methods for logging throughout the codebase
- Prefer `console.error` for error reporting with descriptive messages
- Always log both the error object and its stack trace when catching errors:
  ```javascript
  console.error("Error description:", error)
  console.error("Stack trace:", error.stack)
  ```
- Include relevant context in error messages (e.g., URL, file path, operation
  name)
- Use `console.warn` for important but non-fatal issues
- Use `console.info` or `console.log` for standard operational messages
- Avoid third-party logging libraries unless there is a specific justified need
- If using a custom logger utility, it should be simple and wrap console methods
- Ensure all log messages are clear, concise, and meaningful for debugging

# Error Handling

- Do not catch errors in your code. All errors must propagate back to the main
  function.
- The main function must always print the error and its stack trace to the
  console before exiting.

# Extraction Script Readability

- Write each extraction script so that any human can easily read and understand
  it.
- Make scripts simple to change and adapt quickly, even if this means the code
  is less organized or structured.
