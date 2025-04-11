#!/bin/bash

# Function to run a scraper and check for errors
run_scraper() {
    echo "Running $1..."
    node "$1"
    if [ $? -ne 0 ]; then
        echo "Error running $1"
        exit 1
    fi
    echo "Completed $1 successfully"
    echo "-------------------------------------------"
}

# Run each scraper in sequence
scrapers=(
    "src/rest_api.js"
    "src/websocket_spot_api.js"
    "src/websocket_futures_docs.js"
    "src/websocket_perps_api.js"
    "src/websocket_options_api.js"
    "src/websocket_unified_api.js"
)

for scraper in "${scrapers[@]}"; do
    run_scraper "$scraper"
    echo "Finished running $scraper"
    echo "----------------------------------------"
    echo ""
done

echo "All scrapers completed successfully!" 