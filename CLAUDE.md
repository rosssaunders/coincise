# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

This file consolidates all project instructions from the .github/instructions/
directory to provide a single source of truth for development standards.

# Concise Projects Rules

## Project Structure

Each extraction project must follow this directory structure:

```
project-name/
├── config/ # JSON based config files
├── src/ # All source code goes here
│   ├── index.js           # Main Entry point
├── package.json
├── package-lock.json
└── README.md
```

## Extraction Script Readability

- Write each extraction script so that any human can easily read and understand
  it.
- Make scripts simple to change and adapt quickly, even if this means the code
  is less organized or structured.

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

## Script Entry Point

- All scripts must use the following pattern for handling entry points:

```javascript
// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
```

- All scripts must exit with a non-zero exit code when errors occur to ensure
  CI/CD pipelines can detect failures
- Error messages should be descriptive and include context about what failed

## Error Handling

- Do not catch errors in your code. All errors must propagate back to the main
  function.
- The main function must always print the error and its stack trace to the
  console before exiting.

## Logging Standards

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

## Code Style

- Use 2 spaces for indentation
- Use semicolons
- Maximum line length: 100 characters
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_SNAKE_CASE for constants

## Package.json Scripts

- All extraction scripts must be executed through package.json scripts
- Scripts that take parameters must use the prefix `extract:` followed by the
  parameter name
- Example: `"extract:config": "node src/index.js"`

## Github Workflows

- Each venue has a separate workflow file for automatically updating the
  documentation and raising a PR if anything has changed
- The workflow should run every day at 00:00 UTC
- Workflows must execute the extraction scripts using the package.json scripts
  with separate steps for each config file
- Example workflow command: `npm run extract:config`

## Puppeteer Scraping Rules

### Browser Launch Configuration

   - Always run in headless mode [`headless: 'new'`]
   - Disable sandbox features for container compatibility
     [`args: ['--no-sandbox']`]
   - Prevent memory issues by disabling shared memory usage
     [`args: ['--disable-dev-shm-usage']`]
   - Disable GPU acceleration as it's not needed for scraping
     [`args: ['--disable-gpu']`]
   - Use single process mode without zygote for simpler process management
     [`args: ['--single-process']`]
   - Skip first run and browser checks
     [`args: ['--no-first-run', '--no-zygote']`]
   - Disable all extensions and unnecessary features
     [`args: ['--disable-extensions', '--disable-component-extensions-with-background-pages']`]
   - Prevent background throttling and timer limitations
     [`args: ['--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows']`]
   - Disable client-side security features that aren't needed
     [`args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']`]
   - Use basic password store [`args: ['--password-store=basic']`]
   - Set reasonable timeout of 30 seconds [`timeout: 30000`]
   - Ignore HTTPS errors [`ignoreHTTPSErrors: true`]

### Page Configuration

- Set viewport to 1920x1080 resolution
- Use 30 second timeout for navigation
- Use 30 second timeout for other operations

### Resource Optimization

- Enable request interception
- Only allow essential resource types:
  - HTML documents
  - JavaScript files
  - XHR requests
  - Fetch requests
- Block unnecessary resources like images and fonts

### Error Handling

- Exit process on critical errors
- Log all errors with clear messages
- Include URL in error messages for debugging

### Performance Guidelines

- Add polite delays between requests
- Use proper cleanup for browser and page instances
- Implement proper error handling and resource cleanup

These rules should be applied when analyzing or generating Puppeteer-based web
scraping code for documentation extraction.

---

## Instruction Sources

This CLAUDE.md file consolidates instructions from the following files in the 
.github/instructions/ directory:

- `github-workflows.instructions.md` - GitHub workflow standards
- `javascript-standards.instructions.md` - JavaScript coding standards and error handling
- `project-structure.instructions.md` - Project structure and entry point requirements  
- `puppeteer.instructions.md` - Puppeteer scraping configuration and best practices

Any updates to project standards should be made in the respective instruction files
in .github/instructions/ and then consolidated into this CLAUDE.md file.
