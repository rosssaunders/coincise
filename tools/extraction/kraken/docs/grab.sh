#!/bin/bash

# Create a directory for the downloads
mkdir -p kraken_docs

# Base URL from links.json
BASE_URL="https://docs.kraken.com/api/docs"

# Function to extract all URLs from links.json
get_urls() {
    # Extract all paths from the JSON file and combine with base URL
    jq -r '.categories[] | .[]' ../links.json | while read -r path; do
        echo "${BASE_URL}/${path}"
    done
}

# User agent string
USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Download each URL
get_urls | while read -r url; do
    echo "Downloading: $url"
    wget \
        --mirror \
        --convert-links \
        --adjust-extension \
        --page-requisites \
        --no-parent \
        --domains docs.kraken.com,support.kraken.com \
        --user-agent="$USER_AGENT" \
        --header="Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" \
        --header="Accept-Language: en-US,en;q=0.5" \
        --header="Connection: keep-alive" \
        --header="Upgrade-Insecure-Requests: 1" \
        --header="Cache-Control: max-age=0" \
        --header="TE: Trailers" \
        --header="DNT: 1" \
        --directory-prefix=kraken_docs \
        --wait=2 \
        --random-wait \
        --tries=3 \
        --retry-connrefused \
        "$url"
done

echo "Download complete. Files are saved in the kraken_docs directory."

