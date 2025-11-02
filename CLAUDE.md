# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Coincise is a cryptocurrency exchange API documentation repository that scrapes, converts, and maintains LLM-friendly versions of API documentation from major crypto exchanges. Each exchange (called a "venue") has its own scraper project that extracts documentation and converts it to markdown format optimized for AI consumption.

## Common Commands

### Installation
```bash
npm install
```

### Run Documentation Extraction
Each venue has its own extraction script. Binance Spot example:
```bash
cd venues/binancespot
npm run extract:config
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
npm run format
```

### Linting
ESLint configuration is in `eslint.config.js`

## Architecture

### Venue Structure
Each exchange lives under `venues/` and follows a standardized structure:
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
Common functionality is centralized in `venues/shared/`:
- `puppeteer.js` - Browser automation with standardized Puppeteer configuration
- `turndown.js` - HTML to Markdown conversion utilities
- `format-markdown.js` - Markdown formatting utilities
- `utils.js` - General utility functions

### Documentation Output
Generated documentation is stored in `docs/{exchange}/` organized by product type:
```
docs/binance/
├── spot/
│   ├── private_rest_api.md
│   ├── public_rest_api.md
│   ├── private_websocket_api.md
│   └── public_websocket_api.md
├── usdm/           # USDT-Margined Futures
├── coinm/          # Coin-Margined Futures
└── options/
```

### Processing Patterns

**Simple Venues** (e.g., Binance Spot):
- Single `src/index.js` file
- Takes config file path as CLI argument
- Uses shared Puppeteer and Turndown utilities
- Direct HTML extraction and conversion

**Complex Venues** (e.g., Bybit):
- Modular processor architecture:
  - `publicRestProcessor.js`
  - `privateRestProcessor.js`
  - `publicWebsocketProcessor.js`
  - `privateWebsocketProcessor.js`
- Base processor class for common functionality
- Each processor handles a specific API category

### Automation
GitHub Actions workflows in `.github/workflows/` automatically:
- Run weekly (Saturday night/Sunday morning)
- Execute extraction scripts for each venue
- Create PRs when documentation changes are detected
- Workflow naming pattern: `{venue}-docs-update.yml`

## Important Development Notes

### Code Style Requirements
- **Pure ES6 JavaScript only** - No TypeScript
- **ES6 modules** - Use `import`/`export`
- **Functional programming** - Avoid classes unless necessary
- **Error propagation** - Don't catch errors; let them bubble to main()
- Entry point pattern:
```javascript
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
```

### Puppeteer Configuration
The shared Puppeteer launcher (`venues/shared/puppeteer.js`) provides standardized browser configuration:
- Headless mode with `headless: 'new'`
- Container-compatible sandbox settings
- Resource optimization (blocks images, fonts)
- 30-second timeouts
- 1920x1080 viewport

Always use `launchBrowser()` and `configurePage()` from shared utilities.

### Documentation Standards
See AGENTS.md for detailed documentation structure requirements. Key points:
- Split documentation by functional area (authentication, rate limits, etc.)
- Keep files under 1000 lines for optimal LLM processing
- Use consistent markdown formatting across all venues
- Include comprehensive examples for each endpoint

### llms.txt Specification
The repository follows [llms.txt specification](https://llmstxt.org/) to provide structured overview of all API documentation for LLMs.

## Testing
- Scripts should be tested manually before deployment
- Each venue should successfully generate documentation without errors
- Verify GitHub Actions workflows run correctly

## Additional Resources
- Full coding standards and guidelines are in `AGENTS.md`
- README.md contains the complete venue documentation table
- Each venue may have specific requirements in its own README.md
