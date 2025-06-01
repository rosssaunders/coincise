# Bitmart API Documentation Extractor

This project extracts API documentation from Bitmart and converts it to markdown format.

## Features

- Extracts REST API endpoints from HTML documentation
- Organizes endpoints by section
- Converts HTML to Markdown with proper formatting
- Preserves code blocks with syntax highlighting
- Handles multiple API versions (v1, v2, v3, v4)

## Project Structure

```
bitmart/
├── config/
│   ├── spot.json            # Configuration for spot trading endpoints
│   ├── contract.json        # Configuration for contract trading endpoints
│   └── futures.json         # Configuration for futures trading endpoints
├── src/
│   └── index.js             # Main extraction script
├── package.json
└── README.md
```

## Dependencies

- turndown: ^7.2.0 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- jsdom: 26.1.0 - For HTML parsing
- puppeteer: ^24.8.0 - For web scraping and dynamic content extraction
- cheerio: ^1.0.0 - Server-side jQuery implementation for HTML parsing
- axios: ^1.9.0 - HTTP client for making requests

## Usage

1. Install dependencies:

```bash
npm install
```

2. Run all extractors:

```bash
npm start
```

3. Or run specific extractors:

```bash
# Extract Spot API endpoints
npm run extract:spot

# Extract Contract API endpoints  
npm run extract:contract

# Extract Futures API endpoints
npm run extract:futures
```

## Output Files

The extracted markdown will be saved to the following locations:

- Spot API: `../../docs/bitmart/spot_api.md`
- Contract API: `../../docs/bitmart/contract_api.md`
- Futures API: `../../docs/bitmart/futures_api.md`

## Configuration

Extraction settings can be modified in the respective configuration files in the `config/` directory. Each configuration file includes:

- `title`: Title for the markdown document
- `output_file`: Path where the markdown file will be saved (relative to docs/bitmart/)
- `base_url`: Base URL of the Bitmart API documentation
- `urls`: Array of URL paths to process for the documentation

## API Documentation Source

The scraper targets the official Bitmart API documentation at:
- Base URL: https://developer-pro.bitmart.com/en/

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT