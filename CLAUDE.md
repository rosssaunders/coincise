# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run scrape:binance` - Run Binance documentation scraper
- `npm run format` - Format all JavaScript files with Prettier
- Run individual venue: `cd venues/[venue] && npm run start`
- Run single test: `node venues/[venue]/test/[test-file].js`
- For venue with run.sh: `cd venues/[venue] && ./run.sh`

## Code Style
- Use ES6 modules (import/export) with .js extension
- Strict mode in all files
- Use 2 spaces for indentation
- 100 character line limit
- Use semicolons (except in .prettierrc config)
- Single quotes for strings
- camelCase for variables/functions
- PascalCase for classes
- UPPER_SNAKE_CASE for constants

## Project Structure
Each venue extractor follows this structure:
- config/ - Configuration files
- src/
  - index.js - Entry point
  - types.js - Type definitions
  - processors/ - Data processing modules
  - utils/ - Utility functions

## Dependencies
- puppeteer: For browser automation
- turndown: HTML to Markdown conversion
- jsdom: DOM manipulation
- Avoid adding unnecessary dependencies