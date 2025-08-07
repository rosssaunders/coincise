"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const REPO_ROOT = path.resolve(__dirname, "../../..")
const DOCS_ROOT = path.join(REPO_ROOT, "docs")

const isMarkdownFile = fileName => fileName.toLowerCase().endsWith(".md")

const toTitleCase = text => {
  return text
    .replace(/[-_]+/g, " ")
    .replace(/\.[^/.]+$/, "")
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const humanizeDirTitle = dirPath => {
  const parts = dirPath.split(path.sep).filter(Boolean)
  // Use last two meaningful parts when possible (e.g., binance/spot)
  const last = parts[parts.length - 1] || ""
  const prev = parts[parts.length - 2] || ""
  if (prev) return `${toTitleCase(prev)} ${toTitleCase(last)}`.trim()
  return toTitleCase(last)
}

const buildLlmsContent = (title, summary, docs, changelogs) => {
  let lines = []
  lines.push(`# ${title}`)
  if (summary) {
    lines.push(`> ${summary}`)
  }
  lines.push("")

  if (docs.length > 0) {
    lines.push("## Documentation")
    for (const { name, relativePath } of docs) {
      lines.push(`- [${name}](${relativePath})`)
    }
    lines.push("")
  }

  if (changelogs.length > 0) {
    lines.push("## Changelogs")
    for (const { name, relativePath } of changelogs) {
      lines.push(`- [${name}](${relativePath})`)
    }
    lines.push("")
  }

  return lines.join("\n")
}

const listLeafVenueDirs = baseDir => {
  // Return directories under docs/ that contain markdown files and are considered leaves
  const results = []

  const walk = currentDir => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    const subdirs = entries.filter(e => e.isDirectory()).map(e => path.join(currentDir, e.name))
    const mdFiles = entries.filter(e => e.isFile() && isMarkdownFile(e.name))

    if (mdFiles.length > 0) {
      // Consider this a leaf for our purposes (we still descend to catch deeper leaves)
      results.push(currentDir)
    }
    for (const sub of subdirs) walk(sub)
  }

  walk(baseDir)
  // De-duplicate and prefer deepest paths
  const unique = Array.from(new Set(results)).sort((a, b) => a.localeCompare(b))
  return unique
}

const generateForDir = dirPath => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  const files = entries.filter(e => e.isFile() && isMarkdownFile(e.name)).map(e => e.name)

  const docs = []
  const changelogs = []
  for (const file of files) {
    const lower = file.toLowerCase()
    const rel = `./${file}`
    const friendly = toTitleCase(file)
    if (lower.includes("change_log") || lower.includes("changelog")) {
      changelogs.push({ name: friendly, relativePath: rel })
    } else {
      docs.push({ name: friendly, relativePath: rel })
    }
  }

  // Sort alphabetically for stability
  docs.sort((a, b) => a.name.localeCompare(b.name))
  changelogs.sort((a, b) => a.name.localeCompare(b.name))

  const title = humanizeDirTitle(path.relative(DOCS_ROOT, dirPath))
  const summary = `Curated links to ${title} API documentation generated from official sources.`
  const content = buildLlmsContent(title, summary, docs, changelogs)

  const outPath = path.join(dirPath, "llms.txt")
  fs.writeFileSync(outPath, content, "utf8")
  console.log(`Created: ${outPath}`)
}

async function main() {
  const docsRootExists = fs.existsSync(DOCS_ROOT)
  if (!docsRootExists) {
    console.error("docs/ directory not found:", DOCS_ROOT)
    process.exit(1)
  }

  const leafDirs = listLeafVenueDirs(DOCS_ROOT)
  if (leafDirs.length === 0) {
    console.warn("No markdown-containing directories found under docs/.")
    return
  }

  for (const dir of leafDirs) {
    try {
      generateForDir(dir)
    } catch (error) {
      console.error("Failed to generate llms.txt for:", dir)
      console.error("Error:", error)
      console.error("Stack trace:", error.stack)
      process.exitCode = 1
    }
  }
}

// Only run main() if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error("Unhandled error in main:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
  })
}


