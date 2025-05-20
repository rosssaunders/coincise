"use strict"

import ccxt from "ccxt"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"
import { promisify } from "util"
import * as acorn from "acorn"
import * as acornWalk from "acorn-walk"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)
const exists = promisify(fs.exists)

const CCXT_REPO = "https://github.com/ccxt/ccxt.git"
const CCXT_DIR = path.join(__dirname, "..", "ccxt-repo")

const cloneRepository = async () => {
  try {
    // Check if directory already exists
    if (await exists(CCXT_DIR)) {
      console.info("CCXT repository already exists, pulling latest changes...")
      execSync("git pull", { cwd: CCXT_DIR })
    } else {
      console.info("Cloning CCXT repository...")
      execSync(`git clone ${CCXT_REPO} ${CCXT_DIR}`)
    }
  } catch (error) {
    console.error("Error cloning/pulling repository:", error)
    throw error
  }
}

const parseExchangeFile = async exchangeId => {
  const filePath = path.join(CCXT_DIR, "js", `${exchangeId}.js`)

  try {
    const content = await readFile(filePath, "utf8")
    const docUrls = {}

    // Use Acorn to parse the file and extract JSDoc comments for async methods
    const comments = []
    const ast = acorn.parse(content, {
      ecmaVersion: "latest",
      sourceType: "module",
      locations: true,
      onComment: comments
    })

    // Map comments by their ending line for quick lookup
    const commentMap = new Map()
    for (const c of comments) {
      if (c.type === "Block" && c.value.startsWith("*")) {
        commentMap.set(c.loc.end.line, c)
      }
    }

    // Helper function to extract URLs from @see tags
    const extractSeeUrls = commentText => {
      const urls = []
      // Match @see tags that might span multiple lines
      const seeRegex = /@see\s+(?:<)?(https?:\/\/[^\s\n>]+)(?:>)?/g
      let match
      while ((match = seeRegex.exec(commentText)) !== null) {
        urls.push(match[1])
      }
      return urls
    }

    // Walk the AST to find async methods with JSDoc
    acornWalk.ancestor(ast, {
      MethodDefinition(node) {
        if (node.value.async && node.key && node.key.name) {
          const methodName = node.key.name
          const comment = commentMap.get(node.loc.start.line - 1)
          if (
            (methodName.includes("Deposit") ||
              methodName.includes("Withdraw")) &&
            comment
          ) {
            // Extract @see and @description from the comment
            const commentText = comment.value
            const seeUrls = extractSeeUrls(commentText)
            if (seeUrls.length > 0) {
              docUrls[methodName] = seeUrls[0] // Store first URL as primary
              if (seeUrls.length > 1) {
                docUrls[`${methodName}_additional`] = seeUrls.slice(1) // Store additional URLs
              }
            }
            const descMatch = commentText.match(/@description\s+([^\n]+)/)
            if (descMatch) {
              docUrls[`${methodName}_description`] = descMatch[1].trim()
            }
          }
        }
      },
      FunctionDeclaration(node) {
        if (node.async && node.id && node.id.name) {
          const methodName = node.id.name
          const comment = commentMap.get(node.loc.start.line - 1)
          if (
            (methodName.includes("Deposit") ||
              methodName.includes("Withdraw")) &&
            comment
          ) {
            const commentText = comment.value
            const seeUrls = extractSeeUrls(commentText)
            if (seeUrls.length > 0) {
              docUrls[methodName] = seeUrls[0] // Store first URL as primary
              if (seeUrls.length > 1) {
                docUrls[`${methodName}_additional`] = seeUrls.slice(1) // Store additional URLs
              }
            }
            const descMatch = commentText.match(/@description\s+([^\n]+)/)
            if (descMatch) {
              docUrls[`${methodName}_description`] = descMatch[1].trim()
            }
          }
        }
      },
      FunctionExpression(node, state, ancestors) {
        if (node.async && ancestors.length) {
          const parent = ancestors[ancestors.length - 1]
          if (
            parent.type === "VariableDeclarator" &&
            parent.id &&
            parent.id.name
          ) {
            const methodName = parent.id.name
            const comment = commentMap.get(node.loc.start.line - 1)
            if (
              (methodName.includes("Deposit") ||
                methodName.includes("Withdraw")) &&
              comment
            ) {
              const commentText = comment.value
              const seeUrls = extractSeeUrls(commentText)
              if (seeUrls.length > 0) {
                docUrls[methodName] = seeUrls[0] // Store first URL as primary
                if (seeUrls.length > 1) {
                  docUrls[`${methodName}_additional`] = seeUrls.slice(1) // Store additional URLs
                }
              }
              const descMatch = commentText.match(/@description\s+([^\n]+)/)
              if (descMatch) {
                docUrls[`${methodName}_description`] = descMatch[1].trim()
              }
            }
          }
        }
      }
    })

    return docUrls
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`No source file found for ${exchangeId}`)
      return {}
    }
    throw error
  }
}

const getEndpointInfo = exchange => {
  const endpoints = {}

  // Get the API URLs
  if (exchange.urls) {
    endpoints.api = exchange.urls.api
    endpoints.www = exchange.urls.www
  }

  // Get the specific endpoints for deposits and withdrawals
  if (exchange.has) {
    endpoints.has = {
      fetchDeposits: exchange.has.fetchDeposits || false,
      fetchWithdrawals: exchange.has.fetchWithdrawals || false,
      fetchDepositHistory: exchange.has.fetchDepositHistory || false,
      fetchWithdrawalHistory: exchange.has.fetchWithdrawalHistory || false,
      deposit: exchange.has.deposit || false,
      withdraw: exchange.has.withdraw || false
    }
  }

  // Get the API methods that are used
  if (exchange.api) {
    endpoints.methods = {}
    for (const method of [
      "fetchDeposits",
      "fetchWithdrawals",
      "fetchDepositHistory",
      "fetchWithdrawalHistory",
      "deposit",
      "withdraw"
    ]) {
      if (exchange.api[method]) {
        endpoints.methods[method] = {
          method: exchange.api[method].method || "GET",
          path: exchange.api[method].path || exchange.api[method]
        }
      }
    }
  }

  return endpoints
}

const checkExchangeSupport = async exchangeId => {
  try {
    const exchange = new ccxt[exchangeId]({
      enableRateLimit: true,
      timeout: 30000
    })

    // Get endpoint information
    const endpointInfo = getEndpointInfo(exchange)

    // Get documentation URLs from source files
    const docUrls = await parseExchangeFile(exchangeId)

    // Check if the exchange has deposit and withdrawal methods
    const hasDeposit = typeof exchange.fetchDeposits === "function"
    const hasWithdraw = typeof exchange.fetchWithdrawals === "function"
    const hasWithdrawHistory =
      typeof exchange.fetchWithdrawalHistory === "function"
    const hasDepositHistory = typeof exchange.fetchDepositHistory === "function"

    // Clean up the exchange instance
    await exchange.close()

    return {
      exchangeId,
      hasDeposit,
      hasWithdraw,
      hasWithdrawHistory,
      hasDepositHistory,
      endpoints: endpointInfo,
      docUrls
    }
  } catch (error) {
    console.error(`Error checking ${exchangeId}:`, error.message)
    return {
      exchangeId,
      hasDeposit: false,
      hasWithdraw: false,
      hasWithdrawHistory: false,
      hasDepositHistory: false,
      endpoints: {},
      docUrls: {},
      error: error.message
    }
  }
}

const formatEndpointInfo = endpoints => {
  const parts = []

  if (endpoints.api) {
    if (typeof endpoints.api === "string") {
      parts.push(`API: ${endpoints.api}`)
    } else if (typeof endpoints.api === "object") {
      parts.push("API URLs:")
      for (const [key, value] of Object.entries(endpoints.api)) {
        parts.push(`  ${key}: ${value}`)
      }
    }
  }

  if (endpoints.methods) {
    parts.push("Endpoints:")
    for (const [method, info] of Object.entries(endpoints.methods)) {
      if (info.path) {
        parts.push(`  ${method}: ${info.method} ${info.path}`)
      }
    }
  }

  return parts.join("\n")
}

const formatDocUrls = docUrls => {
  if (Object.keys(docUrls).length === 0) {
    return "No documentation URLs found"
  }

  const formatted = []
  for (const [key, value] of Object.entries(docUrls)) {
    if (key.endsWith("_description")) {
      const methodName = key.replace("_description", "")
      formatted.push(`${methodName}:`)
      formatted.push(`  Description: ${value}`)
      if (docUrls[methodName]) {
        formatted.push(`  Documentation: ${docUrls[methodName]}`)
        // Add any additional URLs
        if (docUrls[`${methodName}_additional`]) {
          docUrls[`${methodName}_additional`].forEach((url, index) => {
            formatted.push(`  Additional Documentation ${index + 1}: ${url}`)
          })
        }
      }
    } else if (!key.endsWith("_description") && !key.endsWith("_additional")) {
      // Skip if we haven't processed the description yet
      if (!docUrls[`${key}_description`]) {
        formatted.push(`${key}: ${value}`)
      }
    }
  }

  return formatted.join("\n  ")
}

const main = async () => {
  try {
    // Clone/pull the CCXT repository
    await cloneRepository()

    // Get all available exchanges
    const exchanges = ccxt.exchanges

    console.info(
      "Checking exchanges for deposit and withdrawal documentation...\n"
    )

    // Check each exchange
    const results = await Promise.all(
      exchanges.map(exchangeId => checkExchangeSupport(exchangeId))
    )

    // Sort results by exchange name
    const sortedResults = results.sort((a, b) =>
      a.exchangeId.localeCompare(b.exchangeId)
    )

    // Print results
    for (const result of sortedResults) {
      console.info(`\n=== ${result.exchangeId.toUpperCase()} ===`)

      if (result.error) {
        console.info(`❌ Error: ${result.error}`)
        continue
      }

      const features = []
      if (result.hasDeposit) features.push("Deposits")
      if (result.hasWithdraw) features.push("Withdrawals")
      if (result.hasDepositHistory) features.push("Deposit History")
      if (result.hasWithdrawHistory) features.push("Withdrawal History")

      console.info(
        `Supported Features: ${features.length > 0 ? features.join(", ") : "None"}`
      )

      if (Object.keys(result.endpoints).length > 0) {
        console.info("\nAPI Endpoints:")
        console.info(formatEndpointInfo(result.endpoints))
      }

      if (Object.keys(result.docUrls).length > 0) {
        console.info("\nDocumentation:")
        console.info("  " + formatDocUrls(result.docUrls))
      }
    }

    // Print summary
    const supportedDeposits = sortedResults.filter(r => r.hasDeposit).length
    const supportedWithdrawals = sortedResults.filter(r => r.hasWithdraw).length
    const supportedDepositHistory = sortedResults.filter(
      r => r.hasDepositHistory
    ).length
    const supportedWithdrawalHistory = sortedResults.filter(
      r => r.hasWithdrawHistory
    ).length
    const exchangesWithDocs = sortedResults.filter(
      r => Object.keys(r.docUrls).length > 0
    ).length

    console.info("\n=== Summary ===")
    console.info(`Total exchanges: ${exchanges.length}`)
    console.info(`Exchanges with deposit support: ${supportedDeposits}`)
    console.info(`Exchanges with withdrawal support: ${supportedWithdrawals}`)
    console.info(`Exchanges with deposit history: ${supportedDepositHistory}`)
    console.info(
      `Exchanges with withdrawal history: ${supportedWithdrawalHistory}`
    )
    console.info(`Exchanges with documented endpoints: ${exchangesWithDocs}`)
  } catch (error) {
    console.error("Fatal error:", error)
    console.error("Stack trace:", error.stack)
    process.exit(1)
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
