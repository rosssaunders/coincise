---
applyTo: "**"
---

# Puppeteer Scraping Rules

## Browser Launch Configuration

- Always run in headless mode [`headless: 'new'`]
- Disable sandbox features for container compatibility
  [`args: ['--no-sandbox']`]
- Prevent memory issues by disabling shared memory usage
  [`args: ['--disable-dev-shm-usage']`]
- Disable GPU acceleration as it's not needed for scraping
  [`args: ['--disable-gpu']`]
- Use single process mode without zygote for simpler process management
  [`args: ['--single-process']`]
- Skip first run and browser checks [`args: ['--no-first-run', '--no-zygote']`]
- Disable all extensions and unnecessary features
  [`args: ['--disable-extensions', '--disable-component-extensions-with-background-pages']`]
- Prevent background throttling and timer limitations
  [`args: ['--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows']`]
- Disable client-side security features that aren't needed
  [`args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']`]
- Use basic password store [`args: ['--password-store=basic']`]
- Set reasonable timeout of 30 seconds [`timeout: 30000`]
- Ignore HTTPS errors [`ignoreHTTPSErrors: true`]

## Page Configuration

- Set viewport to 1920x1080 resolution
- Use 30 second timeout for navigation
- Use 30 second timeout for other operations

## Resource Optimization

- Enable request interception
- Only allow essential resource types:
  - HTML documents
  - JavaScript files
  - XHR requests
  - Fetch requests
- Block unnecessary resources like images and fonts

## Error Handling

- Exit process on critical errors
- Log all errors with clear messages
- Include URL in error messages for debugging

## Performance Guidelines

- Add polite delays between requests
- Use proper cleanup for browser and page instances
- Implement proper error handling and resource cleanup

These rules should be applied when analyzing or generating Puppeteer-based web
scraping code for documentation extraction.
