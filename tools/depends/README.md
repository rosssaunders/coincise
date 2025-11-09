# Dependency Management Tools

This directory contains scripts for managing dependencies across all JavaScript projects in the coincise repository.

## Scripts

### `update-dependencies-robust.sh`

Updates all dependencies across all JavaScript projects to their latest versions within existing semver ranges.

**Usage:**
```bash
# From repository root
./tools/depends/update-dependencies-robust.sh
```

**What it does:**
- Finds all package.json files (excluding node_modules)
- Runs `npm update` to update within semver ranges (e.g., `^7.1.2` stays within `^7.x.x`)
- Runs `pnpm install` to update package-lock.json files
- Handles projects with missing dependencies gracefully
- Provides detailed progress reporting

**When to use:**
- Regular maintenance updates
- Safe updates that respect existing version constraints
- When you want to stay within major version boundaries

### `bump-dependencies.sh`

Bumps all dependencies to their absolute latest versions across all JavaScript projects (like dependi does).

**Usage:**
```bash
# From repository root
./tools/depends/bump-dependencies.sh
```

**What it does:**
- Finds all package.json files (excluding node_modules)
- Uses `npm-check-updates` to update package.json files to latest versions
- Updates `^7.1.2` to `^7.2.1` or even `^8.0.0` if available
- Installs the updated dependencies
- Provides detailed progress reporting

**When to use:**
- When you want the absolute latest versions
- Major version upgrades
- When you want to match dependi behavior
- Before committing dependency updates

## Examples

### Safe Update (within semver ranges)
```bash
./tools/depends/update-dependencies-robust.sh
```
**Result:** `^7.1.2` → `^7.1.5` (stays within `^7.x.x`)

### Latest Version Bump
```bash
./tools/depends/bump-dependencies.sh
```
**Result:** `^7.1.2` → `^7.2.1` or `^8.0.0` (latest available)

## Requirements

- Node.js and pnpm installed
- For `bump-dependencies.sh`: `npm-check-updates` will be installed automatically if not present

## Output

Both scripts provide:
- Detailed progress reporting for each project
- Summary of successful/failed updates
- Clear next steps for reviewing and committing changes
- Error handling that continues processing other projects
