# HTX API Documentation Extractor

This project scrapes HTX API documentation pages and converts them to markdown format optimized for LLM consumption.

## Project Structure

```
htx/
├── config/                # Legacy configuration files (optional)
│   ├── spot/             # Spot API configurations
│   ├── usdtm/            # USDT-M Futures configurations
│   └── coinm/            # Coin-M Futures configurations
├── src/
│   ├── extractGeneral.js  # Extract core documentation sections
│   ├── extractEndpoints.js # Extract individual endpoint documentation
│   ├── index.js          # Legacy config-based extractor
│   └── types.js          # Type definitions
├── package.json
└── README.md
```

## Dependencies

- puppeteer: ^24.22.0 - For web scraping
- turndown: ^7.2.1 - For HTML to Markdown conversion
- turndown-plugin-gfm: ^1.0.2 - GitHub Flavored Markdown support
- jsdom: 27.0.0 - For HTML parsing
- prettier: 3.6.2 - For markdown formatting

## Usage

### Standardized Extraction (Recommended)

1. Install dependencies:
```bash
npm install
```

2. Install shared dependencies:
```bash
cd ../shared && npm install && cd ../htx
```

3. Extract core documentation:
```bash
npm run extract:general
```

This extracts 6 core documentation files:
- `rate_limits.md` - API rate limiting information
- `authentication.md` - Authentication and API key setup
- `network_connectivity.md` - Base URLs and connectivity info
- `error_codes.md` - Error codes and descriptions
- `response_formats.md` - Response format standards
- `change_log.md` - API changelog

4. Extract individual endpoints:
```bash
npm run extract:endpoints
```

This extracts individual endpoint documentation to:
- `docs/htx/endpoints/public/` - Public endpoints (no auth required)
- `docs/htx/endpoints/private/` - Private endpoints (auth required)

5. Extract all documentation:
```bash
npm run extract:all
```

### Legacy Config-Based Extraction

The original config-based extraction is still available:

```bash
# Spot API
npm run privaterestspot
npm run publicrestspot
npm run privatewebsocketspot
npm run publicwebsocketspot
npm run fixspot

# USDT-M Futures
npm run privaterestusdtm
npm run publicrestusdtm
npm run privatewebsocketusdtm
npm run publicwebsocketusdtm

# Coin-M Futures
npm run privaterestcoinm
npm run publicrestcoinm

# Run all legacy extractions
npm run runall
```

## Output

### Standardized Output

- Core documentation: `docs/htx/*.md`
- Endpoints: `docs/htx/endpoints/{public|private}/*.md`

### Legacy Output

- Combined API documentation: `docs/htx/{spot|usdtm|coinm}/*.md`

## Implementation Notes

### HTX Documentation Structure

- **Base URL**: https://www.htx.com/en-us/opend/newApiPages/
- **Framework**: Ant Design component system
- **Navigation**: Menu items identified by numeric IDs (categories) and GUIDs (endpoints)
- **Content Container**: `div.newApiPages_posR__RKd5D.newApiPages_posDetail__SmN2h`

### Extraction Process

1. **General Documentation**:
   - Navigates to base URL
   - Waits for Ant Design menu to load (`ul#sliderMenu.ant-menu`)
   - Clicks specific numeric menu IDs to load content
   - Extracts and converts HTML to Markdown

2. **Endpoints**:
   - Scans all menu items for GUID-formatted keys (contains hyphens)
   - Clicks each endpoint menu item
   - Extracts endpoint content including tables and JSON examples
   - Determines public/private classification based on authentication requirements
   - Generates filenames: `{method}_{endpoint_path}.md`

### Authentication Detection

Endpoints are classified as private if content contains:
- API key references (`api-key`, `apikey`, `accesskey`)
- Signature requirements
- Timestamp parameters
- Category names suggesting private access (account, trading, order, wallet)

Otherwise classified as public.

## Troubleshooting

### HTX Website Access Issues

The HTX website may implement anti-bot measures that can cause 403 errors or timeout issues. If extractions fail:

1. Check if the website is accessible in a regular browser
2. Verify the selectors haven't changed (menu structure, content containers)
3. Try increasing timeout values
4. Run during off-peak hours when servers are less loaded
5. Check GitHub Actions workflows for successful runs

### Common Issues

- **Timeout waiting for menu**: HTX site may be slow to load or blocking access
- **403 errors**: Site anti-bot protection may be active
- **Missing content**: Content selectors may have changed; check HTML structure
- **Incorrect classification**: Public/private detection may need tuning based on new patterns

## Notes

- The standardized extraction follows the pattern used by Backpack, Deribit, and XT venues
- Each page is processed sequentially with delays to avoid overwhelming the server
- The script uses headless Puppeteer with specific user agent for compatibility
- JSON examples are extracted via clipboard API when available
- All markdown files are formatted with Prettier for consistency 