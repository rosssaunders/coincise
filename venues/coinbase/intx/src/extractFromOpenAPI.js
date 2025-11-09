/**
 * Extract endpoint documentation from OpenAPI spec
 */
"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import https from "https"
import yaml from "js-yaml"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_DIR = path.join(
  __dirname,
  "../../../../docs/coinbase/intx/endpoints"
)
const SPEC_URL =
  "https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/intx-spec.yaml"

/**
 * Ensure directory exists
 */
const ensureDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Download the OpenAPI spec
 */
const downloadSpec = async () => {
  return new Promise((resolve, reject) => {
    https
      .get(SPEC_URL, res => {
        let data = ""
        res.on("data", chunk => (data += chunk))
        res.on("end", () => resolve(data))
      })
      .on("error", reject)
  })
}

/**
 * Parse OpenAPI spec
 */
const parseSpec = specYaml => {
  const spec = yaml.load(specYaml)
  return spec.paths || {}
}

/**
 * Sanitize filename
 */
const sanitizeFilename = name => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_")
}

/**
 * Determine if endpoint is public or private
 */
const isPublicEndpoint = (pathStr, method, endpoint) => {
  // Check the tags - typically "Assets" and "Instruments" are public
  const publicTags = ["Assets", "Instruments", "Index", "Statistics"]
  const hasPublicTag =
    endpoint.tags && endpoint.tags.some(tag => publicTags.includes(tag))

  // Check the path - public endpoints typically don't include portfolio or require auth
  const isPublicPath =
    !pathStr.includes("portfolio") &&
    !pathStr.includes("order") &&
    !pathStr.includes("transfer") &&
    !pathStr.includes("withdraw") &&
    !pathStr.includes("address-book")

  return hasPublicTag || isPublicPath
}

/**
 * Generate markdown for an endpoint
 */
const generateMarkdown = (pathStr, method, endpoint) => {
  let md = `# ${method.toUpperCase()} ${pathStr}\n\n`

  if (endpoint.summary) {
    md += `## ${endpoint.summary}\n\n`
  }

  if (endpoint.description) {
    md += `${endpoint.description}\n\n`
  }

  md += `**Operation ID:** ${endpoint.operationId}\n\n`

  if (endpoint.tags && endpoint.tags.length > 0) {
    md += `**Tags:** ${endpoint.tags.join(", ")}\n\n`
  }

  md += `**Endpoint:** \`${method.toUpperCase()} ${pathStr}\`\n\n`
  md += `**Base URL:** https://api.international.coinbase.com\n\n`

  if (endpoint.parameters && endpoint.parameters.length > 0) {
    md += `## Parameters\n\n`
    md += `| Name | In | Type | Required | Description |\n`
    md += `|------|----|------|----------|-------------|\n`
    endpoint.parameters.forEach(param => {
      const paramType = param.schema?.type || param.type || "string"
      const required = param.required ? "Yes" : "No"
      const description = param.description || ""
      md += `| ${param.name} | ${param.in} | ${paramType} | ${required} | ${description} |\n`
    })
    md += "\n"
  }

  md += `## Authentication\n\n`
  const isPublic = isPublicEndpoint(pathStr, method, endpoint)
  if (isPublic) {
    md += `This endpoint does not require authentication.\n\n`
  } else {
    md += `This endpoint requires authentication. Include the following headers:\n\n`
    md += `- \`CB-ACCESS-KEY\`: Your API key\n`
    md += `- \`CB-ACCESS-SIGN\`: Request signature\n`
    md += `- \`CB-ACCESS-TIMESTAMP\`: Request timestamp\n`
    md += `- \`CB-ACCESS-PASSPHRASE\`: API key passphrase\n\n`
  }

  if (endpoint.responses) {
    md += `## Responses\n\n`
    for (const [code, response] of Object.entries(endpoint.responses)) {
      md += `### ${code}\n\n`
      if (response.description) {
        md += `${response.description}\n\n`
      }
    }
  }

  md += `## Documentation\n\n`
  md += `For more details, see the [INTX API Documentation](https://docs.cdp.coinbase.com/api-reference/international-exchange-api/rest-api/introduction).\n`

  return md
}

/**
 * Main extraction function
 */
const main = async () => {
  console.log("Extracting endpoint documentation from OpenAPI spec...\n")

  try {
    // Download spec
    console.log("Downloading OpenAPI spec...")
    const specYaml = await downloadSpec()
    console.log("✓ Spec downloaded")

    // Parse spec
    console.log("Parsing spec...")
    const paths = parseSpec(specYaml)
    console.log(`✓ Found ${Object.keys(paths).length} paths`)

    // Ensure directories
    ensureDir(path.join(OUTPUT_DIR, "public"))
    ensureDir(path.join(OUTPUT_DIR, "private"))

    let publicCount = 0
    let privateCount = 0

    // Generate markdown for each endpoint
    for (const [pathStr, methods] of Object.entries(paths)) {
      for (const [method, endpoint] of Object.entries(methods)) {
        if (!endpoint.operationId) continue

        const isPublic = isPublicEndpoint(pathStr, method, endpoint)
        const category = isPublic ? "public" : "private"

        if (isPublic) {
          publicCount++
        } else {
          privateCount++
        }

        const filename = sanitizeFilename(endpoint.operationId) + ".md"
        const filePath = path.join(OUTPUT_DIR, category, filename)

        const markdown = generateMarkdown(pathStr, method, endpoint)
        fs.writeFileSync(filePath, markdown, "utf8")

        console.log(`  ✓ ${category}/${filename}`)
      }
    }

    console.log(`\n✅ Endpoint extraction completed successfully`)
    console.log(`  Public: ${publicCount} endpoints`)
    console.log(`  Private: ${privateCount} endpoints`)
    console.log(`  Total: ${publicCount + privateCount} endpoints`)
  } catch (error) {
    console.error("Error:", error.message)
    throw error
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
