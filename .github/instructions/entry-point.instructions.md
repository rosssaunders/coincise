---
applyTo: "**/*.js"
---

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
