---
applyTo: "**"
---

# Github Workflows

- Each venue has a separate workflow file for automatically updating the
  documentation and raising a PR if anything has changed
- The workflow should run every day at 00:00 UTC
- Workflows must execute the extraction scripts using the package.json scripts
  with seperate steps for each config file.
- Example workflow command: `npm run extract:config`
