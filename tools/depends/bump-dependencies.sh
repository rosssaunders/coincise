#!/bin/bash

# Script to bump all dependencies to their latest versions across all JavaScript projects
# This updates package.json files to use the latest versions (like dependi does)

# Don't exit on error - we want to continue with other projects

echo "🚀 Starting dependency version bumping for all JavaScript projects..."

# Find all package.json files (excluding node_modules)
PACKAGE_FILES=$(find . -name "package.json" -not -path "*/node_modules/*" | sort)

echo "📦 Found $(echo "$PACKAGE_FILES" | wc -l) package.json files:"
echo "$PACKAGE_FILES"
echo ""

# Install npm-check-updates globally if not available
if ! command -v ncu >/dev/null 2>&1; then
    echo "📦 Installing npm-check-updates for latest version bumping..."
    pnpm add -g npm-check-updates
fi

# Function to bump dependencies in a single project
bump_project() {
    local package_file="$1"
    local project_dir=$(dirname "$package_file")
    
    echo "🔄 Bumping dependencies in: $project_dir"
    
    # Change to project directory
    cd "$project_dir"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo "❌ package.json not found in $project_dir"
        cd - > /dev/null
        return 1
    fi
    
    # Check if there are dependencies to update
    if ! grep -q '"dependencies"' package.json && ! grep -q '"devDependencies"' package.json; then
        echo "ℹ️  No dependencies found in $project_dir, skipping..."
        cd - > /dev/null
        return 0
    fi
    
    # Show current outdated packages
    echo "  📋 Checking for outdated packages..."
    ncu || true
    
    # Update package.json to latest versions
    echo "  🚀 Bumping dependencies to latest versions..."
    if ncu -u; then
        echo "  📥 Installing updated dependencies..."
        pnpm install
        echo "  ✅ Successfully bumped $project_dir"
    else
        echo "  ⚠️  No updates available or update failed in $project_dir"
    fi
    
    cd - > /dev/null
}

# Bump each project
SUCCESS_COUNT=0
FAILED_PROJECTS=()

for package_file in $PACKAGE_FILES; do
    if bump_project "$package_file"; then
        ((SUCCESS_COUNT++))
    else
        FAILED_PROJECTS+=("$package_file")
    fi
    echo ""
done

# Summary
TOTAL_PROJECTS=$(echo "$PACKAGE_FILES" | wc -l)
echo "📊 Bump Summary:"
echo "  ✅ Successfully processed: $SUCCESS_COUNT/$TOTAL_PROJECTS projects"

if [ ${#FAILED_PROJECTS[@]} -gt 0 ]; then
    echo "  ❌ Failed projects:"
    for project in "${FAILED_PROJECTS[@]}"; do
        echo "    - $project"
    done
    echo ""
    echo "🔧 You may want to manually check the failed projects."
    exit 1
else
    echo "  🎉 All projects processed successfully!"
fi

echo ""
echo "✨ Dependency version bumping complete!"
echo ""
echo "💡 Next steps:"
echo "  1. Review the changes with: git diff"
echo "  2. Test a few projects to ensure everything works"
echo "  3. Commit the changes: git add . && git commit -m 'Bump all dependencies to latest versions'"
