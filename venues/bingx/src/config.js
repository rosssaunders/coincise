"use strict"

import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import fs from "fs"
import path from "path"

// Function to get configuration based on type
export function getConfig(type = "private") {
  // Map command line arguments to configuration types
  const configType =
    type === "privateWs"
      ? "privateWebSocket"
      : type === "publicWs"
        ? "publicWebSocket"
        : type

  // Define the path to the JSON config file
  const configPath = path.resolve(
    path.join(__dirname, "../config", `${configType}.json`)
  )

  // Read and parse the JSON config file
  const configData = fs.readFileSync(configPath, "utf8")
  return JSON.parse(configData)
}

// Default export for backward compatibility - removed since private.json is now split into multiple files
