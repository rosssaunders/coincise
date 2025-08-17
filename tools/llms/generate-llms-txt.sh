#!/bin/bash

# Generate llms.txt file for the Coincise crypto API documentation repository
# Following the llms.txt specification from https://llmstxt.org/

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
OUTPUT_FILE="$REPO_ROOT/llms.txt"
DOCS_DIR="$REPO_ROOT/docs"
BASE_URL="https://github.com/rosssaunders/coincise/blob/main"
VERBOSE=false
DRY_RUN=false

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                usage
                exit 0
                ;;
            -o|--output)
                OUTPUT_FILE="$2"
                shift 2
                ;;
            -u|--url)
                BASE_URL="$2"
                shift 2
                ;;
            -v|--verbose)
                VERBOSE=true
                shift
                ;;
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            *)
                echo "Unknown option: $1" >&2
                usage >&2
                exit 1
                ;;
        esac
    done
}

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2
}

# Function to print usage information
usage() {
    cat << EOF
Usage: $0 [OPTIONS]

Generate an llms.txt file for the Coincise crypto API documentation repository.
Follows the llms.txt specification from https://llmstxt.org/

OPTIONS:
    -h, --help          Show this help message
    -o, --output FILE   Output file path (default: repository root/llms.txt)
    -u, --url URL       Base URL for links (default: GitHub repository URL)
    -v, --verbose       Enable verbose output
    --dry-run           Show what would be generated without writing file

EXAMPLES:
    $0                                          # Generate llms.txt in repository root
    $0 -o /path/to/custom.txt                  # Custom output file
    $0 --url https://example.com/docs          # Custom base URL
    $0 --dry-run                               # Preview without writing
EOF
}

# Function to generate the llms.txt content
generate_llms_txt() {
    log "Starting llms.txt generation..."
    
    # Check if docs directory exists
    if [[ ! -d "$DOCS_DIR" ]]; then
        log "Error: docs directory not found at $DOCS_DIR"
        exit 1
    fi
    
    # Create temporary file if not dry run
    local temp_file
    if [[ "$DRY_RUN" == true ]]; then
        temp_file="/dev/stdout"
    else
        temp_file=$(mktemp)
    fi
    
    # Start building the content
    cat > "$temp_file" << 'EOF'
# Coincise - Crypto API Documentation

> LLM-friendly versions of cryptocurrency exchange API documentation. Each file is optimized to fit within LLM context windows, enabling analysts, developers, and engineers to leverage AI tools effectively when working with crypto exchange APIs.

This repository contains comprehensive API documentation for major cryptocurrency exchanges, converted to clean markdown format. The documentation covers REST APIs, WebSocket APIs, and trading protocols across spot, futures, options, and margin trading for multiple exchanges.

Key features:
- Context-window optimized for LLM consumption
- Clean markdown format without HTML/JavaScript clutter  
- Comprehensive coverage of major crypto exchanges
- Regularly updated documentation
- Standardized structure across all exchanges

## Core Documentation

EOF

    # Find all markdown files in docs directory and group by exchange
    declare -A exchanges
    
    while IFS= read -r -d '' file; do
        # Get relative path from docs directory
        rel_path="${file#$DOCS_DIR/}"
        
        # Extract exchange name (first directory)
        exchange=$(echo "$rel_path" | cut -d'/' -f1)
        
        # Skip if not a proper exchange directory
        if [[ "$exchange" == "." || "$exchange" == "" ]]; then
            continue
        fi
        
        # Store file in exchange array
        if [[ -z "${exchanges[$exchange]:-}" ]]; then
            exchanges[$exchange]="$rel_path"
        else
            exchanges[$exchange]="${exchanges[$exchange]}|$rel_path"
        fi
    done < <(find "$DOCS_DIR" -name "*.md" -type f -print0)
    
    # Sort exchanges alphabetically
    for exchange in $(printf '%s\n' "${!exchanges[@]}" | sort); do
        echo "" >> "$temp_file"
        echo "### ${exchange^}" >> "$temp_file"
        echo "" >> "$temp_file"
        
        # Split files for this exchange and sort them
        IFS='|' read -ra files <<< "${exchanges[$exchange]}"
        
        # Sort files and process them
        printf '%s\n' "${files[@]}" | sort | while read -r file; do
            # Create a descriptive name from the file path
            filename=$(basename "$file" .md)
            subdir=$(dirname "$file" | cut -d'/' -f2-)
            
            # Create a readable title
            if [[ "$subdir" == "$exchange" ]]; then
                # File is directly in exchange directory
                title=$(echo "$filename" | sed 's/_/ /g' | sed 's/\b\w/\u&/g')
            else
                # File is in subdirectory
                subdir_clean=$(echo "$subdir" | sed 's/_/ /g' | sed 's/\b\w/\u&/g')
                title_clean=$(echo "$filename" | sed 's/_/ /g' | sed 's/\b\w/\u&/g')
                title="$subdir_clean - $title_clean"
            fi
            
            # Generate the URL
            url="$BASE_URL/docs/$file"
            
            echo "- [$title]($url)" >> "$temp_file"
        done
    done
    
    # Add additional sections
    cat >> "$temp_file" << 'EOF'
EOF

    # If not dry run, move temp file to final location
    if [[ "$DRY_RUN" != true ]]; then
        mv "$temp_file" "$OUTPUT_FILE"
        log "llms.txt generated successfully at $OUTPUT_FILE"
    else
        log "Dry run completed - no file written"
    fi
}

# Function to validate the generated file
validate_llms_txt() {
    if [[ "$DRY_RUN" == true ]]; then
        log "Skipping validation in dry run mode"
        return 0
    fi
    
    log "Validating generated llms.txt..."
    
    if [[ ! -f "$OUTPUT_FILE" ]]; then
        log "Error: Output file was not created"
        exit 1
    fi
    
    # Check if file has content
    if [[ ! -s "$OUTPUT_FILE" ]]; then
        log "Error: Output file is empty"
        exit 1
    fi
    
    # Check for required sections
    if ! grep -q "^# Coincise" "$OUTPUT_FILE"; then
        log "Error: Missing main title"
        exit 1
    fi
    
    if ! grep -q "^>" "$OUTPUT_FILE"; then
        log "Error: Missing blockquote description"
        exit 1
    fi
    
    if ! grep -q "^## Core Documentation" "$OUTPUT_FILE"; then
        log "Error: Missing Core Documentation section"
        exit 1
    fi
    
    # Count the number of links
    link_count=$(grep -c "^\- \[.*\](.*)" "$OUTPUT_FILE" || true)
    log "Found $link_count documentation links"
    
    if [[ $link_count -lt 10 ]]; then
        log "Warning: Only found $link_count links, expected more"
    fi
    
    log "Validation completed successfully"
}

# Function to display statistics
show_stats() {
    if [[ "$DRY_RUN" == true ]]; then
        log "Statistics not available in dry run mode"
        return 0
    fi
    
    log "Statistics:"
    echo "  File size: $(wc -c < "$OUTPUT_FILE") bytes"
    echo "  Line count: $(wc -l < "$OUTPUT_FILE") lines"
    echo "  Documentation links: $(grep -c "^\- \[.*\](.*)" "$OUTPUT_FILE" || echo "0")"
    echo "  Exchanges covered: $(grep -c "^### " "$OUTPUT_FILE" || echo "0")"
}

# Main execution
main() {
    parse_args "$@"
    
    log "Generating llms.txt for Coincise repository"
    [[ "$VERBOSE" == true ]] && log "Configuration: OUTPUT_FILE=$OUTPUT_FILE, BASE_URL=$BASE_URL, DRY_RUN=$DRY_RUN"
    
    generate_llms_txt
    validate_llms_txt
    show_stats
    
    if [[ "$DRY_RUN" != true ]]; then
        log "llms.txt generation completed successfully!"
        log "File location: $OUTPUT_FILE"
        log "You can now reference this file to help LLMs understand your documentation structure."
    fi
}

# Only run main() if this script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
