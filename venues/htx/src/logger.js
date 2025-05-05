"use strict"

// ANSI Color Codes
const RESET = "\x1b[0m"
const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const YELLOW = "\x1b[33m"
const BLUE = "\x1b[34m"
const MAGENTA = "\x1b[35m"

// Icons
const INFO_ICON = "\u2139" // ℹ️
const WARN_ICON = "\u26A0" // ⚠️
const ERROR_ICON = "\u274C" // ❌
const BROWSER_ICON = "\uD83C\uDF10" // 🌐
const SUCCESS_ICON = "\u2705" // ✅

const getTimestamp = () => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, "0")
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const year = String(now.getFullYear()).slice(-2)
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

const log = (level, color, icon, message, ...args) => {
  console.log(
    `[${getTimestamp()}] ${color}${icon} [${level}]${RESET} ${message}`,
    ...args
  )
}

const errorLog = (message, ...args) => {
  console.error(
    `[${getTimestamp()}] ${RED}${ERROR_ICON} [ERROR]${RESET} ${message}`,
    ...args
  )
}

export const logger = {
  info: (message, ...args) => log("INFO", GREEN, INFO_ICON, message, ...args),
  warn: (message, ...args) => log("WARN", YELLOW, WARN_ICON, message, ...args),
  error: (message, ...args) => errorLog(message, ...args),
  browser: message => log("BROWSER", BLUE, BROWSER_ICON, message),
  success: (message, ...args) =>
    log("SUCCESS", MAGENTA, SUCCESS_ICON, message, ...args)
}
