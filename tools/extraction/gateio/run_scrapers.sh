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
    echo "----------------------------------------"
}

# Run each scraper in sequence
run_scraper "rest_api.js"
run_scraper "websocket_spot_api.js"
run_scraper "websocket_futures_docs.js"
run_scraper "websocket_perps_api.js"
run_scraper "websocket_options_api.js"
run_scraper "websocket_unified_api.js"

echo "All scrapers completed successfully!" 