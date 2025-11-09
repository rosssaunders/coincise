# AGENTS.md

This file provides guidance to AI coding agents when working with code in this
repository.

## Project Overview

Coincise is a cryptocurrency exchange API documentation repository that scrapes,
converts, and maintains LLM-friendly versions of API documentation from major
crypto exchanges. Each exchange (called a "venue") has its own scraper project
that extracts documentation and converts it to markdown format optimized for AI
consumption.

## Common Commands

### Installation

```bash
pnpm install
```

### Run Documentation Extraction

Each venue has its own extraction script. Binance Spot example:

```bash
cd venues/binancespot
pnpm run extract:config
```

### Format Documentation

```bash
./formatdocs.sh
```

### Generate llms.txt

```bash
./tools/llms/generate-llms-txt.sh

# Preview without writing
./tools/llms/generate-llms-txt.sh --dry-run

# Verbose output
./tools/llms/generate-llms-txt.sh --verbose
```

### Code Formatting

```bash
pnpm run format
```

### Linting

ESLint configuration is in \`eslint.config.js\`

## Architecture

### Venue Structure

Each exchange lives under \`venues/\` and follows a standardized structure:

```
venues/{exchange-name}/
├── config/          # JSON configuration files (if needed)
├── src/
│   ├── index.js     # Main entry point
│   └── ...          # Supporting files
├── package.json
└── README.md
```

### Shared Utilities

Common functionality is centralized in \`venues/shared/\`:

- \`puppeteer.js\` - Browser automation with standardized Puppeteer
  configuration
- \`turndown.js\` - HTML to Markdown conversion utilities
- \`format-markdown.js\` - Markdown formatting utilities
- \`utils.js\` - General utility functions

### Documentation Output

Generated documentation is stored in `docs/{exchange}/` following the target
structure defined in the Documentation Standards section below. Each exchange
should have the core files (rate_limits.md, authentication.md,
network_connectivity.md, error_codes.md, response_formats.md, change_log.md) and
an endpoints/ folder with public/ and private/ subfolders containing individual
endpoint documentation files.

### Processing Patterns

**Simple Venues** (e.g., Binance Spot):

- Single \`src/index.js\` file
- Takes config file path as CLI argument
- Uses shared Puppeteer and Turndown utilities
- Direct HTML extraction and conversion

**Complex Venues** (e.g., Bybit):

- Modular processor architecture:
  - \`publicRestProcessor.js\`
  - \`privateRestProcessor.js\`
  - \`publicWebsocketProcessor.js\`
  - \`privateWebsocketProcessor.js\`
- Base processor class for common functionality
- Each processor handles a specific API category

### Automation

GitHub Actions workflows in \`.github/workflows/\` automatically:

- Run weekly (Saturday night/Sunday morning)
- Execute extraction scripts for each venue
- Create PRs when documentation changes are detected
- Workflow naming pattern: \`{venue}-docs-update.yml\`

### Testing GitHub Actions Locally

**Using act to test workflows before pushing**

[act](https://github.com/nektos/act) is a tool that allows you to run GitHub
Actions locally using Docker. This enables testing workflow changes without
committing and pushing to GitHub.

**Installation (macOS):**

```bash
brew install act
```

**Basic Usage:**

```bash
# List all workflows
act -l

# List workflows for a specific file
act -W .github/workflows/bullish-docs-update.yml -l

# Dry run a specific workflow
act -W .github/workflows/bullish-docs-update.yml -j update-docs --dryrun

# Run a specific workflow (on Apple Silicon, use --container-architecture flag)
act -W .github/workflows/bullish-docs-update.yml -j update-docs --container-architecture linux/amd64
```

**Configuration:**

Create \`~/Library/Application Support/act/actrc\` to configure default
settings:

```
-P ubuntu-latest=catthehacker/ubuntu:act-latest
```

**Important Notes:**

- act uses Docker to simulate GitHub Actions runners
- Choose the medium image (~500MB) for most workflows - it includes necessary
  tools and is compatible with most actions
- On Apple Silicon Macs, use \`--container-architecture linux/amd64\` flag to
  ensure compatibility
- Git operations in worktrees may have limitations when run via act
- The main value of act is testing the core workflow logic (dependency
  installation, script execution) before pushing

**Testing Workflow Changes:**

Before committing workflow changes:

1. Make your changes to \`.github/workflows/{workflow}.yml\`
2. Test with act: \`act -W .github/workflows/{workflow}.yml -j {job-name}
   --container-architecture linux/amd64\`
3. Verify all steps complete successfully (git operations may fail in act but
   work in GitHub)
4. Commit and push once the core logic is validated

## Code Style

### JavaScript Standards

- Use pure ES6 JavaScript only
- No TypeScript or other transpiled languages
- All files must use \`.js\` extension
- Use ES6 modules (\`import\`/\`export\`)
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

### Formatting

- Use 2 spaces for indentation
- Use semicolons
- Maximum line length: 100 characters
- Use single quotes for strings
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_SNAKE_CASE for constants

## Dependencies

Required dependencies for all extraction projects:

- turndown: ^7.1.2
- turndown-plugin-gfm: ^1.0.2

Optional dependencies must be justified in the project's README.md.

## Script Entry Point

All scripts must use the following pattern for handling entry points:

```javascript
// Only run main() if this is the main module
if (import.meta.url === \`file://\${process.argv[1]}\`) {
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
  function
- The main function must always print the error and its stack trace to the
  console before exiting

## Logging Standards

- Use the built-in \`console\` methods for logging throughout the codebase
- Prefer \`console.error\` for error reporting with descriptive messages
- Always log both the error object and its stack trace when catching errors:
  \`\`\`javascript console.error("Error description:", error)
  console.error("Stack trace:", error.stack) \`\`\`
- Include relevant context in error messages (e.g., URL, file path, operation
  name)
- Use \`console.warn\` for important but non-fatal issues
- Use \`console.info\` or \`console.log\` for standard operational messages
- Avoid third-party logging libraries unless there is a specific justified need
- If using a custom logger utility, it should be simple and wrap console methods
- Ensure all log messages are clear, concise, and meaningful for debugging

## Package.json Scripts

- All extraction scripts must be executed through package.json scripts
- Scripts that take parameters must use the prefix \`extract:\` followed by the
  parameter name
- Example: \`"extract:config": "node src/index.js"\`

## GitHub Workflows

- Each venue has a separate workflow file for automatically updating the
  documentation and raising a PR if anything has changed
- The workflow should run weekly at midnight on Saturday night / Sunday morning
- Workflows must execute the extraction scripts using the package.json scripts
- Example workflow command: \`pnpm run extract:config\`

## Puppeteer Scraping Rules

### Browser Launch Configuration

- Always run in headless mode [\`headless: 'new'\`]
- Disable sandbox features for container compatibility [\`args:
  ['--no-sandbox']\`]
- Prevent memory issues by disabling shared memory usage [\`args:
  ['--disable-dev-shm-usage']\`]
- Disable GPU acceleration as it's not needed for scraping [\`args:
  ['--disable-gpu']\`]
- Use single process mode without zygote for simpler process management [\`args:
  ['--single-process']\`]
- Skip first run and browser checks [\`args: ['--no-first-run',
  '--no-zygote']\`]
- Disable all extensions and unnecessary features [\`args:
  ['--disable-extensions',
  '--disable-component-extensions-with-background-pages']\`]
- Prevent background throttling and timer limitations [\`args:
  ['--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows']\`]
- Disable client-side security features that aren't needed [\`args:
  ['--disable-web-security',
  '--disable-features=IsolateOrigins,site-per-process']\`]
- Use basic password store [\`args: ['--password-store=basic']\`]
- Set reasonable timeout of 30 seconds [\`timeout: 30000\`]
- Ignore HTTPS errors [\`ignoreHTTPSErrors: true\`]

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

### Shared Puppeteer Utilities

The shared Puppeteer launcher (\`venues/shared/puppeteer.js\`) provides
standardized browser configuration:

- Headless mode with \`headless: 'new'\`
- Container-compatible sandbox settings
- Resource optimization (blocks images, fonts)
- 30-second timeouts
- 1920x1080 viewport

Always use \`launchBrowser()\` and \`configurePage()\` from shared utilities.

## Extraction Script Readability

- Write each extraction script so that any human can easily read and understand
  it
- Make scripts simple to change and adapt quickly, even if this means the code
  is less organized or structured

## Documentation Standards

All venue documentation must be structured into a semi-structured format to
ensure consistent organization and LLM-friendly chunking. The goal is to make it
easy for downstream LLMs to consume exchange documentation without requiring
complete normalization.

### Target Documentation Structure

\`\`\`text docs/{exchange}/ ├── rate_limits.md # Rate limiting rules, tiers, and
policies ├── authentication.md # API key generation, request signing, headers
├── network_connectivity.md # Connection info, endpoints, WebSocket details ├──
error_codes.md # Error code definitions and troubleshooting ├──
response_formats.md # Standard response structures and formats ├──
change_log.md # API version history and breaking changes │ └── endpoints/ ├──
public/ │ ├── get_ticker.md │ ├── get_orderbook.md │ ├── get_recent_trades.md │
├── get_klines.md │ ├── get_24hr_stats.md │ └── ... # Filename matches the
endpoint path/function │ └── private/ ├── post_order.md ├── delete_order.md ├──
get_order.md ├── get_orders.md ├── get_balance.md ├── get_positions.md ├──
post_withdraw.md ├── get_deposit_address.md └── ... # Filename matches the
endpoint path/function \`\`\`

### Core Documentation Files

#### 1. rate_limits.md

- Rate limit tiers and specifications
- IP-based vs API key-based limits
- Rate limit headers and responses
- Best practices for handling limits
- Recovery mechanisms

#### 2. authentication.md

- API key generation and management
- Request signing algorithms (HMAC, RSA, etc.)
- Required headers and parameters
- Authentication examples
- Common errors and troubleshooting

#### 3. network_connectivity.md

- REST API base URLs (production, testnet)
- WebSocket connection endpoints
- Connection requirements and recommendations
- Ping/pong mechanisms
- Reconnection strategies
- Network error handling

#### 4. error_codes.md

- Complete list of error codes
- Error code meanings and descriptions
- Common causes for each error
- Recommended remediation steps
- HTTP status code mappings

#### 5. response_formats.md

- Standard response structure and envelope
- Success response format
- Error response format
- Pagination formats
- Data type conventions
- Timestamp formats and timezone handling

#### 6. change_log.md

- API version history
- Breaking changes and deprecations
- New features and endpoints
- Migration guides between versions
- Scheduled changes and EOL announcements

#### 7. endpoints/

- Each file corresponds to a specific endpoint
- Filename format: \`{http*method}*{endpoint_name}.md\`
  - Example: \`get_ticker.md\`, \`post_order.md\`, \`delete_order.md\`
- Public endpoints in \`public/\` subfolder
- Private endpoints in \`private/\` subfolder

### Endpoint File Format Specification

All endpoint documentation files must follow this standardized format to ensure
consistency for both human readers and LLM consumption.

#### Required Structure

Each endpoint file MUST contain the following sections in this order:

1. **Title (H1)** - HTTP Method and endpoint path
2. **Source Link** - Link to original API documentation
3. **Description** - Clear explanation of endpoint functionality
4. **Authentication** - Whether authentication is required
5. **Rate Limit** - Rate limiting information
6. **HTTP Request** - HTTP method and path
7. **Request Parameters** - All request parameters in table format
8. **Request Example** - Example request(s)
9. **Response Parameters** - All response fields in table format
10. **Response Example** - Example response(s)
11. **Error Responses** (if applicable) - Common errors
12. **Notes** (if applicable) - Additional information

#### Formatting Rules

**1. Heading Hierarchy**

- Use H1 (`#`) for the main title only
- Use H2 (`##`) for major sections (Description, Authentication, Request,
  Response, etc.)
- Use H3 (`###`) for subsections (Parameters, Example, Success Response, etc.)
- Use H4 (`####`) or deeper only when absolutely necessary for nested content
- Maintain consistent heading levels throughout the document
- Never skip heading levels (e.g., don't go from H2 to H4)

**2. Parameter Tables**

All request and response parameters MUST be documented using GitHub Flavored
Markdown tables with the following columns:

For **Request Parameters**:

```markdown
| Parameter | Type    | Required | Description                                 |
| --------- | ------- | -------- | ------------------------------------------- |
| symbol    | string  | Yes      | Trading pair (e.g., BTCUSDT)                |
| limit     | integer | No       | Number of results (default: 100, max: 1000) |
```

For **Response Parameters**:

```markdown
| Parameter    | Type   | Description                                     |
| ------------ | ------ | ----------------------------------------------- |
| code         | string | Response code (00000 for success)               |
| data         | object | Response data object                            |
| data.orderId | string | Unique order identifier                         |
| data.status  | string | Order status (e.g., FILLED, PARTIAL, CANCELLED) |
```

**Table Guidelines:**

- Use consistent column alignment separators (`| --- |`)
- Use dot notation for nested fields (e.g., `data.orderId`)
- Include type information (string, integer, boolean, object, array)
- Specify if parameter is required/optional (for requests)
- Include default values and constraints where applicable
- Use descriptive text in the Description column
- For enums, list possible values in the description

**3. JSON Code Blocks**

All JSON examples MUST be tagged with the language identifier:

````markdown
```json
{
  "code": "00000",
  "msg": "success",
  "data": {
    "orderId": "123456789",
    "symbol": "BTCUSDT",
    "status": "FILLED"
  }
}
```
````

**Never use untagged code blocks for JSON:**

```markdown
❌ BAD: \`\`\` {"code": "00000"} \`\`\`

✅ GOOD: \`\`\`json {"code": "00000"} \`\`\`
```

**4. Rate Limit Documentation**

Rate limits should be documented in one of two ways:

**Option 1: Inline Section**

```markdown
## Rate Limit

**Weight:** 1

**Rate Limit Rule:** IP-based

**Limits:**

- 1200 requests per minute per IP
- 10 orders per second per account
```

**Option 2: Link to Global Documentation**

```markdown
## Rate Limit

**Weight:** 5

See [Rate Limits](/docs/{exchange}/rate_limits.md) for complete rate limiting
rules.
```

Choose the approach that best fits the venue's documentation structure. Use
inline documentation for simple, endpoint-specific limits. Use links for complex
rate limiting systems that apply across multiple endpoints.

**5. Authentication Section**

Clearly indicate authentication requirements:

```markdown
## Authentication

Required (Private Endpoint)

API Key Permissions: This endpoint requires the "trade" permission.
```

Or:

```markdown
## Authentication

Not Required (Public Endpoint)
```

#### Complete Endpoint Template

\`\`\`\`markdown

# {HTTP_METHOD} {endpoint_path}

**Source:** [Original Documentation Title](https://original-url.com)

## Description

Clear, concise description of what this endpoint does and when to use it.
Include any important behavioral notes or prerequisites.

## Authentication

Required/Not Required (Private/Public Endpoint)

Additional authentication details if needed (API key permissions, scopes, etc.)

## Rate Limit

**Weight:** {weight_value}

**Rate Limit Rule:** {IP/UID/API_Key}

Inline rate limit details OR link to global rate limit documentation.

## HTTP Request

\`{HTTP_METHOD} {endpoint_path}\`

## Request Parameters

### Path Parameters

| Parameter | Type | Required | Description                  |
| --------- | ---- | -------- | ---------------------------- |
| paramName | type | Yes/No   | Description with constraints |

### Query Parameters

| Parameter | Type | Required | Description                  |
| --------- | ---- | -------- | ---------------------------- |
| paramName | type | Yes/No   | Description with constraints |

### Body Parameters

| Parameter | Type | Required | Description                  |
| --------- | ---- | -------- | ---------------------------- |
| paramName | type | Yes/No   | Description with constraints |

## Request Example

\`\`\`http GET /api/v1/endpoint?param=value HTTP/1.1 Host: api.exchange.com
X-API-Key: your-api-key \`\`\`

Or for cURL:

\`\`\`bash curl -X GET "https://api.exchange.com/api/v1/endpoint?param=value" \\
-H "X-API-Key: your-api-key" \`\`\`

## Response Parameters

| Parameter            | Type    | Description                 |
| -------------------- | ------- | --------------------------- |
| code                 | string  | Response code               |
| message              | string  | Response message            |
| data                 | object  | Response data container     |
| data.field1          | string  | Description of field1       |
| data.field2          | integer | Description of field2       |
| data.nested          | object  | Nested object description   |
| data.nested.subfield | string  | Description of nested field |

## Response Example

### Success Response (200 OK)

\`\`\`json { "code": "00000", "message": "success", "data": { "field1":
"value1", "field2": 12345, "nested": { "subfield": "nested_value" } } } \`\`\`

### Error Response (4xx/5xx)

\`\`\`json { "code": "40001", "message": "Invalid parameter", "data": null }
\`\`\`

## Error Codes

Common error codes for this endpoint:

| Code  | Message               | Description                        |
| ----- | --------------------- | ---------------------------------- |
| 40001 | Invalid parameter     | One or more parameters are invalid |
| 40003 | Authentication failed | API key is invalid or missing      |
| 42001 | Insufficient balance  | Account balance too low            |

See [Error Codes](/docs/{exchange}/error_codes.md) for complete error code
reference.

## Notes

- Additional important information
- Edge cases and special behaviors
- Best practices and recommendations
- Warnings about deprecated features

\`\`\` <!-- End of markdown template --> \`\`\`\`

#### Format Validation Checklist

Before committing endpoint documentation, verify:

- [ ] Title uses H1 with HTTP method and path
- [ ] Source link is present and valid
- [ ] Heading hierarchy is correct (H1 → H2 → H3, no skipped levels)
- [ ] All parameters documented in GFM tables
- [ ] Request parameters include Required column
- [ ] Response parameters use dot notation for nested fields
- [ ] All JSON blocks tagged with \`\`\`json
- [ ] Rate limit documented (inline or linked)
- [ ] Authentication requirements clearly stated
- [ ] At least one request example provided
- [ ] At least one response example provided
- [ ] Error responses documented (if applicable)
- [ ] No untagged code blocks
- [ ] Tables properly formatted with alignment separators

#### Examples

See [Endpoint Format Examples](.github/examples/endpoint-format-example.md) for
complete examples showing correct and incorrect formatting patterns.

### Documentation Guidelines

- Each file should focus on a single functional area
- Keep files under 1000 lines for optimal LLM processing
- Include comprehensive examples for each endpoint/stream
- Maintain consistent formatting across all venues
- Use clear, descriptive filenames that match endpoint functionality
- Filename patterns should be obvious and predictable
- Semi-structured approach maintains flexibility while providing consistency

## Testing

- All scripts should be tested manually before deployment
- Ensure scripts handle errors gracefully and provide meaningful error messages
- Test with various input configurations to ensure robustness
- Each venue should successfully generate documentation without errors
- Verify GitHub Actions workflows run correctly

## llms.txt Specification

The repository follows [llms.txt specification](https://llmstxt.org/) to provide
structured overview of all API documentation for LLMs.

## Security Considerations

- Never commit API keys or sensitive credentials to the repository
- Use environment variables for configuration that might contain sensitive data
- Validate all inputs and handle malformed data gracefully

## Additional Resources

- README.md contains the complete venue documentation table
- Each venue may have specific requirements in its own README.md
