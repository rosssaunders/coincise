---
description: Upgrade all npm dependencies across the entire monorepo (root + all venues)
---

You are tasked with upgrading all npm dependencies across the Coincise monorepo.

## Steps to follow:

1. **Upgrade root dependencies:**
   - Run `npm update` in the root directory
   - Run `npm outdated` to show any remaining outdated packages
   - If there are major version updates available, ask the user if they want to upgrade those too

2. **Find all venue package.json files:**
   - Use the Glob tool to find all `venues/*/package.json` files

3. **Upgrade each venue's dependencies:**
   - For each venue directory found:
     - Navigate to the venue directory
     - Run `npm update` to upgrade within semver ranges
     - Run `npm outdated` to show any remaining outdated packages

4. **Upgrade shared utilities:**
   - Navigate to `venues/shared`
   - Run `npm update`
   - Run `npm outdated`

5. **Summary report:**
   - Provide a clear summary showing:
     - Which packages were updated
     - Any packages that have major version updates available
     - Any potential breaking changes to be aware of

6. **Ask for confirmation on major updates:**
   - If there are packages with major version updates available, ask the user if they want to:
     - Upgrade to latest major versions (potentially breaking)
     - Keep current versions
     - Review changes individually

## Important notes:
- Use `npm update` for patch and minor updates (respects semver)
- Use `npm install <package>@latest` for major version updates (only with user confirmation)
- After all updates, recommend running the test suite or build scripts
- Be cautious with major version updates and mention potential breaking changes

Start by upgrading the root dependencies and then proceed with the venues.
