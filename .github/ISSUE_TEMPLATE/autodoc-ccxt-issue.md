---
title: "[AutoDoc] {{ payload.pull_request.title }}"
assignees: { { payload.pull_request.merged_by.login } }
labels: autodoc,documentation
---

## AutoDoc Update from {{ repo.owner }}/{{ repo.name }}

**PR Title:** {{ payload.pull_request.title }} **PR
Number:** #{{ payload.pull_request.number }} **PR URL:**
{{ payload.pull_request.html_url }} **Merged by:**
@{{ payload.pull_request.merged_by.login }} **Merged at:**
{{ payload.pull_request.merged_at }}

## PR Description

{{ payload.pull_request.body }}

## Raw Diff

View the complete diff changes: https://github.com/{{ repo.owner
}}/{{ repo.name }}/pull/{{ payload.pull_request.number }}.diff

## Changed Files

```
{{ steps.changed-files.outputs.changed_files }}
```

---

_This issue was automatically created by the AutoDoc workflow when
PR #{{ payload.pull_request.number }} was merged._
