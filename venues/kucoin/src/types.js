'use strict'

/**
 * @typedef {Object} OpenApiSpec
 * @property {string} openapi - OpenAPI version
 * @property {Object} info - Information about the API
 * @property {Object} paths - API endpoints
 * @property {Object} components - Reusable components
 */

/**
 * @typedef {Object} DownloadedSpecs
 * @property {Object.<string, OpenApiSpec>} rest - REST API specifications by category
 * @property {Object.<string, OpenApiSpec>} ws - WebSocket API specifications by category
 */

// Export types for documentation purposes
export const types = {
  OpenApiSpec: {},
  DownloadedSpecs: {},
}
