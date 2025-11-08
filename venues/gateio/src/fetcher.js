"use strict"

import axios from "axios"
import axiosRetry from "axios-retry"
import { fallbackWithPuppeteer } from "./puppeteer-fallback.js"

const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
    "Chrome/124.0.0.0 Safari/537.36 CoinciseBot/1.0 (+https://github.com/rosssaunders/coincise)",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9"
}

const client = axios.create({
  timeout: 30000,
  headers: DEFAULT_HEADERS,
  maxRedirects: 5
})

// Retry config: 3 retries, exponential backoff
axiosRetry(client, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error => {
    if (!error || !error.response) return true // network error
    const status = error.response.status
    // Retry on 429, 5xx and optionally on 403 (first treat as retryable)
    return status === 429 || (status >= 500 && status < 600) || status === 403
  },
  onRetry: (retryCount, error, requestConfig) => {
    const status = error.response ? error.response.status : "NO_RESPONSE"
    console.warn(
      `[gateio] Retry attempt ${retryCount}/3 for ${requestConfig.url} (status: ${status})`
    )
  }
})

/**
 * Fetch HTML content from a URL with retry logic and optional Puppeteer fallback
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {boolean} options.allowPuppeteerFallback - Whether to fallback to Puppeteer on failure
 * @returns {Promise<string>} - HTML content
 */
export async function fetchHtml(url, { allowPuppeteerFallback = true } = {}) {
  try {
    console.log(`[gateio] Fetching ${url} with axios...`)
    const res = await client.get(url)
    console.log(
      `[gateio] Successfully fetched ${url} (${res.data.length} bytes)`
    )
    return res.data
  } catch (err) {
    const status = err.response ? err.response.status : "NO_RESPONSE"
    const headers = err.response ? err.response.headers : {}
    const responsePreview =
      err.response && err.response.data
        ? String(err.response.data).substring(0, 200)
        : "No response body"

    console.error(`[gateio] fetchHtml failed for ${url}`)
    console.error(`[gateio] Status: ${status}`)
    console.error(
      `[gateio] Response headers: ${JSON.stringify(headers, null, 2).slice(0, 2000)}`
    )
    console.error(`[gateio] Response preview: ${responsePreview}`)

    // If we get repeated 403 or blocked, optionally fallback to puppeteer
    if (
      allowPuppeteerFallback &&
      (status === 403 || status === "NO_RESPONSE")
    ) {
      console.warn(`[gateio] Falling back to puppeteer for ${url}`)
      try {
        const html = await fallbackWithPuppeteer(url)
        console.log(
          `[gateio] Successfully fetched ${url} via puppeteer (${html.length} bytes)`
        )
        return html
      } catch (puppErr) {
        console.error(`[gateio] puppeteer fallback failed: ${puppErr.message}`)
        console.error(`[gateio] Stack trace: ${puppErr.stack}`)
      }
    }

    throw err
  }
}
