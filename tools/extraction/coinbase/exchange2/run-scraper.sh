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

# Combine all markdown files into a single file
COMBINED_FILE="$OUTPUT_DIR/combined_api_documentation.md"
echo "Combining all markdown files into $COMBINED_FILE..."

# Create a new file with a header
echo "# Coinbase Exchange API Documentation" > "$COMBINED_FILE"
echo "" >> "$COMBINED_FILE"
echo "Generated on $(date)" >> "$COMBINED_FILE"
echo "" >> "$COMBINED_FILE"

# Create a table of contents
echo "## Table of Contents" >> "$COMBINED_FILE"
echo "" >> "$COMBINED_FILE"

# Loop through each markdown file to build the TOC
for md_file in "$OUTPUT_DIR"/*.md; do
  # Skip the combined file itself
  if [ "$(basename "$md_file")" == "$(basename "$COMBINED_FILE")" ]; then
    continue
  fi
  
  # Extract the title from the first heading in the file
  TITLE=$(grep -m 1 "^#" "$md_file" | sed 's/^#\+\s*//')
  if [ -z "$TITLE" ]; then
    # If no heading found, use the filename without extension
    TITLE=$(basename "$md_file" .md)
  fi
  
  # Generate an anchor link from the title
  ANCHOR=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-\|-$//g')
  
  # Add an entry to the TOC
  echo "* [$TITLE](#$ANCHOR)" >> "$COMBINED_FILE"
done

echo "" >> "$COMBINED_FILE"
echo "---" >> "$COMBINED_FILE"
echo "" >> "$COMBINED_FILE"

# Loop through each markdown file and append its contents
for md_file in "$OUTPUT_DIR"/*.md; do
  # Skip the combined file itself
  if [ "$(basename "$md_file")" == "$(basename "$COMBINED_FILE")" ]; then
    continue
  fi
  
  echo "Adding $(basename "$md_file") to combined file..."
  
  # Extract the title for section header
  TITLE=$(grep -m 1 "^#" "$md_file" | sed 's/^#\+\s*//')
  if [ -z "$TITLE" ]; then
    TITLE=$(basename "$md_file" .md)
  fi
  
  # Add a section divider and title
  echo "# $TITLE" >> "$COMBINED_FILE"
  echo "" >> "$COMBINED_FILE"
  
  # Append the file content, skipping the first heading (already used as section title)
  tail -n +2 "$md_file" | sed '/^$/N;/^\n$/D' >> "$COMBINED_FILE"
  
  # Add a separator between files
  echo "" >> "$COMBINED_FILE"
  echo "---" >> "$COMBINED_FILE"
  echo "" >> "$COMBINED_FILE"
done

echo "✅ Combined API documentation created at $COMBINED_FILE" 