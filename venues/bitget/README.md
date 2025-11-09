# Bitget API Documentation Extractor

This project extracts API documentation from Bitget and converts it to markdown
format, creating separate files for each documentation page.

## Features

- Extracts REST API documentation from Bitget's documentation site
- Converts HTML to Markdown with proper formatting
- Creates separate markdown files for each documentation page
- Preserves code blocks with syntax highlighting
- Organizes output by API category (common, spot, futures, etc.)

## Project Structure

```
bitget/
├── config/
│   ├── common.json       # Configuration for common API endpoints
│   ├── spot.json         # Configuration for spot trading endpoints
│   ├── future.json       # Configuration for futures trading endpoints
│   └── change_log.json   # Configuration for change log
├── src/
│   └── index.js          # Main extraction script
├── package.json
└── README.md
```

## Dependencies

- turndown: ^7.2.0 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- puppeteer: ^24.22.0 - For web scraping and dynamic content extraction
- cheerio: ^1.1.2 - Server-side jQuery implementation for HTML parsing
- jsdom: 27.0.0 - For HTML parsing

## Usage

1. Install dependencies:

```bash
pnpm install
```

2. Run specific extractors:

```bash
# Extract Common API documentation
pnpm run extract:common

# Extract Spot API documentation
pnpm run extract:spot

# Extract Futures API documentation
pnpm run extract:future

# Extract Change Log
pnpm run extract:change_log
```

## Output Structure

The extracted markdown files are organized by category:

```
docs/bitget/
├── common/
│   ├── intro.md
│   ├── quick-start.md
│   ├── faq.md
│   └── ... (one file per URL in config)
├── spot/
│   ├── intro.md
│   ├── symbol.md
│   └── ... (one file per URL in config)
├── future/
│   ├── intro.md
│   ├── market.md
│   └── ... (one file per URL in config)
└── change_log.md
```

Each URL in the configuration is extracted into its own markdown file, named
based on the URL path (excluding the category prefix).

## Configuration

Each configuration file in the `config/` directory includes:

- `title`: Title for the extraction run
- `base_url`: Base URL of the Bitget API documentation
- `urls`: Array of URL paths to process
- `output_dir`: Directory where markdown files will be saved

### Example Configuration

```json
{
  "title": "Bitget Common API Documentation",
  "base_url": "https://www.bitget.com/api-doc",
  "urls": ["/common/intro", "/common/quick-start", "/common/faq"],
  "output_dir": "../../docs/bitget/common"
}
```

## API Documentation Source

The scraper targets the official Bitget API documentation at:

- Base URL: https://www.bitget.com/api-doc

## Recent Changes

### November 2024 - Restructured Output Format

- Changed from single large combined files to individual files per page
- Updated config format to use `output_dir` instead of `output_file`
- Improved file naming based on URL paths
- Added source URL tracking in each generated file
- Organized output into subdirectories by API category

This change aligns Bitget's extraction approach with other venues like Bitmart,
making the documentation more modular and easier to navigate.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
