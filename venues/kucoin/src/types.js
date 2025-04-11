'use strict';

/**
 * @typedef {Object} ApiEndpoint
 * @property {string} path - The endpoint path
 * @property {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @property {string} description - Description of what the endpoint does
 * @property {Object} [params] - Query/path parameters
 * @property {Object} [body] - Request body schema
 * @property {Object} [response] - Response schema
 */

/**
 * @typedef {Object} ApiSection
 * @property {string} title - Section title
 * @property {string} [description] - Section description
 * @property {ApiEndpoint[]} endpoints - Array of endpoints in this section
 */

/**
 * @typedef {Object} ApiDocument
 * @property {string} title - API document title
 * @property {string} [description] - API document description
 * @property {string} version - API version
 * @property {ApiSection[]} sections - API sections
 */

export {
  // Type definitions are only for documentation purposes
}; 