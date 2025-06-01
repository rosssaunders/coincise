---
applyTo: "**"
---

# Package.json Scripts

- All extraction scripts must be executed through package.json scripts
- Scripts that take parameters must use the prefix `extract:` followed by the
  parameter name
- Example: `"extract:config": "node src/index.js"`
