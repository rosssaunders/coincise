#!/bin/bash

# Coinbase API Documentation Scraper
# This script reads a JSON config file and scrapes each URL in the list

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "Error: jq is required but not installed. Please install jq first."
  echo "On macOS: brew install jq"
  echo "On Ubuntu/Debian: sudo apt-get install jq"
  exit 1
fi

# Default config file path
CONFIG_FILE="config.json"

# Parse command line arguments
while getopts ":c:o:h" opt; do
  case ${opt} in
    c )
      CONFIG_FILE=$OPTARG
      ;;
    o )
      OUTPUT_DIR=$OPTARG
      ;;
    h )
      echo "Usage: $0 [-c config.json] [-o output_directory]"
      echo ""
      echo "Options:"
      echo "  -c CONFIG_FILE   Path to JSON config file (default: config.json)"
      echo "  -o OUTPUT_DIR    Directory to save markdown files (default: defined in config)"
      echo "  -h               Show this help message"
      exit 0
      ;;
    \? )
      echo "Invalid option: $OPTARG" 1>&2
      exit 1
      ;;
    : )
      echo "Invalid option: $OPTARG requires an argument" 1>&2
      exit 1
      ;;
  esac
done

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "Error: Config file '$CONFIG_FILE' not found."
  echo "Please create a JSON config file with the following format:"
  echo '{
  "output_directory": "output",
  "urls": [
    {
      "url": "https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_postorders",
      "filename": "post-orders"
    },
    {
      "url": "https://docs.cdp.coinbase.com/exchange/reference/exchangerestapi_getaccounts",
      "filename": "get-accounts"
    }
  ]
}'
  exit 1
fi

# Read output directory from config if not specified in command line
if [ -z "$OUTPUT_DIR" ]; then
  OUTPUT_DIR=$(jq -r '.output_directory // "output"' "$CONFIG_FILE")
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Get the number of URLs to process
URL_COUNT=$(jq '.urls | length' "$CONFIG_FILE")
echo "Found $URL_COUNT URLs to process in $CONFIG_FILE"

# Process each URL
for i in $(seq 0 $(($URL_COUNT - 1))); do
  # Extract URL and filename from config
  URL=$(jq -r ".urls[$i].url" "$CONFIG_FILE")
  FILENAME=$(jq -r ".urls[$i].filename" "$CONFIG_FILE")
  
  # If filename is not specified, generate one from the URL
  if [ "$FILENAME" == "null" ]; then
    FILENAME=$(echo "$URL" | sed -E 's/.*\/([^\/]+)$/\1/' | sed 's/[^a-zA-Z0-9]/-/g')
  fi
  
  # Add .md extension if not present
  if [[ ! "$FILENAME" =~ \.md$ ]]; then
    FILENAME="${FILENAME}.md"
  fi
  
  OUTPUT_PATH="$OUTPUT_DIR/$FILENAME"
  
  echo ""
  echo "[$((i+1))/$URL_COUNT] Processing: $URL"
  echo "Output file: $OUTPUT_PATH"
  
  # Run the scraper
  node index.js scrape "$URL" "$OUTPUT_PATH"
  
  # Check if scraping was successful
  if [ $? -eq 0 ]; then
    echo "✅ Scraping completed successfully for $URL"
  else
    echo "❌ Error scraping $URL" >&2
  fi
done

echo ""
echo "All URLs processed. Results saved to $OUTPUT_DIR/" 