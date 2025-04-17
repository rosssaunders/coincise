# HTX API Documentation Extractor

This project scrapes HTX API documentation pages and converts them to markdown format.

## Project Structure

```
htx/
├── config/                # Configuration files
│   └── spot/             # Spot API specific configurations
│       └── private_rest_api.json
├── src/
│   ├── index.js          # Main entry point
│   └── types.js          # Type definitions
├── output/               # Generated markdown files
├── package.json
└── README.md
```

## Dependencies

- puppeteer: ^24.6.1 - For web scraping
- turndown: ^7.1.2 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- jsdom: ^26.0.0 - For HTML parsing

## Usage

1. Install dependencies:
```bash
npm install
```

2. Run the scraper:
```bash
npm start
```

The script will:
1. Load the configuration from `config/spot/private_rest_api.json`
2. Visit each URL in the configuration
3. Extract the content from the specified div element
4. Convert the HTML to markdown
5. Save each page as a separate markdown file in the `output` directory

## Output

The generated markdown files will be saved in the `output` directory, with filenames based on the URL parameters. For example:
- `index.md` for the base URL
- `666.md` for `?id=666`
- etc.

## Notes

- The script uses Puppeteer in headless mode
- Each page is processed sequentially to avoid overwhelming the server
- The script includes error handling and logging
- The output directory is created automatically if it doesn't exist 