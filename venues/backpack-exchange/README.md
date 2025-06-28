# Backpack Exchange API Documentation Generator

This project extracts and converts Backpack Exchange's OpenAPI specification to markdown documentation.

## Overview

The script navigates to the Backpack Exchange documentation site and attempts to extract their OpenAPI specification. If found, it converts the spec to readable markdown documentation. If not found, it extracts general documentation from the site.

## Dependencies

- **turndown**: ^7.1.2 - Converts HTML to Markdown
- **turndown-plugin-gfm**: ^1.0.2 - GitHub Flavored Markdown support
- **puppeteer**: ^24.8.0 - Web scraping and automation

## Usage

```bash
npm run extract:config
```

## Output

The script generates documentation in the following locations:

- `config/openapi-spec.json` - Raw OpenAPI specification (if found)
- `docs/backpack/api_documentation.md` - Converted markdown documentation
- `docs/backpack/general_documentation.md` - General site documentation (fallback)

## Automation

This project runs automatically via GitHub Actions:

- Weekly on Saturday nights (Sunday morning)
- Manual triggering available
- Creates PRs when documentation changes are detected
