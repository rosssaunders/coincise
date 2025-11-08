#!/usr/bin/env node

/**
 * Script to create GitHub issues for all venues to ensure they match latest repository standards
 *
 * Usage:
 *   GITHUB_TOKEN=your_token node create-venue-issues.js
 *
 * Or set GITHUB_TOKEN in environment and run:
 *   node create-venue-issues.js
 */

import { readdir } from 'fs/promises';
import { join } from 'path';

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'rosssaunders'; // Update if needed
const REPO_NAME = 'coincise'; // Update if needed

const venues = [
  { name: 'Backpack', folder: 'backpack', label: 'backpack' },
  { name: 'Binance', folder: 'binance', label: 'binance' },
  { name: 'BingX', folder: 'bingx', label: 'bingx' },
  { name: 'Bitget', folder: 'bitget', label: 'bitget' },
  { name: 'BitMart', folder: 'bitmart', label: 'bitmart' },
  { name: 'Bullish', folder: 'bullish', label: 'bullish' },
  { name: 'Bybit', folder: 'bybit', label: 'bybit' },
  { name: 'Coinbase', folder: 'coinbase', label: 'coinbase' },
  { name: 'Crypto.com', folder: 'cryptocom', label: 'cryptocom' },
  { name: 'Deribit', folder: 'deribit', label: 'deribit' },
  { name: 'DigiFinex', folder: 'digifinex', label: 'digifinex' },
  { name: 'Gate.io', folder: 'gateio', label: 'gateio' },
  { name: 'HTX', folder: 'htx', label: 'htx' },
  { name: 'Hyperliquid', folder: 'hyperliquid', label: 'hyperliquid' },
  { name: 'KuCoin', folder: 'kucoin', label: 'kucoin' },
  { name: 'MEXC', folder: 'mexc', label: 'mexc' },
  { name: 'OKX', folder: 'okx', label: 'okx' },
  { name: 'Upbit', folder: 'upbit', label: 'upbit' },
  { name: 'XT', folder: 'xt', label: 'xt' }
];

function createIssueBody(venueName) {
  return `Run the venue integration process to ensure ${venueName} documentation matches the latest repository standards defined in CLAUDE.md.

## Tasks
- [ ] Review current documentation structure against the standardized format
- [ ] Ensure all core documentation files exist (rate_limits.md, authentication.md, network_connectivity.md, error_codes.md, response_formats.md, change_log.md)
- [ ] Verify endpoints are properly organized in public/ and private/ subfolders
- [ ] Update extraction scripts if needed to match current patterns
- [ ] Run extraction script and verify output
- [ ] Ensure documentation follows semi-structured format guidelines`;
}

async function createGitHubIssue(token, venue) {
  const title = `Update ${venue.name} documentation to match latest repository standards`;
  const body = createIssueBody(venue.name);
  const labels = ['documentation', 'enhancement', venue.label];

  const response = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'coincise-venue-issue-creator'
    },
    body: JSON.stringify({
      title,
      body,
      labels
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create issue for ${venue.name}: ${response.status} ${errorText}`);
  }

  const issue = await response.json();
  return issue;
}

async function main() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('Error: GITHUB_TOKEN environment variable is required');
    console.error('Usage: GITHUB_TOKEN=your_token node create-venue-issues.js');
    process.exit(1);
  }

  console.log(`Creating issues for ${venues.length} venues...\n`);

  let successCount = 0;
  let failureCount = 0;

  for (const venue of venues) {
    try {
      const issue = await createGitHubIssue(token, venue);
      console.log(`✓ Created issue #${issue.number}: ${issue.title}`);
      console.log(`  URL: ${issue.html_url}\n`);
      successCount++;

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Failed to create issue for ${venue.name}:`);
      console.error(`  ${error.message}\n`);
      failureCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Summary: ${successCount} succeeded, ${failureCount} failed`);
  console.log('='.repeat(60));

  if (failureCount > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  console.error('Stack trace:', error.stack);
  process.exit(1);
});
