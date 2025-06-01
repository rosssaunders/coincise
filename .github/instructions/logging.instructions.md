---
applyTo: "**"
---

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
