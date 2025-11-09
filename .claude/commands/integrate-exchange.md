---
description: Integrate a new cryptocurrency exchange into the documentation pipeline
argument-hint: [exchange-name] [docs-url]
---

You are tasked with integrating a new cryptocurrency exchange into the Coincise
documentation pipeline. This involves creating extraction scripts that scrape
the exchange's API documentation and convert it to the standardized LLM-friendly
format.

## Prerequisites Check

1. **Verify required tools are available:**
   - Playwright MCP must be available for exploring documentation structure
   - Node.js and npm must be installed
   - Puppeteer and Turndown dependencies will be installed per-venue

2. **Gather required information:**
   - Exchange name (e.g., "backpack", "kraken", "coinbase")
   - Documentation URL (the main API documentation page)
   - If not provided as arguments, ask the user for these details

## Steps to Follow

### 1. Explore Documentation Structure

**Use Playwright to analyze the documentation:**

- Navigate to the documentation URL using `mcp__playwright__browser_navigate`
- Take a snapshot using `mcp__playwright__browser_snapshot` to understand the
  structure
- Identify the following sections:
  - Rate limits documentation
  - Authentication/API key documentation
  - Network connectivity/endpoints documentation
  - Error codes documentation
  - Change log/version history
  - Endpoint documentation (REST API endpoints)
  - Response format documentation

**Ask the user to confirm:**

- Which sections are present in the documentation
- Whether the documentation uses a single-page or multi-page structure
- Whether endpoints are grouped by category (public/private) or listed together

**Special Case: Redocly Documentation Framework**

Many exchanges use Redocly for their API documentation (recognizable by
`data-section-id` attributes and expandable response sections). Redocly requires
special handling:

1. **Response schemas are hidden behind expandable buttons** - You must click
   buttons labeled "200 Success", "400", "500" etc. to reveal schema details

2. **DOM updates are asynchronous** - After clicking buttons, wait for DOM to
   update before extracting content

3. **Example: Expanding response buttons in Backpack**

```javascript
const expandResponseButtons = () => {
  const buttons = Array.from(document.querySelectorAll("button"))
  const responseButtons = buttons.filter(btn => {
    const text = btn.textContent
    return (
      /^\s*\d{3}\s/.test(text) &&
      (text.includes("Success") ||
        text.includes("error") ||
        text.includes("Error"))
    )
  })

  responseButtons.forEach(btn => {
    try {
      const isExpanded = btn.getAttribute("aria-expanded")
      if (isExpanded !== "true") {
        btn.click()
      }
    } catch (e) {
      console.error("Error clicking response button:", e)
    }
  })
}

// In your extraction logic:
const endpoints = await page.evaluate(async () => {
  expandResponseButtons()

  // CRITICAL: Wait for DOM to update after clicking
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Now extract with updated DOM...
  const results = { public: [], private: [] }
  // ... extraction logic
  return results
})
```

4. **Redocly uses `data-section-id` for navigation** - Use these attributes to
   locate endpoint sections:

```javascript
const operations = document.querySelectorAll("[data-section-id]")
```

### 2. Create Venue Folder Structure

**Create the venue directory:**

```bash
mkdir -p venues/{exchange-name}/src
mkdir -p venues/{exchange-name}/config
mkdir -p docs/{exchange-name}/endpoints/public
mkdir -p docs/{exchange-name}/endpoints/private
```

**Verify the structure was created correctly:**

```bash
ls -la venues/{exchange-name}
```

### 3. Write General Documentation Extraction Script

**Create `venues/{exchange-name}/src/extractGeneral.js`:**

This script should extract the following core documentation files:

- `rate_limits.md` - Rate limiting rules, tiers, and policies
- `authentication.md` - API key generation, request signing, headers
- `network_connectivity.md` - Connection info, endpoints, WebSocket details
- `error_codes.md` - Error code definitions and troubleshooting
- `response_formats.md` - Standard response structures and formats
- `change_log.md` - API version history and breaking changes

**Script requirements:**

- Use shared utilities from `venues/shared/puppeteer.js` and
  `venues/shared/turndown.js`
- Follow the pure ES6 JavaScript standards from CLAUDE.md
- Use the standard entry point pattern for error handling
- Export the main function for testing
- Write descriptive console logs for each step
- Handle errors properly by propagating them to main()

**Example structure:**

```javascript
import { launchBrowser, configurePage } from "../shared/puppeteer.js"
import { getTurndownService } from "../shared/turndown.js"
import { writeFile, ensureDir } from "../shared/utils.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = "{docs-url}"
const OUTPUT_DIR = path.join(__dirname, "../../docs/{exchange-name}")

const extractRateLimits = async (page, turndownService) => {
  // Navigate to rate limits section
  // Extract content
  // Convert to markdown
  // Return markdown content
}

const extractAuthentication = async (page, turndownService) => {
  // Similar pattern
}

// ... other extraction functions

const main = async () => {
  console.log(
    "Starting general documentation extraction for {exchange-name}..."
  )

  const browser = await launchBrowser()
  const page = await browser.newPage()
  await configurePage(page)

  const turndownService = getTurndownService()

  try {
    await ensureDir(OUTPUT_DIR)

    // Extract each section
    const rateLimits = await extractRateLimits(page, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "rate_limits.md"), rateLimits)

    const authentication = await extractAuthentication(page, turndownService)
    await writeFile(path.join(OUTPUT_DIR, "authentication.md"), authentication)

    // ... continue for other sections

    console.log("✅ General documentation extraction completed successfully")
  } finally {
    await browser.close()
  }
}

// Standard entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}

export { main }
```

**CRITICAL: Section Boundary Detection**

When extracting general documentation sections (authentication, rate limits,
changelog, etc.), you MUST implement proper boundary detection to prevent
over-extraction. Sections can "bleed" into adjacent content if boundaries aren't
detected.

**Common Over-extraction Issues (learned from Backpack):**

- `authentication.md` included the entire changelog and more (6,750 lines
  instead of 122)
- `change_log.md` included WebSocket streams documentation after the changelog

**Solution: Multiple Boundary Detection Strategies**

For each section extraction, check ALL of these boundary conditions:

1. **H1/H2 heading changes** - Stop when you encounter a major section change

2. **Link pattern detection** - Different sections use different href patterns:

```javascript
// Example: Stop changelog when API endpoints start
if (capturing && element.tagName === 'H2') {
  const firstLink = element.querySelector('a');
  if (firstLink && firstLink.getAttribute('href') &&
      firstLink.getAttribute('href').startsWith('#tag/')) {
    break; // Entered API endpoint sections
  }
}
```

3. **Section ID changes** - Check href attributes for section boundaries:

```javascript
// Example: Stop authentication when section changes
const link = element.querySelector('a[href]');
if (link) {
  const href = link.getAttribute('href');
  if (href && !href.includes('Authentication') && href.startsWith('#section/')) {
    break; // Left authentication section
  }
}
```

4. **Text pattern matching** - Check for known section names:

```javascript
if (capturing && (element.tagName === 'H1' || element.tagName === 'H2')) {
  const text = element.textContent.toLowerCase();
  if (text.includes('changelog') ||
      text.includes('public endpoints') ||
      text.includes('streams') ||
      text.includes('websocket')) {
    break; // Entered a different major section
  }
}
```

**Best Practice:** Combine multiple strategies for robust boundary detection.
Always verify extracted file sizes - if a core file is >1000 lines, you probably
have over-extraction.

### 4. Write Endpoint Extraction Script

**Create `venues/{exchange-name}/src/extractEndpoints.js`:**

This script should extract individual endpoint documentation into the
`/endpoints` directory following the naming convention:
`{http_method}_{endpoint_name}.md`

**Script requirements:**

- Extract each endpoint into a separate file
- Categorize endpoints as public or private
- Use the endpoint file template from CLAUDE.md
- Include request parameters, response examples, rate limits per endpoint
- Follow the same JavaScript standards as general extraction

**Each endpoint file should contain:**

- HTTP method and endpoint path
- Description
- Authentication requirements
- Rate limit weight
- Request parameters (required/optional, types, constraints)
- Request examples
- Success response examples
- Error responses
- Additional notes/edge cases

**CRITICAL: Endpoint Classification (Public vs Private)**

Determining whether an endpoint is public or private is essential for proper
organization. **DO NOT** rely on simple text searches as they are unreliable.

**Why Text Searches Fail:**

- Searching for "authentication required" or "public" in content is unreliable
- Documentation frameworks may not use consistent terminology
- Can result in ALL endpoints being misclassified (Backpack: 42 private, 0
  public initially)

**Reliable Approach: Authentication Header Detection**

Check for the presence of authentication headers in the endpoint content:

```javascript
// Example from Backpack integration
const hasXApiKey =
  content.includes("X-API-KEY") || content.includes("X-API-Key")
const hasXSignature =
  content.includes("X-SIGNATURE") || content.includes("X-Signature")
const hasXTimestamp =
  content.includes("X-TIMESTAMP") || content.includes("X-Timestamp")
const hasAuthHeaders = hasXApiKey || hasXSignature || hasXTimestamp
const isPublic = !hasAuthHeaders
```

**Exchange-Specific Patterns:**

Different exchanges use different authentication headers:

- **Backpack**: X-API-KEY, X-SIGNATURE, X-TIMESTAMP
- **Binance**: X-MBX-APIKEY
- **Others may use**: Authorization, API-Key, etc.

**Inspect the documentation first** to identify which headers indicate
authenticated endpoints.

**IMPORTANT: Apply Same Logic to ALL Code Paths**

If you have multiple extraction methods (primary and fallback), BOTH must use
identical classification logic:

```javascript
// ❌ WRONG: Different logic in different places
// Primary method
const isPublic = !content.includes("authentication required")

// Fallback method
const isPublic =
  parentSection && parentSection.textContent.toLowerCase().includes("public")

// ✅ CORRECT: Same logic everywhere
// Both primary and fallback use:
const hasAuthHeaders =
  content.includes("X-API-KEY") ||
  content.includes("X-SIGNATURE") ||
  content.includes("X-TIMESTAMP")
const isPublic = !hasAuthHeaders
```

**Source URL Extraction**

Each endpoint file should link back to the source documentation. Extract the
proper URL from heading links:

```javascript
// Extract link from heading
const link = heading.querySelector("a[href]")
let sourceUrl = "https://docs.exchange.com"
let operationId = endpointPath

if (link) {
  const href = link.getAttribute("href")
  if (href && href.startsWith("#")) {
    sourceUrl = `https://docs.exchange.com/${href}`
    operationId = href.replace("#", "")
  }
}

// Use in endpoint object
const endpoint = {
  method,
  path: endpointPath,
  operationId,
  sourceUrl, // Proper URL like: https://docs.backpack.exchange/#tag/Assets/operation/get_assets
  content,
  isPublic
}
```

**IMPORTANT: Handling Complex HTML Tables**

Many modern documentation frameworks (like Redocly, Swagger UI, etc.) render
complex HTML tables with nested divs, spans, and CSS classes. These tables will
NOT convert properly to GFM markdown tables by default.

**The Solution:**

Before extracting content from the page, clean up the HTML tables in the browser
context to create proper table structure that Turndown can convert:

```javascript
const endpoints = await page.evaluate(() => {
  // Helper function to clean up complex HTML tables
  const cleanupTables = () => {
    const tables = document.querySelectorAll("table")

    tables.forEach(table => {
      const rows = table.querySelectorAll("tr")
      const tableData = []

      // Extract data from rows (adjust selectors based on actual structure)
      rows.forEach(row => {
        const cells = row.querySelectorAll("td")
        if (cells.length >= 2) {
          const firstCell = cells[0]
          const secondCell = cells[1]

          // Extract parameter information from nested elements
          const propertyName = firstCell.querySelector(
            ".property-name, .param-name"
          )
          const required = firstCell.textContent
            .toLowerCase()
            .includes("required")
          const typeElements = secondCell.querySelectorAll('[class*="type"]')
          const descriptionElem = secondCell.querySelector(
            'p, [class*="description"]'
          )

          if (propertyName) {
            const paramName = propertyName.textContent.trim()
            const typeText = Array.from(typeElements)
              .map(el => el.textContent.trim())
              .join(" ")
            const descText = descriptionElem
              ? descriptionElem.textContent.trim()
              : ""

            tableData.push({
              parameter: paramName,
              required: required ? "required" : "optional",
              type: typeText || "string",
              description: descText
            })
          }
        }
      })

      // Rebuild table with proper thead/tbody structure for GFM conversion
      if (tableData.length > 0) {
        const newTable = document.createElement("table")
        const thead = document.createElement("thead")
        const tbody = document.createElement("tbody")

        // Create header row
        const headerRow = document.createElement("tr")
        ;["Parameter", "Required", "Type", "Description"].forEach(header => {
          const th = document.createElement("th")
          th.textContent = header
          headerRow.appendChild(th)
        })
        thead.appendChild(headerRow)

        // Create data rows
        tableData.forEach(data => {
          const tr = document.createElement("tr")
          ;["parameter", "required", "type", "description"].forEach(key => {
            const td = document.createElement("td")
            td.textContent = data[key]
            tr.appendChild(td)
          })
          tbody.appendChild(tr)
        })

        newTable.appendChild(thead)
        newTable.appendChild(tbody)
        table.parentNode.replaceChild(newTable, table)
      }
    })
  }

  // CRITICAL: Clean up tables BEFORE extracting content
  cleanupTables()

  // Now extract endpoints with cleaned tables...
  const results = { public: [], private: [] }
  // ... rest of extraction logic
  return results
})
```

**Key Points:**

- Clean tables in the browser context (page.evaluate) BEFORE extraction
- Create proper `<thead>` and `<tbody>` structure
- Use `<th>` for headers and `<td>` for data cells
- Turndown with GFM plugin will then convert to proper markdown tables
- Adjust CSS selectors based on the specific documentation framework used

### 5. Create package.json

**Create `venues/{exchange-name}/package.json`:**

```json
{
  "name": "@coincise/{exchange-name}",
  "version": "1.0.0",
  "description": "Documentation extraction for {Exchange Name} API",
  "type": "module",
  "scripts": {
    "extract:general": "node src/extractGeneral.js",
    "extract:endpoints": "node src/extractEndpoints.js",
    "extract:all": "pnpm run extract:general && pnpm run extract:endpoints"
  },
  "dependencies": {
    "turndown": "^7.1.2",
    "turndown-plugin-gfm": "^1.0.2",
    "puppeteer": "^21.0.0"
  }
}
```

**Install dependencies:**

```bash
cd venues/{exchange-name}
pnpm install
```

### 6. Create README.md

**Create `venues/{exchange-name}/README.md`:**

Document:

- Exchange name and description
- Documentation source URL
- Extraction scripts available
- How to run the extraction
- Any exchange-specific notes or quirks
- Last updated date

### 7. Test Extraction Scripts

**Run the extraction scripts:**

```bash
cd venues/{exchange-name}
pnpm run extract:general
```

**Verify the output:**

- Check that all expected files were created in `docs/{exchange-name}/`
- Review the content quality and formatting
- Ensure markdown conversion is clean and readable
- Verify that all sections are present

**Run endpoint extraction:**

```bash
pnpm run extract:endpoints
```

**Verify endpoint files:**

- Check that endpoints are properly categorized (public/private)
- Verify filename format matches the standard
- Review a few endpoint files for completeness

### 8. Create GitHub Actions Workflow

**Create `.github/workflows/{exchange-name}-docs-update.yml`:**

```yaml
name: Update {Exchange Name} Documentation

on:
  schedule:
    # Run weekly on Saturday night / Sunday morning at midnight UTC
    - cron: "0 0 * * 0"
  workflow_dispatch: # Allow manual triggering

jobs:
  update-docs:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: |
          cd venues/{exchange-name}
          pnpm install

      - name: Extract documentation
        run: |
          cd venues/{exchange-name}
          pnpm run extract:all

      - name: Format documentation
        run: ./formatdocs.sh

      - name: Check for changes
        id: git-check
        run: |
          git diff --exit-code docs/{exchange-name}/ || echo "changes=true" >> $GITHUB_OUTPUT

      - name: Create Pull Request
        if: steps.git-check.outputs.changes == 'true'
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: "docs: update {Exchange Name} API documentation"
          title: "Update {Exchange Name} API Documentation"
          body: |
            Automated update of {Exchange Name} API documentation.

            This PR was automatically generated by the documentation extraction workflow.

            Please review the changes and merge if they look correct.
          branch: "docs/{exchange-name}-update"
          delete-branch: true
```

### 9. Investigation and Debugging

**Use Chrome DevTools MCP for Efficient Investigation**

When debugging extraction issues or understanding documentation structure,
Chrome DevTools MCP is more efficient than Playwright for interactive
investigation:

```javascript
// Navigate to the docs
mcp__chrome - devtools__navigate_page({ url: "https://docs.exchange.com" })

// Take a snapshot (faster than Playwright for simple checks)
mcp__chrome - devtools__take_snapshot()

// Evaluate JavaScript to understand structure
mcp__chrome -
  devtools__evaluate_script({
    function: `() => {
    // Check if endpoint has auth headers
    const section = document.querySelector('[data-section-id="operation/get_assets"]');
    const html = section ? section.innerHTML : '';
    return {
      hasXApiKey: html.includes('X-API-KEY'),
      hasXSignature: html.includes('X-SIGNATURE'),
      sectionLength: html.length
    };
  }`
  })
```

**Add Comprehensive Debug Logging**

Include debug output in your extraction logic to troubleshoot classification and
extraction issues:

```javascript
const endpoint = {
  method,
  path: endpointPath,
  operationId,
  sourceUrl,
  content,
  isPublic,
  _debug: {
    hasResponseSchema: content.includes("Response Schema"),
    contentLength: content.length,
    hasXApiKey,
    hasXSignature,
    hasXTimestamp,
    hasAuthHeaders,
    isPublic
  }
}

// Log first endpoint for debugging
if (results.private.length === 1 && results.public.length === 0) {
  console.log(
    "📝 Debug first endpoint:",
    JSON.stringify(
      {
        operationId: endpoint.operationId,
        sourceUrl: endpoint.sourceUrl,
        method: endpoint.method,
        path: endpoint.path,
        debug: endpoint._debug
      },
      null,
      2
    )
  )
}
```

**Common Debugging Scenarios:**

1. **All endpoints classified incorrectly** → Check auth header detection logic
2. **Missing response schemas** → Check if buttons need to be clicked to expand
   content
3. **Over-extraction in general docs** → Add section boundary detection
4. **Wrong source URLs** → Verify href extraction from heading links
5. **Empty public or private directories** → Debug classification with console
   output

**Debugging Checklist:**

- [ ] Check actual HTML structure using Chrome DevTools MCP
- [ ] Verify authentication headers are present/absent as expected
- [ ] Add debug output to log classification decisions
- [ ] Check file sizes - core files should be <1000 lines
- [ ] Verify public/private endpoint counts make sense
- [ ] Test source URLs manually to ensure they work

### 10. Update Root Documentation

**Add entry to README.md venue table:**

- Add a new row to the venues table with:
  - Exchange name
  - Documentation status badge
  - Link to documentation folder
  - Link to extraction scripts
  - Notes about extraction approach

**Regenerate llms.txt:**

```bash
./tools/llms/generate-llms-txt.sh
```

### 10. Final Testing

**Test the GitHub Actions workflow locally:**

```bash
act -W .github/workflows/{exchange-name}-docs-update.yml -j update-docs --container-architecture linux/amd64
```

**Verify everything works end-to-end:**

- All extraction scripts run without errors
- Documentation is properly formatted
- Workflow completes successfully (git operations may fail in act, but
  extraction should work)

## Important Notes

- **Respect the Documentation Standards:** Follow the target structure defined
  in CLAUDE.md exactly
- **JavaScript Standards:** Pure ES6, no TypeScript, use functional programming
  patterns
- **Error Handling:** Let errors propagate to main(), don't catch them in
  extraction functions
- **Logging:** Use console methods for logging, be descriptive
- **Puppeteer Configuration:** Always use shared utilities from `venues/shared/`
- **Rate Limiting:** Add polite delays between requests to avoid overwhelming
  the documentation site
- **File Naming:** Follow the convention `{http_method}_{endpoint_name}.md` for
  endpoints
- **Multiple Extraction Paths:** If you implement primary and fallback
  extraction methods, ensure BOTH use identical classification logic (auth
  headers, source URL extraction, etc.)
- **Section Boundaries:** Implement multiple boundary detection strategies to
  prevent over-extraction (heading changes, link patterns, text matching)
- **Documentation File Protection:** NEVER modify files in `docs/` directory
  directly - ONLY extraction scripts should modify them
- **Verify File Sizes:** Core documentation files (authentication, rate_limits,
  etc.) should be <1000 lines. Larger files indicate over-extraction
- **Test Classification:** Verify public/private endpoint counts make sense -
  all endpoints in one category suggests classification issues
- **Source URLs:** Always extract and include proper source URLs linking back to
  original documentation
- **Chrome DevTools MCP:** Use for investigation and debugging - it's faster
  than Playwright for interactive exploration
- **Debug Output:** Add comprehensive debug logging to troubleshoot
  classification and extraction issues

## Customization Based on Documentation Structure

**Single-page documentation:**

- Use CSS selectors or IDs to target specific sections
- Extract sections from the same page
- May need to scroll or expand sections

**Multi-page documentation:**

- Navigate between different URLs for each section
- May require following links to sub-pages
- Track visited pages to avoid duplicates

**Dynamic content:**

- Wait for content to load before extraction
- May need to click tabs or expand sections
- Use proper wait strategies (wait for specific selectors)

**Interactive API docs:**

- Some docs may use frameworks like Swagger/OpenAPI
- Consider extracting from JSON schemas if available
- May need special handling for interactive elements

## Next Steps After Integration

1. **Create a PR with the new venue integration**
2. **Document any exchange-specific quirks or challenges**
3. **Monitor the first automated workflow run**
4. **Update this command if you discover better patterns**

Start by asking for the exchange name and documentation URL (if not provided as
arguments), then proceed with exploring the documentation structure using
Playwright.
