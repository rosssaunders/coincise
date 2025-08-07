"use strict"

import { setupLogger } from "./utils/logger.js"
import { generatePublicRestDocs } from "./processors/publicRestProcessor.js"
import { generatePrivateRestDocs } from "./processors/privateRestProcessor.js"
import { generatePublicWebsocketDocs } from "./processors/publicWebsocketProcessor.js"
import { generatePrivateWebsocketDocs } from "./processors/privateWebsocketProcessor.js"
import fs from "fs"
import path from "path"
import { buildLlmsContent, writeLlmsTxt, makeLink } from "../../shared/llms.js"
import process from "process"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DOCS_ROOT = path.resolve(__dirname, "../../../docs")

async function main() {
  // Setup logger
  await setupLogger()

  if (!process.env.LEGACY_MD) {
    // Links-only llms.txt generation
    const configDir = path.resolve(__dirname, "../config")
    const files = fs.readdirSync(configDir).filter(f => f.endsWith(".json"))
    const links = []
    for (const f of files) {
      const { title, endpoints } = JSON.parse(
        fs.readFileSync(path.join(configDir, f), "utf8")
      )
      const endpoint = Array.isArray(endpoints) && endpoints.length ? endpoints[0] : ""
      const base = "https://bybit-exchange.github.io/docs/v5"
      const url = endpoint ? `${base}/${endpoint}` : base
      links.push(makeLink(title || path.basename(f, ".json"), url))
    }
    links.sort((a, b) => a.name.localeCompare(b.name))
    const sections = [{ title: "Documentation", links }]
    const content = buildLlmsContent(
      "Bybit V5",
      "Curated links to official Bybit V5 API documentation.",
      sections
    )
    const outDir = path.join(DOCS_ROOT, "bybit/v5")
    writeLlmsTxt(outDir, content)
    console.log("\n🎉 llms.txt generated successfully! 🎉\n")
    return
  }

  // Legacy: Generate full markdowns
  await generatePublicRestDocs()
  await generatePrivateRestDocs()
  await generatePublicWebsocketDocs()
  await generatePrivateWebsocketDocs()

  console.log("\n🎉 Documentation generation completed successfully! 🎉\n")
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}
