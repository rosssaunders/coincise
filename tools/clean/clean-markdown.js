import { promises as fs } from "fs"
import path from "path"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"
import remarkGfm from "remark-gfm"

async function cleanMarkdown(inputPath, outputPath) {
  try {
    // Read the input file
    const content = await fs.readFile(inputPath, "utf8")

    // Process through remark pipeline
    const file = await unified()
      .use(remarkParse) // Parse markdown to AST
      .use(remarkGfm) // Support GitHub Flavored Markdown
      .use(remarkStringify, {
        bullet: "-", // Use - for bullet lists
        listItemIndent: "one", // More compact list indentation
        emphasis: "_", // Use _ for emphasis
        strong: "*", // Use * for strong (changed from '**' to fix serialization error)
        rule: "-", // Use - for thematic breaks
        fences: true, // Use fenced code blocks
        incrementListMarker: true // Increment ordered list markers
      })
      .process(content)

    // Write the output file
    await fs.writeFile(outputPath, String(file))

    console.log(
      `Successfully cleaned markdown from ${inputPath} to ${outputPath}`
    )
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.error(
        'Error: Required modules not found. Please run "npm install" in this directory.'
      )
    } else {
      console.error("Error cleaning markdown:", error)
    }
  }
}

// Get command line arguments
const inputPath = process.argv[2]
const outputPath = process.argv[3] || inputPath.replace(".md", "-cleaned.md")

if (!inputPath) {
  console.error(
    "Please provide an input file path: node clean-markdown.js <input-file> [output-file]"
  )
  process.exit(1)
}

cleanMarkdown(inputPath, outputPath)
