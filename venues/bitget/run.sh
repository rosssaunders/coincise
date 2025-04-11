#!/bin/bash

# Set error handling
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies
print_status "Installing Node.js dependencies..."
(cd "$SCRIPT_DIR" && npm install)

# Directory containing the script and config files
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Array of config files to process
CONFIG_FILES=(
    "config/common.json"
    "config/spot.json"
    "config/future.json"
)

# Process each config file
for config_file in "${CONFIG_FILES[@]}"; do
    print_status "Processing $config_file..."
    
    # Construct full path to config file
    config_path="$SCRIPT_DIR/$config_file"
    
    # Check if config file exists
    if [ ! -f "$config_path" ]; then
        print_error "Config file not found: $config_path"
        continue
    fi
    
    # Run the conversion script
    if node src/index.js "$config_path"; then
        print_status "Successfully processed $config_file"
    else
        print_error "Failed to process $config_file"
        exit 1
    fi
    
    # Add a small delay between processing files
    sleep 2
done

print_status "All conversions completed successfully!" 