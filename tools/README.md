# Tools Directory

This directory contains various utility scripts and tools for managing the coincise repository.

## Dependency Management Scripts

See [`depends/`](./depends/) directory for dependency management tools.

### Quick Reference

**Safe updates (within semver ranges):**
```bash
./tools/depends/update-dependencies-robust.sh
```

**Latest version bumps (like dependi):**
```bash
./tools/depends/bump-dependencies.sh
```

For detailed documentation, see [`tools/depends/README.md`](./depends/README.md).

## Other Tools

- `depends/` - Dependency management scripts
- `ai-pr-summary/` - AI-powered PR summary generation
- `clean/` - Markdown cleaning and token counting utilities
- `create-ccxt-issue/` - CCXT issue creation tool
- `create-twitter-summary-pr/` - Twitter summary PR creation
- `llms/` - LLM text generation utilities
- `post-tweet/` - Twitter posting tool

## Running Scripts

All scripts should be run from the repository root:

```bash
# From repository root
./tools/depends/update-dependencies-robust.sh
./tools/depends/bump-dependencies.sh
```

The scripts will automatically:
1. Find all JavaScript projects
2. Update dependencies appropriately
3. Provide detailed progress reports
4. Handle errors gracefully
5. Give you a summary of what was updated
