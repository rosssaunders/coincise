---
applyTo: "**"
---

# Github Workflows

- Each venue has a separate workflow file for automatically updating the
  documentation and raising a PR if anything has changed
- The workflow should run weekly at midnight on Saturday night / Sunday morning
- Workflows must execute the extraction scripts using the package.json scripts
- Example workflow command: `npm run extract:config`
