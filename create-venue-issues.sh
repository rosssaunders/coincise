#!/bin/bash

# Script to create GitHub issues for all venues to ensure they match latest repository standards
#
# Usage:
#   GITHUB_TOKEN=your_token ./create-venue-issues.sh
#
# Or set GITHUB_TOKEN in environment and run:
#   ./create-venue-issues.sh

set -e

GITHUB_API="https://api.github.com"
REPO_OWNER="rosssaunders"
REPO_NAME="coincise"

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN environment variable is required"
  echo "Usage: GITHUB_TOKEN=your_token ./create-venue-issues.sh"
  exit 1
fi

# Define all venues
declare -a venues=(
  "Backpack:backpack"
  "Binance:binance"
  "BingX:bingx"
  "Bitget:bitget"
  "BitMart:bitmart"
  "Bullish:bullish"
  "Bybit:bybit"
  "Coinbase:coinbase"
  "Crypto.com:cryptocom"
  "Deribit:deribit"
  "DigiFinex:digifinex"
  "Gate.io:gateio"
  "HTX:htx"
  "Hyperliquid:hyperliquid"
  "KuCoin:kucoin"
  "MEXC:mexc"
  "OKX:okx"
  "Upbit:upbit"
  "XT:xt"
)

success_count=0
failure_count=0

echo "Creating issues for ${#venues[@]} venues..."
echo ""

for venue in "${venues[@]}"; do
  IFS=':' read -r venue_name venue_label <<< "$venue"

  title="Update ${venue_name} documentation to match latest repository standards"

  # Create issue body
  body=$(cat <<EOF
Run the venue integration process to ensure ${venue_name} documentation matches the latest repository standards defined in CLAUDE.md.

## Tasks
- [ ] Review current documentation structure against the standardized format
- [ ] Ensure all core documentation files exist (rate_limits.md, authentication.md, network_connectivity.md, error_codes.md, response_formats.md, change_log.md)
- [ ] Verify endpoints are properly organized in public/ and private/ subfolders
- [ ] Update extraction scripts if needed to match current patterns
- [ ] Run extraction script and verify output
- [ ] Ensure documentation follows semi-structured format guidelines
EOF
)

  # Create JSON payload
  json_payload=$(jq -n \
    --arg title "$title" \
    --arg body "$body" \
    --arg label1 "documentation" \
    --arg label2 "enhancement" \
    --arg label3 "$venue_label" \
    '{
      title: $title,
      body: $body,
      labels: [$label1, $label2, $label3]
    }')

  # Make API request
  response=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Content-Type: application/json" \
    -H "User-Agent: coincise-venue-issue-creator" \
    -d "$json_payload" \
    "$GITHUB_API/repos/$REPO_OWNER/$REPO_NAME/issues")

  # Extract HTTP status code (last line)
  http_code=$(echo "$response" | tail -n 1)
  # Extract response body (all but last line)
  response_body=$(echo "$response" | sed '$d')

  if [ "$http_code" -eq 201 ]; then
    issue_number=$(echo "$response_body" | jq -r '.number')
    issue_url=$(echo "$response_body" | jq -r '.html_url')
    echo "✓ Created issue #${issue_number}: ${title}"
    echo "  URL: ${issue_url}"
    echo ""
    ((success_count++))
  else
    echo "✗ Failed to create issue for ${venue_name}:"
    echo "  HTTP ${http_code}"
    echo "  Response: ${response_body}"
    echo ""
    ((failure_count++))
  fi

  # Add delay to avoid rate limiting
  sleep 1
done

echo "============================================================"
echo "Summary: ${success_count} succeeded, ${failure_count} failed"
echo "============================================================"

if [ "$failure_count" -gt 0 ]; then
  exit 1
fi
