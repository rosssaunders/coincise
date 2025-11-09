# Copilot Instructions for Coincise

## Project Overview

Coincise is a cryptocurrency exchange API documentation repository that scrapes, converts, and maintains LLM-friendly versions of API documentation from major crypto exchanges. Each exchange (called a "venue") has its own scraper project that extracts documentation and converts it to markdown format optimized for AI consumption.

## Quick Start

### Installation
```bash
npm install
```

### Common Commands
- Format code: `npm run format`
- Run extraction: `cd venues/{exchange-name} && npm run extract:config`
- Format docs: `./formatdocs.sh`
- Generate llms.txt: `./tools/llms/generate-llms-txt.sh`

## Repository Structure

```
coincise/
├── .github/          # GitHub Actions workflows and configurations
├── docs/             # Generated documentation (DO NOT EDIT DIRECTLY)
├── venues/           # Scraper projects for each exchange
│   ├── shared/       # Common utilities (puppeteer, turndown, etc.)
│   └── {exchange}/   # Individual exchange scrapers
├── tools/            # Utility scripts
├── AGENTS.md         # Detailed agent instructions
└── README.md         # Project documentation
```

## Critical Rules

### Documentation Files
**NEVER DIRECTLY MODIFY FILES IN `docs/`**
- Documentation files must ONLY be modified by extraction scripts
- You may READ these files but cannot WRITE or EDIT them
- All documentation changes must come from running extraction scripts in `venues/`
- If documentation needs updating, modify the extraction scripts instead

### Code Standards
- Use pure ES6 JavaScript only (no TypeScript)
- Use ES6 modules (`import`/`export`)
- Enable strict mode in all files
- Prefer synchronous calls over asynchronous when possible
- Use functional programming paradigms (avoid classes unless necessary)
- Use 2 spaces for indentation, semicolons required
- Maximum line length: 100 characters
- Use single quotes for strings
- Use camelCase for variables/functions, PascalCase for classes, UPPER_SNAKE_CASE for constants

### Error Handling
- All scripts must exit with non-zero code on errors for CI/CD
- Don't catch errors in code - let them propagate to main function
- Main function must print error and stack trace before exiting
- Use built-in `console` methods for logging

## Key Tasks

### Adding New Exchange Scrapers
1. Create venue directory under `venues/{exchange-name}/`
2. Follow the structure: `src/index.js`, `package.json`, `README.md`, optional `config/`
3. Use shared utilities from `venues/shared/` (puppeteer, turndown, format-markdown, utils)
4. Create GitHub Actions workflow in `.github/workflows/{exchange}-docs-update.yml`
5. Add extraction script to package.json with `extract:` prefix

### Modifying Existing Scrapers
1. Navigate to `venues/{exchange-name}/`
2. Edit scraper code in `src/`
3. Test extraction: `npm run extract:config`
4. Verify output in `docs/{exchange}/`
5. Format documentation: `./formatdocs.sh`

### Updating Dependencies
1. Update package.json with new dependencies
2. Run `npm install`
3. Test affected scrapers
4. Document dependency changes in commit message

## Puppeteer Best Practices

Always use shared utilities from `venues/shared/puppeteer.js`:
- `launchBrowser()` - Standardized headless browser configuration
- `configurePage()` - Optimized page settings with resource blocking

Browser configuration includes:
- Headless mode, container-compatible sandbox settings
- Resource optimization (blocks images, fonts)
- 30-second timeouts, 1920x1080 viewport

## Testing & Validation

1. Test scripts manually before deployment
2. Ensure scripts handle errors gracefully
3. Test with various input configurations
4. Verify each venue generates documentation without errors
5. Test GitHub Actions workflows locally with `act` if needed

## Workflow Files

Each venue has a GitHub Actions workflow that:
- Runs weekly (Saturday night/Sunday morning)
- Executes extraction scripts
- Creates PRs when documentation changes
- Named as `{venue}-docs-update.yml`

## Endpoint Documentation Format

All endpoint documentation must follow a consistent format. See `AGENTS.md` for complete specification.

### Key Requirements

**Heading Hierarchy:**
- H1 for title only (HTTP method + path)
- H2 for major sections (Description, Authentication, Request, Response)
- H3 for subsections (Parameters, Example)
- Never skip heading levels

**Parameter Tables:**
- Request parameters must include: Parameter, Type, Required, Description
- Response parameters must include: Parameter, Type, Description
- Use dot notation for nested fields (e.g., `data.orderId`)

**Code Blocks:**
- ALL JSON examples must use language tag: ` ```json `
- Never use untagged code blocks for JSON

**Rate Limits:**
- Document inline with weight/limits OR link to global rate_limits.md
- Always include rate limit information

**Required Sections:**
1. Title (H1) with HTTP method and path
2. Source link to original documentation
3. Description
4. Authentication status (Required/Not Required)
5. Rate limit information
6. HTTP Request section
7. Request Parameters (in GFM table)
8. Request Example
9. Response Parameters (in GFM table)
10. Response Example (with `json` tag)

## Additional Resources

- See `AGENTS.md` for comprehensive coding guidelines
- See `CLAUDE.md` for Claude-specific documentation
- See `README.md` for complete venue documentation table
- Each venue has specific requirements in its own `README.md`
- Follow [llms.txt specification](https://llmstxt.org/) for documentation structure

## Security

- Never commit API keys or credentials
- Use environment variables for sensitive data
- Validate all inputs and handle malformed data gracefully
