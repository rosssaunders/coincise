#!/bin/bash
#
# Hook to prevent Claude from modifying documentation files
# This blocks Write and Edit operations on any .md files under docs/
#

# Check if this is a Write or Edit tool call
if echo "$CLAUDE_TOOL_USE" | grep -qE '"name":"(Write|Edit)"'; then
  # Check if the file path is under docs/ and is a markdown file
  if echo "$CLAUDE_TOOL_USE" | grep -qE '"file_path":"[^"]*docs/[^"]*\.md"'; then
    echo "❌ BLOCKED: Direct modification of documentation files in docs/ is not allowed."
    echo "Documentation files should ONLY be modified by extraction scripts."
    exit 1
  fi
fi

# Allow all other operations
exit 0
