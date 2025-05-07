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

  try {
    // Read and parse the JSON config file
    const configData = fs.readFileSync(configPath, "utf8")
    return JSON.parse(configData)
  } catch (error) {
    console.error(
      `Error loading configuration from ${configPath}:`,
      error.message
    )

    // Fallback to private config if there's an error
    if (configType !== "private") {
      console.log("Falling back to private configuration")
      return getConfig("private")
    }

    // If even the private config fails, throw the error
    throw error
  }
}

// Default export for backward compatibility
export const { urls, outputConfig } = getConfig("private")
