#!/usr/bin/env node

/**
 * Enhanced llms.txt generator for Coincise crypto API documentation
 *
 * Generates:
 * - llms.txt - Hierarchical overview with exchange sections
 * - llms-full.txt - Complete index with summaries and token estimates
 * - Per-exchange llms.txt files in docs/{exchange}/
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

// Token estimation: ~4 characters per token (rough approximation)
const CHARS_PER_TOKEN = 4;

/**
 * Estimate token count from content length
 */
const estimateTokens = (content) => {
  return Math.round(content.length / CHARS_PER_TOKEN);
};

/**
 * Extract summary from markdown content
 * Looks for description after the title or first meaningful paragraph
 */
const extractSummary = (content) => {
  const lines = content.split('\n');
  let foundTitle = false;
  let summary = '';

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines and title
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) {
      foundTitle = true;
      continue;
    }

    // Skip source links
    if (trimmed.startsWith('**Source:**') || trimmed.startsWith('Source:')) {
      continue;
    }

    // Skip section headers that aren't descriptions
    if (trimmed.startsWith('##')) {
      // If we hit Authentication or Rate Limit before finding content, break
      if (trimmed.includes('Authentication') || trimmed.includes('Rate Limit')) {
        break;
      }
      continue;
    }

    // Found content after title
    if (foundTitle && trimmed.length > 10) {
      // Clean up markdown formatting
      summary = trimmed
        .replace(/\*\*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/`/g, '')
        .substring(0, 150);

      if (summary.length >= 140) {
        summary = summary.substring(0, 140) + '...';
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

  // Try to extract from content title
  const titleMatch = content.match(/^#\s*(GET|POST|PUT|DELETE|PATCH)/im);
  if (titleMatch) return titleMatch[1];

  return null;
};

/**
 * Categorize document type
 */
const categorizeDocument = (relativePath, filename) => {
  const pathLower = relativePath.toLowerCase();
  const nameLower = filename.toLowerCase();

  // Core documentation files
  if (nameLower === 'authentication.md') return 'general';
  if (nameLower === 'rate_limits.md') return 'general';
  if (nameLower === 'error_codes.md') return 'general';
  if (nameLower === 'network_connectivity.md') return 'general';
  if (nameLower === 'response_formats.md') return 'general';
  if (nameLower === 'change_log.md') return 'general';

  // Endpoints
  if (pathLower.includes('/endpoints/private/')) return 'private';
  if (pathLower.includes('/endpoints/public/')) return 'public';
  if (pathLower.includes('/private/')) return 'private';
  if (pathLower.includes('/public/')) return 'public';

  return 'general';
};

/**
 * Get all markdown files in a directory recursively
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
 * Process all documentation and build index
 */
const buildDocumentationIndex = () => {
  const exchanges = [];
  const exchangeDirs = fs.readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  let totalDocs = 0;
  let totalTokens = 0;

  for (const exchangeSlug of exchangeDirs) {
    const exchangeDir = path.join(DOCS_DIR, exchangeSlug);
    const files = getMarkdownFiles(exchangeDir);

    const exchange = {
      slug: exchangeSlug,
      name: getExchangeName(exchangeSlug),
      documents: [],
      general: [],
      publicEndpoints: [],
      privateEndpoints: []
    };

    for (const file of files) {
      const content = fs.readFileSync(file.fullPath, 'utf-8');
      const tokens = estimateTokens(content);
      const summary = extractSummary(content);
      const category = categorizeDocument(file.relativePath, file.filename);
      const httpMethod = extractHttpMethod(file.filename, content);

      const doc = {
        filename: file.filename,
        relativePath: file.relativePath,
        title: formatTitle(file.filename),
        summary,
        tokens,
        category,
        httpMethod,
        rawUrl: `/raw/${exchangeSlug}/${file.relativePath}`,
        htmlUrl: `/docs/${exchangeSlug}/${file.relativePath.replace('.md', '/')}`
      };

      exchange.documents.push(doc);
      totalTokens += tokens;

      if (category === 'general') {
        exchange.general.push(doc);
      } else if (category === 'private') {
        exchange.privateEndpoints.push(doc);
      } else {
        exchange.publicEndpoints.push(doc);
      }
    }

    totalDocs += exchange.documents.length;

    // Sort documents within categories
    exchange.general.sort((a, b) => a.title.localeCompare(b.title));
    exchange.publicEndpoints.sort((a, b) => a.title.localeCompare(b.title));
    exchange.privateEndpoints.sort((a, b) => a.title.localeCompare(b.title));

    exchanges.push(exchange);
  }

  return { exchanges, totalDocs, totalTokens };
};

/**
 * Generate root llms.txt (overview)
 */
const generateRootLlmsTxt = (index) => {
  const lines = [
    '# Coincise - Crypto API Documentation',
    '',
    `> LLM-friendly cryptocurrency exchange API documentation covering ${index.exchanges.length} exchanges`,
    `> with ${index.totalDocs.toLocaleString()} endpoint documents optimized for context windows.`,
    '',
    'This repository provides clean markdown documentation for major crypto exchange APIs.',
    'Documentation is updated weekly and structured for optimal LLM consumption.',
    '',
    '## Quick Access',
    '',
    `- [Complete Index with Summaries](${BASE_URL}/llms-full.txt): All ${index.totalDocs.toLocaleString()} documents with summaries`,
    `- [JSON Metadata Index](${BASE_URL}/api/index.json): Machine-readable documentation index`,
    `- [Raw Markdown Files](${BASE_URL}/raw/): Direct markdown access`,
    '',
    '## Exchanges',
    ''
  ];

  for (const exchange of index.exchanges) {
    lines.push(`### ${exchange.name}`);
    lines.push('');
    lines.push(`${exchange.documents.length} documents | ~${(exchange.documents.reduce((sum, d) => sum + d.tokens, 0) / 1000).toFixed(0)}k tokens`);
    lines.push('');

    // Link to general docs
    if (exchange.general.length > 0) {
      lines.push('**General:**');
      for (const doc of exchange.general.slice(0, 6)) {
        lines.push(`- [${doc.title}](${BASE_URL}${doc.rawUrl})`);
      }
      lines.push('');
    }

    // Summary of endpoints
    if (exchange.publicEndpoints.length > 0 || exchange.privateEndpoints.length > 0) {
      lines.push(`**Endpoints:** ${exchange.publicEndpoints.length} public, ${exchange.privateEndpoints.length} private`);
      lines.push('');
    }
  }

  return lines.join('\n');
};

/**
 * Generate llms-full.txt (complete index with summaries)
 */
const generateFullLlmsTxt = (index) => {
  const date = new Date().toISOString().split('T')[0];

  const lines = [
    '# Coincise - Complete Documentation Index',
    '',
    `> ${index.totalDocs.toLocaleString()} API documentation files | ~${(index.totalTokens / 1000000).toFixed(1)}M estimated tokens | Updated: ${date}`,
    '',
    'Complete index of all cryptocurrency exchange API documentation with summaries and token estimates.',
    ''
  ];

  for (const exchange of index.exchanges) {
    lines.push(`## ${exchange.name}`);
    lines.push('');

    // General documentation
    if (exchange.general.length > 0) {
      lines.push('### General Documentation');
      lines.push('');
      for (const doc of exchange.general) {
        lines.push(`- [${doc.title}](${BASE_URL}${doc.rawUrl}): ${doc.summary} (~${doc.tokens.toLocaleString()} tokens)`);
      }
      lines.push('');
    }

    // Public endpoints
    if (exchange.publicEndpoints.length > 0) {
      lines.push('### Public Endpoints');
      lines.push('');
      for (const doc of exchange.publicEndpoints) {
        const method = doc.httpMethod ? `${doc.httpMethod} ` : '';
        lines.push(`- [${method}${doc.title}](${BASE_URL}${doc.rawUrl}): ${doc.summary} (~${doc.tokens.toLocaleString()} tokens)`);
      }
      lines.push('');
    }

    // Private endpoints
    if (exchange.privateEndpoints.length > 0) {
      lines.push('### Private Endpoints');
      lines.push('');
      for (const doc of exchange.privateEndpoints) {
        const method = doc.httpMethod ? `${doc.httpMethod} ` : '';
        lines.push(`- [${method}${doc.title}](${BASE_URL}${doc.rawUrl}): ${doc.summary} (~${doc.tokens.toLocaleString()} tokens)`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
};

/**
 * Generate per-exchange llms.txt
 */
const generateExchangeLlmsTxt = (exchange) => {
  const totalTokens = exchange.documents.reduce((sum, d) => sum + d.tokens, 0);

  const lines = [
    `# ${exchange.name} API Documentation`,
    '',
    `> ${exchange.documents.length} documentation files | ~${(totalTokens / 1000).toFixed(0)}k tokens`,
    ''
  ];

  // General documentation
  if (exchange.general.length > 0) {
    lines.push('## General Documentation');
    lines.push('');
    for (const doc of exchange.general) {
      lines.push(`- [${doc.title}](${BASE_URL}${doc.rawUrl}): ${doc.summary}`);
    }
    lines.push('');
  }

  // Public endpoints
  if (exchange.publicEndpoints.length > 0) {
    lines.push('## Public Endpoints');
    lines.push('');
    for (const doc of exchange.publicEndpoints) {
      const method = doc.httpMethod ? `${doc.httpMethod} ` : '';
      lines.push(`- [${method}${doc.title}](${BASE_URL}${doc.rawUrl})`);
    }
    lines.push('');
  }

  // Private endpoints
  if (exchange.privateEndpoints.length > 0) {
    lines.push('## Private Endpoints');
    lines.push('');
    for (const doc of exchange.privateEndpoints) {
      const method = doc.httpMethod ? `${doc.httpMethod} ` : '';
      lines.push(`- [${method}${doc.title}](${BASE_URL}${doc.rawUrl})`);
    }
    lines.push('');
  }

  return lines.join('\n');
};

/**
 * Main function
 */
const main = () => {
  console.log('Generating enhanced llms.txt files...');

  // Build documentation index
  console.log('Scanning documentation...');
  const index = buildDocumentationIndex();
  console.log(`Found ${index.totalDocs} documents across ${index.exchanges.length} exchanges`);
  console.log(`Estimated total tokens: ${(index.totalTokens / 1000000).toFixed(2)}M`);

  // Generate root llms.txt
  console.log('Generating llms.txt...');
  const rootLlmsTxt = generateRootLlmsTxt(index);
  fs.writeFileSync(path.join(REPO_ROOT, 'llms.txt'), rootLlmsTxt);

  // Generate llms-full.txt
  console.log('Generating llms-full.txt...');
  const fullLlmsTxt = generateFullLlmsTxt(index);
  fs.writeFileSync(path.join(REPO_ROOT, 'llms-full.txt'), fullLlmsTxt);

  // Generate per-exchange llms.txt files
  console.log('Generating per-exchange llms.txt files...');
  for (const exchange of index.exchanges) {
    const exchangeLlmsTxt = generateExchangeLlmsTxt(exchange);
    const outputPath = path.join(DOCS_DIR, exchange.slug, 'llms.txt');
    fs.writeFileSync(outputPath, exchangeLlmsTxt);
  }

  console.log('Done! Generated:');
  console.log(`  - llms.txt (${(rootLlmsTxt.length / 1024).toFixed(1)} KB)`);
  console.log(`  - llms-full.txt (${(fullLlmsTxt.length / 1024).toFixed(1)} KB)`);
  console.log(`  - ${index.exchanges.length} exchange-specific llms.txt files`);
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { buildDocumentationIndex, generateRootLlmsTxt, generateFullLlmsTxt, generateExchangeLlmsTxt };
