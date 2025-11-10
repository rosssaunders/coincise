#!/bin/bash

# Format documentation files
# Usage: ./formatdocs.sh [path]
# If path is provided, only format files in that path
# If no path is provided, format all docs

PATH_TO_FORMAT="${1:-docs/**/*}"

pnpm exec prettier --config ./.prettierrc.json --write "$PATH_TO_FORMAT" && echo "Formatting complete!"