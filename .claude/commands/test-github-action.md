---
description: Test GitHub Actions workflows locally using act before pushing changes
---

You are tasked with testing GitHub Actions workflows locally using the `act` tool to validate changes before pushing to GitHub.

## Prerequisites Check:

1. **Verify act is installed:**
   - Run `act --version` to check if act is installed
   - If not installed, provide installation instructions:
     - macOS: `brew install act`
     - Refer to CLAUDE.md for additional platform instructions

2. **Verify Docker is running:**
   - act requires Docker to be running
   - If Docker is not running, inform the user and exit

## Steps to follow:

1. **Identify the workflow to test:**
   - If the user hasn't specified a workflow file, list all available workflows:
     ```bash
     act -l
     ```
   - Show the workflow names and ask the user which one to test
   - Alternatively, scan recent file changes to suggest which workflow might be affected

2. **Run dry-run first (recommended):**
   - Before running the full workflow, do a dry-run to validate the workflow syntax:
     ```bash
     act -W .github/workflows/{workflow-file}.yml -j {job-name} --dryrun
     ```
   - This quickly validates the workflow structure without executing it

3. **Execute the workflow:**
   - Run the workflow with appropriate flags:
     ```bash
     act -W .github/workflows/{workflow-file}.yml -j {job-name} --container-architecture linux/amd64
     ```
   - Use `--container-architecture linux/amd64` on Apple Silicon Macs
   - Capture and display the output

4. **Analyze results:**
   - Review the workflow execution output
   - Identify any failures or errors in specific steps
   - Pay special attention to:
     - Dependency installation steps
     - Build/test execution steps
     - Script execution steps
   - Note: Git operations (commits, PRs) may fail in act but work correctly in GitHub - this is expected

5. **Report findings:**
   - Provide a clear summary of:
     - ✅ Steps that completed successfully
     - ❌ Steps that failed (with error details)
     - ⚠️ Steps that failed due to act limitations (e.g., git worktree issues)
     - 💡 Recommendations for fixing any real issues

6. **Suggest next steps:**
   - If workflow succeeded (or only had expected act limitations):
     - "✅ Workflow validation passed. Safe to commit and push changes."
   - If workflow had real failures:
     - "❌ Fix the following issues before committing: [list issues]"
   - Offer to re-run after fixes are applied

## Important Notes:

- **act Configuration:** Ensure `~/Library/Application Support/act/actrc` exists with:
  ```
  -P ubuntu-latest=catthehacker/ubuntu:act-latest
  ```
  Create it if missing.

- **Known Limitations:**
  - Git operations in worktrees may fail (this is expected)
  - Secret-dependent steps will be skipped (no access to GitHub secrets)
  - Some GitHub-specific actions may behave differently

- **Performance:**
  - First run may take longer as Docker images are pulled
  - Subsequent runs are much faster due to caching

- **Cleanup:**
  - act containers are automatically cleaned up after execution
  - Docker images remain cached for faster future runs

## Example Usage:

When the user runs `/test-github-action bullish-docs-update.yml`, execute:
1. Dry-run to validate syntax
2. Full execution to test the workflow
3. Provide detailed feedback on results
4. Recommend whether it's safe to push

Start by checking prerequisites and asking the user which workflow they want to test (if not specified).
