# Bybit API Documentation Generator

A JavaScript-based tool for generating comprehensive documentation for Bybit's V5 API endpoints.

## Features

- Generates documentation for all Bybit V5 API endpoints:
  - Public REST API
  - Private REST API
  - Public WebSocket API
  - Private WebSocket API
- Converts HTML documentation to Markdown format
- Maintains consistent formatting and structure
- Provides detailed logging of the generation process

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

## Usage

Run the documentation generator:
```bash
npm start
```

The generated documentation will be saved in the following locations:
- Public REST API: `bybit/v5/public_rest_api.md`
- Private REST API: `bybit/v5/private_rest_api.md`
- Public WebSocket API: `bybit/v5/public_websocket_api.md`
- Private WebSocket API: `bybit/v5/private_websocket_api.md`

## Configuration

The tool uses JSON configuration files located in `src/config/`:
- `public_rest.json`
- `private_rest.json`
- `public_websocket.json`
- `private_websocket.json`

Each configuration file contains:
- `endpoints`: Array of API endpoints to document
- `output_file`: Path where the documentation will be saved
- `title`: Title of the documentation

## Dependencies

- puppeteer: ^24.6.0 - For web scraping
- turndown: ^7.1.2 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - For GitHub Flavored Markdown support
- jsdom: ^26.0.0 - For DOM manipulation

## Project Structure

```
bybit-js/
├── src/
│   ├── main.js           # Entry point
│   ├── config/           # Configuration files
│   ├── processors/       # Documentation processors
│   └── utils/           # Utility functions
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 