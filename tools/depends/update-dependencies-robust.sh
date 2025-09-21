#!/bin/bash

# Robust script to update all dependencies across all JavaScript projects
# Handles projects with missing dependencies gracefully

# Don't exit on error - we want to continue with other projects

echo "🚀 Starting dependency update for all JavaScript projects..."

# Find all package.json files (excluding node_modules)
PACKAGE_FILES=$(find . -name "package.json" -not -path "*/node_modules/*" | sort)

echo "📦 Found $(echo "$PACKAGE_FILES" | wc -l) package.json files:"
echo "$PACKAGE_FILES"
echo ""

# Function to update dependencies in a single project
update_project() {
    local package_file="$1"
    local project_dir=$(dirname "$package_file")
    
    echo "🔄 Updating dependencies in: $project_dir"
    
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
    
    # First, install dependencies if they're missing
    echo "  📥 Installing/updating dependencies..."
    if ! npm install; then
        echo "  ⚠️  npm install failed, trying npm ci..."
        if ! npm ci; then
            echo "  ❌ Failed to install dependencies in $project_dir"
            cd - > /dev/null
            return 1
        fi
    fi
    
    # Update dependencies to latest versions within semver ranges
    echo "  🔄 Updating dependencies to latest versions..."
    if ! npm update; then
        echo "  ⚠️  npm update failed, but dependencies are installed"
    fi
    
    # Final install to ensure package-lock.json is up to date
    echo "  🔧 Final install to update package-lock.json..."
    npm install
    
    echo "  ✅ Successfully updated $project_dir"
    cd - > /dev/null
}

# Update each project
SUCCESS_COUNT=0
FAILED_PROJECTS=()

for package_file in $PACKAGE_FILES; do
    if update_project "$package_file"; then
        ((SUCCESS_COUNT++))
    else
        FAILED_PROJECTS+=("$package_file")
    fi
    echo ""
done

# Summary
TOTAL_PROJECTS=$(echo "$PACKAGE_FILES" | wc -l)
echo "📊 Update Summary:"
echo "  ✅ Successfully updated: $SUCCESS_COUNT/$TOTAL_PROJECTS projects"

if [ ${#FAILED_PROJECTS[@]} -gt 0 ]; then
    echo "  ❌ Failed projects:"
    for project in "${FAILED_PROJECTS[@]}"; do
        echo "    - $project"
    done
    echo ""
    echo "🔧 You may want to manually check the failed projects."
    exit 1
else
    echo "  🎉 All projects updated successfully!"
fi

echo ""
echo "✨ Dependency update complete!"
echo ""
echo "💡 Next steps:"
echo "  1. Review the changes with: git diff"
echo "  2. Test a few projects to ensure everything works"
echo "  3. Commit the changes: git add . && git commit -m 'Update all dependencies to latest versions'"
