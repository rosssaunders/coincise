---
applyTo: "**"
---

# Project Structure

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

# Package.json Scripts

- All extraction scripts must be executed through package.json scripts
- Scripts that take parameters must use the prefix `extract:` followed by the
  parameter name
- Example: `"extract:config": "node src/index.js"`

# Dependencies

Required dependencies for all extraction projects:

- turndown: ^7.1.2
- turndown-plugin-gfm: ^1.0.2

Optional dependencies must be justified in the project's README.md.

# Script Entry Point

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
