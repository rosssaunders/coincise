"use strict"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LOG_DIR = path.join(__dirname, "../../logs")

export async function setupLogger() {
  try {
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true })
    }

    // Create a write stream for logging
    const logStream = fs.createWriteStream(
      path.join(
        LOG_DIR,
        `bybit-docs-${new Date().toISOString().split("T")[0]}.log`
      ),
      { flags: "a" }
    )

    // Override console.log to write to both console and file
    const originalConsoleLog = console.log
    console.log = (...args) => {
      const timestamp = new Date().toISOString()
      const message = args
        .map(arg => (typeof arg === "object" ? JSON.stringify(arg) : arg))
        .join(" ")

      logStream.write(`[${timestamp}] ${message}\n`)
      originalConsoleLog.apply(console, args)
    }

    return true
  } catch (error) {
    console.error("Failed to setup logger:", error)
    throw error
  }
}
