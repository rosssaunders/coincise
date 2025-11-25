#!/usr/bin/env node

/**
 * JSON Index Generator for Coincise crypto API documentation
 *
 * Generates:
 * - api-index.json - Machine-readable documentation index
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const REPO_ROOT = path.resolve(__dirname, '../..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const BASE_URL = 'https://rosssaunders.github.io/coincise';

// Token estimation: ~4 characters per token
const CHARS_PER_TOKEN = 4;

/**
 * Estimate token count from content length
 */
const estimateTokens = (content) => {
  return Math.round(content.length / CHARS_PER_TOKEN);
};

/**
 * Extract summary from markdown content
 */
const extractSummary = (content) => {
  const lines = content.split('\n');
  let foundTitle = false;
  let summary = '';

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) continue;
    if (trimmed.startsWith('#')) {
      foundTitle = true;
      continue;
    }

    if (trimmed.startsWith('**Source:**') || trimmed.startsWith('Source:')) {
      continue;
    }

    if (trimmed.startsWith('##')) {
      if (trimmed.includes('Authentication') || trimmed.includes('Rate Limit')) {
        break;
      }
      continue;
    }

    if (foundTitle && trimmed.length > 10) {
      summary = trimmed
        .replace(/\*\*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`/g, '')
        .substring(0, 120);

      if (summary.length >= 115) {
        summary = summary.substring(0, 115) + '...';
      }
      break;
    }
  }

  return summary || 'API documentation';
};

/**
 * Extract HTTP method from filename or content
 */
const extractHttpMethod = (filename, content) => {
  const name = filename.toLowerCase();

  if (name.startsWith('get_') || name.startsWith('get-')) return 'GET';
  if (name.startsWith('post_') || name.startsWith('post-')) return 'POST';
  if (name.startsWith('put_') || name.startsWith('put-')) return 'PUT';
  if (name.startsWith('delete_') || name.startsWith('delete-')) return 'DELETE';
  if (name.startsWith('patch_') || name.startsWith('patch-')) return 'PATCH';

  const titleMatch = content.match(/^#\s*(GET|POST|PUT|DELETE|PATCH)/im);
  if (titleMatch) return titleMatch[1];

  return null;
};

/**
 * Extract API path from content
 */
const extractApiPath = (content) => {
  // Look for patterns like /api/v1/something or endpoint paths
  const pathMatch = content.match(/(?:HTTP Request|Endpoint|URL|Path)[:\s]*`?([A-Z]+)?\s*(\/[a-zA-Z0-9\/_\-{}]+)`?/i);
  if (pathMatch) {
    return pathMatch[2];
  }

  // Try to find path in code blocks
  const codeMatch = content.match(/(?:GET|POST|PUT|DELETE|PATCH)\s+(\/[a-zA-Z0-9\/_\-{}]+)/);
  if (codeMatch) {
    return codeMatch[1];
  }

  return null;
};

/**
 * Categorize endpoint by its functionality
 */
const categorizeEndpoint = (filename, content) => {
  const name = filename.toLowerCase();
  const contentLower = content.toLowerCase();

  // Trading
  if (name.includes('order') || name.includes('trade') || name.includes('position')) {
    return 'trading';
  }

  // Market data
  if (name.includes('ticker') || name.includes('orderbook') || name.includes('kline') ||
      name.includes('candle') || name.includes('depth') || name.includes('price') ||
      name.includes('market') || name.includes('trades')) {
    return 'market_data';
  }

  // Account
  if (name.includes('account') || name.includes('balance') || name.includes('wallet') ||
      name.includes('asset')) {
    return 'account';
  }

  // Funding
  if (name.includes('deposit') || name.includes('withdraw') || name.includes('transfer')) {
    return 'funding';
  }

  // WebSocket
  if (name.includes('websocket') || name.includes('stream') || contentLower.includes('websocket')) {
    return 'websocket';
  }

  return 'other';
};

/**
 * Categorize document type
 */
const getDocumentType = (relativePath, filename) => {
  const pathLower = relativePath.toLowerCase();
  const nameLower = filename.toLowerCase();

  if (nameLower === 'authentication.md') return 'authentication';
  if (nameLower === 'rate_limits.md') return 'rate_limits';
  if (nameLower === 'error_codes.md') return 'error_codes';
  if (nameLower === 'network_connectivity.md') return 'network_connectivity';
  if (nameLower === 'response_formats.md') return 'response_formats';
  if (nameLower === 'change_log.md') return 'change_log';

  if (pathLower.includes('/endpoints/private/') || pathLower.includes('/private/')) {
    return 'private_endpoint';
  }
  if (pathLower.includes('/endpoints/public/') || pathLower.includes('/public/')) {
    return 'public_endpoint';
  }

  return 'general';
};

/**
 * Get all markdown files recursively
 */
const getMarkdownFiles = (dir, baseDir = dir) => {
  const files = [];

  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.md')) {
      const relativePath = path.relative(baseDir, fullPath);
      files.push({
        fullPath,
        relativePath,
        filename: entry.name
      });
    }
  }

  return files;
};

/**
 * Format filename as readable title
 */
const formatTitle = (filename) => {
  return filename
    .replace('.md', '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get exchange display name
 */
const getExchangeName = (slug) => {
  const names = {
    'backpack': 'Backpack',
    'binance': 'Binance',
    'bingx': 'BingX',
    'bitfinex': 'Bitfinex',
    'bitget': 'Bitget',
    'bitmart': 'BitMart',
    'bullish': 'Bullish',
    'bybit': 'Bybit',
    'coinbase': 'Coinbase',
    'cryptocom': 'Crypto.com',
    'deribit': 'Deribit',
    'digifinex': 'DigiFinex',
    'gateio': 'Gate.io',
    'htx': 'HTX',
    'hyperliquid': 'Hyperliquid',
    'kucoin': 'KuCoin',
    'mexc': 'MEXC',
    'okx': 'OKX',
    'upbit': 'Upbit',
    'xt': 'XT.com'
  };
  return names[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1);
};

/**
 * Build the JSON index
 */
const buildJsonIndex = () => {
  const exchangeDirs = fs.readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  const exchanges = [];
  let totalDocuments = 0;
  let totalEstimatedTokens = 0;

  for (const exchangeSlug of exchangeDirs) {
    const exchangeDir = path.join(DOCS_DIR, exchangeSlug);
    const files = getMarkdownFiles(exchangeDir);

    const general = [];
    const endpoints = [];

    for (const file of files) {
      const content = fs.readFileSync(file.fullPath, 'utf-8');
      const tokens = estimateTokens(content);
      const summary = extractSummary(content);
      const docType = getDocumentType(file.relativePath, file.filename);
      const httpMethod = extractHttpMethod(file.filename, content);
      const apiPath = extractApiPath(content);
      const category = categorizeEndpoint(file.filename, content);

      totalDocuments++;
      totalEstimatedTokens += tokens;

      const doc = {
        title: formatTitle(file.filename),
        path: file.relativePath,
        htmlUrl: `${BASE_URL}/${exchangeSlug}/${file.relativePath.replace('.md', '/')}`,
        rawUrl: `${BASE_URL}/raw/${exchangeSlug}/${file.relativePath}`,
        summary,
        estimatedTokens: tokens
      };

      if (docType.includes('endpoint')) {
        endpoints.push({
          ...doc,
          method: httpMethod,
          apiPath,
          type: docType === 'private_endpoint' ? 'private' : 'public',
          category
        });
      } else {
        general.push({
          ...doc,
          type: docType
        });
      }
    }

    // Sort by title
    general.sort((a, b) => a.title.localeCompare(b.title));
    endpoints.sort((a, b) => a.title.localeCompare(b.title));

    exchanges.push({
      id: exchangeSlug,
      name: getExchangeName(exchangeSlug),
      slug: exchangeSlug,
      documentCount: files.length,
      general,
      endpoints
    });
  }

  return {
    version: '1.0.0',
    generated: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalDocuments,
    totalEstimatedTokens,
    exchanges
  };
};

/**
 * Main function
 */
const main = () => {
  console.log('Generating JSON index...');

  const index = buildJsonIndex();

  console.log(`Indexed ${index.totalDocuments} documents across ${index.exchanges.length} exchanges`);
  console.log(`Estimated total tokens: ${(index.totalEstimatedTokens / 1000000).toFixed(2)}M`);

  const outputPath = path.join(REPO_ROOT, 'api-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

  const fileSize = fs.statSync(outputPath).size;
  console.log(`Generated api-index.json (${(fileSize / 1024).toFixed(1)} KB)`);
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { buildJsonIndex };
