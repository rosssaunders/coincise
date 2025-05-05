"use strict"

/**
 * @typedef {Object} Config
 * @property {string} baseUrl - The base URL for the API documentation
 * @property {string[] | number[]} numericIds - Array of numeric IDs to scrape specific content elements
 * @property {string[]} otherUrls - Array of additional URL paths to scrape
 */

/**
 * Represents the direct output of the scrapePage function.
 * @typedef {string[]} PageContent - An array of HTML strings extracted from a scraped page.
 */

/**
 * @typedef {Object} ScrapedContent
 * @property {string} url - The URL that was scraped
 * @property {string} content - The markdown content
 * @property {Date} timestamp - When the content was scraped
 */
