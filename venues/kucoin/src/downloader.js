"use strict"

import fetch from "node-fetch"
import path from "path"
import { config } from "./config.js"

/**
 * Downloads OpenAPI specification files from KuCoin's GitHub repository
 * @param {Object} apiSpecUrls - Object containing REST and WS API spec URLs
 * @returns {Object} - Downloaded specifications organized by type and category
 */
export const downloadOpenApiSpecs = async apiSpecUrls => {
  const downloadedSpecs = {
    rest: {},
    ws: {}
  }

  // Download REST API specs
  for (const [category, urls] of Object.entries(apiSpecUrls.rest)) {
    downloadedSpecs.rest[category] = []

    for (const specUrl of urls) {
      const fullUrl = `${config.baseGithubUrl}${specUrl}`
      console.log(`Downloading REST ${category} spec from: ${fullUrl}`)

      const response = await fetch(fullUrl)

      if (!response.ok) {
        throw new Error(
          `Failed to download from ${fullUrl}: ${response.statusText}`
        )
      }

      const specData = await response.json()
      const fileName = path
        .basename(specUrl, ".json")
        .split("-")
        .slice(1)
        .join("-")

      downloadedSpecs.rest[category].push({
        fileName,
        specData
      })
    }
  }

  // Download WebSocket API specs
  for (const [category, urls] of Object.entries(apiSpecUrls.ws)) {
    downloadedSpecs.ws[category] = []

    for (const specUrl of urls) {
      const fullUrl = `${config.baseGithubUrl}${specUrl}`
      console.log(`Downloading WebSocket ${category} spec from: ${fullUrl}`)

      const response = await fetch(fullUrl)

      if (!response.ok) {
        throw new Error(
          `Failed to download from ${fullUrl}: ${response.statusText}`
        )
      }

      const specData = await response.json()
      const fileName = path
        .basename(specUrl, ".json")
        .split("-")
        .slice(1)
        .join("-")

      downloadedSpecs.ws[category].push({
        fileName,
        specData
      })
    }
  }

  return downloadedSpecs
}
