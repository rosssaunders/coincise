# Crawl4AI Proof-of-Concept: Bitget Exchange Parser

This directory contains a proof-of-concept implementation comparing Puppeteer-based scraping with Crawl4AI for the Bitget exchange documentation parser.

## Quick Start

### 1. Install Dependencies

#### For Crawl4AI (Python)
```bash
# Create a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Crawl4AI
pip install crawl4ai

# Or use the requirements file
pip install -r requirements_crawl4ai.txt
```

#### For Current Implementation (Node.js)
```bash
npm install
```

### 2. Run the Parsers

#### Run the Crawl4AI POC
```bash
# From the project root
python venues/bitget/src/crawl4ai_poc.py venues/bitget/config/spot.json

# Output will be saved to: docs/bitget/spot_api_crawl4ai.md
```

#### Run the Original Puppeteer Version
```bash
# From the project root
node venues/bitget/src/index.js venues/bitget/config/spot.json

# Output will be saved to: docs/bitget/spot_api.md
```

### 3. Compare Results

```bash
# View the differences
diff docs/bitget/spot_api.md docs/bitget/spot_api_crawl4ai.md

# Or use a visual diff tool
code --diff docs/bitget/spot_api.md docs/bitget/spot_api_crawl4ai.md
```

## What's Included

### Files
- **`src/crawl4ai_poc.py`** - Crawl4AI-based implementation (~100 lines)
- **`src/index.js`** - Original Puppeteer implementation (226 lines)
- **`CRAWL4AI_COMPARISON.md`** - Detailed side-by-side comparison
- **`requirements_crawl4ai.txt`** - Python dependencies

### Config Files (Shared)
All implementations use the same config format:
- `config/spot.json` - Spot trading API endpoints
- `config/future.json` - Futures trading API endpoints
- `config/common.json` - Common/general API endpoints
- `config/change_log.json` - API changelog

## Testing All Configs

Test each config with both implementations to compare:

```bash
# Test all with Crawl4AI
for config in spot future common change_log; do
  python venues/bitget/src/crawl4ai_poc.py venues/bitget/config/${config}.json
done

# Test all with Puppeteer
for config in spot future common change_log; do
  node venues/bitget/src/index.js venues/bitget/config/${config}.json
done
```

## Key Differences

| Aspect | Puppeteer (Current) | Crawl4AI (POC) |
|--------|---------------------|----------------|
| **Lines of Code** | 226 | ~100 |
| **Setup Complexity** | High (manual browser config) | Low (one-line init) |
| **Markdown Quality** | Good | Excellent (LLM-optimized) |
| **Built-in Retry** | ❌ Manual implementation | ✅ Automatic |
| **Built-in Caching** | ❌ No | ✅ Yes (15-min cache) |
| **Dependencies** | 5 npm packages | 1 pip package |

## Expected Behavior

Both implementations should:
1. ✅ Scrape all URLs from the config file
2. ✅ Extract `.theme-doc-markdown.markdown` content
3. ✅ Drop heading levels by 1 (H1→H2, etc.)
4. ✅ Convert HTML to Markdown
5. ✅ Add source URL attribution
6. ✅ Save combined output to docs/bitget/

### Potential Differences
The Crawl4AI version may produce:
- **Cleaner markdown** (better formatting, less noise)
- **Better table rendering** (no custom rules needed)
- **Faster execution** (built-in browser pooling)
- **More consistent output** (heuristic-based filtering)

## Troubleshooting

### Crawl4AI Installation Issues

If you encounter Playwright installation errors:
```bash
# Install Playwright browsers manually
playwright install chromium
```

### Timeout Issues
Increase the timeout in the config:
```python
config = CrawlerRunConfig(
    page_timeout=60000,  # Increase to 60 seconds
    ...
)
```

### Selector Not Found
If the CSS selector doesn't match:
```python
# Update the selector in crawl4ai_poc.py
css_selector=".your-selector-here",
```

## Performance Metrics

### Expected Results (Spot Config - 64 URLs)

| Metric | Puppeteer | Crawl4AI | Notes |
|--------|-----------|----------|-------|
| **Total Time** | ~90-120s | ~80-100s | Crawl4AI has browser pooling |
| **Memory Usage** | ~300-400MB | ~250-350MB | Similar |
| **Output Size** | ~150-200KB | ~140-180KB | Crawl4AI removes more noise |
| **Success Rate** | 98-100% | 98-100% | Both are reliable |

## Next Steps

### If the POC is Successful:

1. **Validate Output Quality**
   - Compare markdown formatting
   - Check for missing content
   - Verify all endpoints are captured

2. **Test Edge Cases**
   - Network failures
   - Timeout scenarios
   - Invalid URLs in config

3. **Consider Migration**
   - Use Crawl4AI for new exchanges
   - Keep existing parsers as-is
   - Gradually migrate simple parsers

### If Issues Found:

1. **Document the Issues**
   - Missing content
   - Formatting problems
   - Performance issues

2. **Adjust Configuration**
   - Try different selectors
   - Tune timeout values
   - Enable verbose logging

3. **Hybrid Approach**
   - Use Crawl4AI for simple pages
   - Keep Puppeteer for complex interactions

## Contributing

If you improve the POC or find bugs:
1. Document your changes
2. Update this README
3. Add notes to CRAWL4AI_COMPARISON.md

## Further Reading

- [Crawl4AI Documentation](https://docs.crawl4ai.com/)
- [Crawl4AI GitHub](https://github.com/unclecode/crawl4ai)
- [Original Comparison Analysis](CRAWL4AI_COMPARISON.md)
