# KuCoin API Documentation Extractor

This project downloads OpenAPI specifications from the KuCoin GitHub repository and converts them to Markdown format.

## Features

- Downloads REST API specifications for spot, futures, and margin
- Downloads WebSocket API specifications for spot and futures
- Converts OpenAPI JSON to well-formatted Markdown documents
- Organizes output in a structured directory hierarchy

## Dependencies

This project uses the following dependencies:

- puppeteer: For web scraping capabilities (required by project standards)
- turndown & turndown-plugin-gfm: For HTML to Markdown conversion (required by project standards)
- jsdom: For DOM manipulation (required by project standards)
- node-fetch: For making HTTP requests to download API specifications
- widdershins: For converting OpenAPI specifications to Markdown format

## Directory Structure

```
kucoin/
├── src/
│   ├── main.js           # Entry point
│   ├── types.js          # Type definitions
│   ├── config/           # Configuration files
│   │   └── config.js     # Main configuration
│   ├── processors/       # Data processing modules
│   │   ├── downloader.js # Downloads OpenAPI specs
│   │   └── converter.js  # Converts to Markdown
│   └── utils/            # Utility functions
│       └── fileUtils.js  # File operations
├── package.json
└── README.md
```

## Usage

To run the extraction process:

```bash
# Using default configuration
npm install
npm start

# Using custom configuration
npm install
node src/index.js -c /path/to/custom/config.json
```

## Configuration

The extractor uses a JSON configuration file that specifies:

- GitHub base URL for raw content
- API specification URLs for both REST and WebSocket endpoints
- Output directory for generated markdown files

### Default Configuration

The default configuration is stored in `config/config.json`.

### Custom Configuration

You can specify a custom configuration file using the `-c` or `--config` command-line argument:

```bash
node src/index.js -c /path/to/custom/config.json
```

The generated Markdown files will be placed in the `docs/kucoin` directory with the following structure:

```
docs/kucoin/
├── rest/
│   ├── spot_api.md
│   ├── futures_api.md
│   └── margin_api.md
└── ws/
    ├── spot_api.md
    └── futures_api.md
```
