#!/bin/bash

# Build script for Coincise documentation website
# This script generates LLM resources, builds MkDocs site, and prepares deployment artifacts

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

log "Starting Coincise documentation build..."
log "Repository root: $REPO_ROOT"

# Step 1: Generate enhanced LLM resources
log "Step 1: Generating enhanced LLM resources..."
cd "$REPO_ROOT"
node tools/llms/generate-llms-enhanced.js
node tools/llms/generate-json-index.js

# Step 2: Install Python dependencies if needed
log "Step 2: Checking Python dependencies..."
if ! pip show mkdocs-material &> /dev/null; then
    log "Installing MkDocs dependencies..."
    pip install -r site/requirements.txt
else
    log "MkDocs dependencies already installed"
fi

# Step 3: Prepare docs directory with homepage
log "Step 3: Preparing docs directory..."
# Copy index.md to docs/ temporarily (it's in .gitignore so won't be committed)
cp "$REPO_ROOT/site/docs/index.md" "$REPO_ROOT/docs/index.md"

# Step 4: Build MkDocs site
log "Step 4: Building MkDocs site..."
cd "$REPO_ROOT/site"
# Note: Not using --strict because some source docs have broken internal links
mkdocs build

# Clean up temporary index.md from docs/
rm -f "$REPO_ROOT/docs/index.md"

# Step 5: Copy LLM resources to dist
log "Step 5: Copying LLM resources to dist..."
cd "$REPO_ROOT"

# Copy root llms.txt files
cp llms.txt dist/
cp llms-full.txt dist/

# Create .well-known directory and copy llms.txt
mkdir -p dist/.well-known
cp llms.txt dist/.well-known/llms.txt

# Create api directory and copy JSON index
mkdir -p dist/api
cp api-index.json dist/api/index.json

# Step 6: Copy raw markdown files
log "Step 6: Copying raw markdown files..."
mkdir -p dist/raw
cp -r docs/* dist/raw/

# Step 7: Create a simple index for raw files
log "Step 7: Creating raw files index..."
cat > dist/raw/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Raw Markdown Files - Coincise</title>
    <meta http-equiv="refresh" content="0;url=../llms.txt">
</head>
<body>
    <p>Redirecting to <a href="../llms.txt">llms.txt</a>...</p>
</body>
</html>
EOF

# Step 8: Display statistics
log "Build complete!"
log "Statistics:"
echo "  - dist/ size: $(du -sh dist | cut -f1)"
echo "  - llms.txt: $(wc -l < dist/llms.txt) lines"
echo "  - llms-full.txt: $(wc -l < dist/llms-full.txt) lines"
echo "  - api/index.json: $(wc -c < dist/api/index.json | xargs) bytes"
echo "  - Raw markdown files: $(find dist/raw -name '*.md' | wc -l | xargs) files"

log "Output directory: $REPO_ROOT/dist/"
log "Ready for deployment!"
