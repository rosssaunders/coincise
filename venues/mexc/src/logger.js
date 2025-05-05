/**
 * Utility functions for pretty console logging
 */

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m"
}

const symbols = {
  warning: "⚠️",
  info: "ℹ️",
  error: "❌",
  success: "✅"
}

/**
 * Creates a pretty formatted warning message
 * @param {string} message - The main warning message
 * @param {string[]} details - Array of detail lines
 */
export function warn(message, details = []) {
  console.warn(
    `${colors.yellow}${symbols.warning} ${colors.bright}${message}${colors.reset}`
  )
  details.forEach(detail => {
    console.warn(`${colors.dim}   ${detail}${colors.reset}`)
  })
}

/**
 * Creates a pretty formatted info message
 * @param {string} message - The main info message
 */
export function info(message) {
  console.log(
    `${colors.cyan}${symbols.info} ${colors.bright}${message}${colors.reset}`
  )
}

/**
 * Creates a pretty formatted error message
 * @param {string} message - The main error message
 * @param {string[]} details - Array of detail lines
 */
export function error(message, details = []) {
  console.error(
    `${colors.red}${symbols.error} ${colors.bright}${message}${colors.reset}`
  )
  details.forEach(detail => {
    console.error(`${colors.dim}   ${detail}${colors.reset}`)
  })
}

/**
 * Creates a pretty formatted success message
 * @param {string} message - The main success message
 */
export function success(message) {
  console.log(
    `${colors.cyan}${symbols.success} ${colors.bright}${message}${colors.reset}`
  )
}
