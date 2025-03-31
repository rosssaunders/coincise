# MEXC API Documentation Scraper

This tool scrapes the MEXC API documentation and converts it into a single markdown file. The documentation is split into different sections for public and private websocket and REST API data.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/rosssaunders/coincise.git
   cd coincise/tools/extraction/mexc
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

### Scrape API Documentation

To scrape the MEXC API documentation and save it to a markdown file, use the following command:
```sh
node index.js scrape <url> <output-file>
```
- `<url>`: The URL of the MEXC API documentation page to scrape.
- `<output-file>`: The path to the output markdown file.

Example:
```sh
node index.js scrape https://mexcdevelop.github.io/apidocs/spot_v3_en/ output.md
```

### Convert Authentication HTML to Markdown

To convert the authentication section HTML to a markdown table, use the following command:
```sh
node index.js convert-auth <input-file> [output-file]
```
- `<input-file>`: The path to the input HTML file containing the authentication section.
- `[output-file]` (optional): The path to the output markdown file. If not provided, the markdown table will be printed to the console.

Example:
```sh
node index.js convert-auth auth.html auth.md
```

### Convert Request Parameters HTML to Markdown

To convert the request parameters section HTML to a markdown table, use the following command:
```sh
node index.js convert-params <input-file> [output-file]
```
- `<input-file>`: The path to the input HTML file containing the request parameters section.
- `[output-file]` (optional): The path to the output markdown file. If not provided, the markdown table will be printed to the console.

Example:
```sh
node index.js convert-params params.html params.md
```

## Configuration

The tool uses configuration files to define the URLs for different sections of the MEXC API documentation. The configuration files are located in the `tools/extraction/mexc` directory.

### Public REST API

The `public_rest_api.json` file contains the URLs for the public REST API endpoints. The output directory and combined filename are also defined in this file.

### Private REST API

The `private_rest_api.json` file contains the URLs for the private REST API endpoints. The output directory and combined filename are also defined in this file.

### Public Websocket API

The `public_websocket_api.json` file contains the URLs for the public websocket API endpoints. The output directory and combined filename are also defined in this file.

### Private Websocket API

The `private_websocket_api.json` file contains the URLs for the private websocket API endpoints. The output directory and combined filename are also defined in this file.
