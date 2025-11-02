#!/bin/bash
# Hook to automatically format documentation files after Write/Edit operations
# Runs after Write or Edit tools complete

# Extract the file path from the tool input
FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | grep -o '"file_path":"[^"]*"' | cut -d'"' -f4)

# Check if the file is in the docs/ directory and is a markdown file
if [[ "$FILE_PATH" == *"docs/"*.md ]]; then
  # Get the project root (remove the docs/ part and everything after)
  PROJECT_ROOT="${CLAUDE_PROJECT_DIR}"

  # Run prettier on the specific file
  cd "$PROJECT_ROOT" || exit 0

  # Format the file
  if npx prettier --config ./.prettierrc --write "$FILE_PATH" 2>/dev/null; then
    echo "✓ Formatted: $FILE_PATH"
    exit 0
  else
    # If prettier fails, don't block - just report
    echo "⚠ Failed to format: $FILE_PATH"
    exit 0
  fi
fi

# Not a docs markdown file, skip formatting
exit 0
