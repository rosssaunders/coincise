# OKX API Documentation Extractor

A tool for extracting and converting OKX API documentation into markdown format.

## Project Structure

```
okx/
├── src/
│   ├── main.js           # Entry point
│   └── types.js          # Type definitions
├── config.json           # Configuration file
├── package.json          # Project dependencies
└── README.md            # This file
```

## Dependencies

- puppeteer: ^24.6.0 - For web scraping
- turndown: ^7.1.2 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - For GitHub Flavored Markdown support
- jsdom: ^26.0.0 - For HTML parsing

## Configuration

The `config.json` file contains the following structure:

```json
{
  "url": "https://www.okx.com/docs-v5/en/#overview",
  "configs": {
    "Configuration Name": {
      "sections": [
        {
          "h1_match": "pattern",
          "h2_match": "pattern",
          "h3_matches": ["pattern1", "pattern2"],
          "include_h2_html": true
        }
      ],
      "output_file": "path/to/output.md"
    }
  }
}
```

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the extractor:
   ```bash
   npm start
   ```

The tool will:
1. Fetch the documentation page
2. Extract sections based on the configuration
3. Convert the content to markdown
4. Save the results to the specified output files

## Features

- Extracts documentation sections based on H1, H2, and H3 headings
- Converts HTML content to GitHub Flavored Markdown
- Supports multiple output configurations
- Maintains the original documentation structure
- Handles nested sections and content hierarchy 