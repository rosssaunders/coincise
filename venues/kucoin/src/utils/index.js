'use strict';

import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

/**
 * Creates a configured TurndownService instance
 * @returns {TurndownService} Configured TurndownService
 */
export const createTurndownService = () => {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_'
  });
  
  turndownService.use(gfm);
  
  return turndownService;
};

/**
 * Helper to parse HTML string to DOM
 * @param {string} html HTML string to parse
 * @returns {Document} Parsed DOM document
 */
export const parseHtml = (html) => {
  const dom = new JSDOM(html);
  return dom.window.document;
};

/**
 * Converts HTML string to Markdown
 * @param {string} html HTML string to convert
 * @returns {string} Converted markdown
 */
export const htmlToMarkdown = (html) => {
  const turndownService = createTurndownService();
  return turndownService.turndown(html);
};

/**
 * Delays execution for specified milliseconds
 * @param {number} ms Milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after delay
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Cleans up text by removing extra spaces and normalizing whitespace
 * @param {string} text Text to clean
 * @returns {string} Cleaned text
 */
export const cleanText = (text) => {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}; 