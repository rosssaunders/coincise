#!/bin/bash

# Exit on error
set -e

# Print commands as they are executed
set -x

# Change to script directory
cd "$(dirname "$0")"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Processing Binance documentation..."

# Process each exchange type
for exchange in binancespot binanceusdm binancecoinm binanceoptions; do
    echo "Processing $exchange..."
    node src/index.js process "$exchange"
done

echo "Done!" 