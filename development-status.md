# Development Status - n8n Teaching Proof-of-Concept

## Last Updated
**Date**: 2026-07-06
**Session Duration**: ~1 session
**Claude Code Session**: Initial build of n8n basics teaching package

## Current Project State

### What's Working
- Full teaching package built under `/home/webadmin/web-stack/html/n8n/`: `README.md`, `SETUP.md`, `EXERCISES.md`, `diagrams/architecture.md`, `docker-compose.yml`, `.env.example`, `workflows/webhook-alert-demo.json`.
- `docker-compose.yml` pinned to `n8nio/n8n:1.110.2` (stable 1.x release), bound to `127.0.0.1:5678`, with a named volume (`n8n_data`) for persistence.
- Demo workflow (`Webhook → Normalize Data (Set) → Check Priority (IF) → Simulate Slack Alert (Set) / No Alert Needed (NoOp)`) was imported, activated, and fired end-to-end via `curl` against a real local container:
  - High-priority payload → execution `id=1`, status `success`, ended at **Simulate Slack Alert** with `alertText: "🚨 HIGH PRIORITY from Dave: Server CPU at 95%"`.
  - Normal/no-priority payload → execution `id=2`, status `success`, ended at **No Alert Needed**.
  - Verified directly by querying `execution_entity`/`execution_data` in the container's SQLite database, not just by HTTP response code.
- Container was torn down after verification (`docker compose down`, volume kept) per the plan's teardown step. The test `.env` created during verification was deleted afterward — only `.env.example` remains on disk.

### What's In Progress
- Nothing in progress — the package is complete and verified. The user should now run through `SETUP.md` themselves (or with a learner) to see the UI.

### What's Next
- Optional: swap **Simulate Slack Alert** for a real Slack/Email node once real credentials are available (documented in `SETUP.md` step 8).
- Optional: work through `EXERCISES.md` extension tasks with the learner.

## Technical Details

### Recent Changes / Files Created
- `docker-compose.yml`, `.env.example`
- `README.md`, `SETUP.md`, `EXERCISES.md`
- `diagrams/architecture.md`
- `workflows/webhook-alert-demo.json`

### Architecture Decisions
- **Pinned n8n to `1.110.2` instead of `:latest`.** `:latest` resolved to n8n `2.28.7`, a very new major version with an experimental workflow-publication/versioning system (`publish:workflow`/`unpublish:workflow` CLI commands replacing the classic `update:workflow --active`) that produced non-standard webhook URLs during testing. `1.110.2` is a recent, stable 1.x release matching how n8n is documented and taught everywhere, and behaves with the classic `active` toggle / clean `/webhook/<path>` URL scheme.
- **Demo action node is a Set node, not a real Slack node.** This keeps the whole demo runnable with zero external accounts (no Slack workspace / SMTP server required to complete `SETUP.md`). Swapping in a real Slack/Email node is documented as an optional step.
- **`docker-compose.yml` binds to `127.0.0.1:5678` only** (not `0.0.0.0`) to avoid colliding with or being confused with the existing `nginx-webstack` container's public ports 80/443 on this host.

### Known Issues / Gotchas Discovered During Testing
- **Hand-authored Webhook node JSON must include a `webhookId` (UUID).** n8n's UI silently attaches this to every Webhook node it creates. Without it, `n8n-workflow`'s `getNodeWebhookPath()` (in `node-helpers.js`) falls back to registering the webhook at `/webhook/<workflowId>/<nodeNameLowercased>/<path>` instead of the expected `/webhook/<path>`. This is now fixed in `workflows/webhook-alert-demo.json` (a fixed UUID is hardcoded on the Webhook node) and called out explicitly in `README.md`'s Gotchas section so a learner writing their own workflow JSON by hand doesn't hit the same confusing 404.
- **`import:workflow` (CLI) requires an explicit top-level `"id"` in the JSON** on this n8n version — omitting it fails with `SQLITE_CONSTRAINT: NOT NULL constraint failed: workflow_entity.id`. The demo JSON sets `"id": "webhook-alert-demo"`. This is a CLI-only quirk; importing via the UI's "Import from File" does not require this.
- **Activating a workflow via CLI (`n8n update:workflow --active=true`) does not take effect until n8n is restarted** — this is expected/documented n8n behavior, not a bug, but easy to miss.

## File Structure Status
```
n8n/
├── docker-compose.yml
├── .env.example
├── README.md
├── SETUP.md
├── EXERCISES.md
├── development-status.md
├── diagrams/architecture.md
└── workflows/webhook-alert-demo.json
```
No `.env` is committed/left on disk — the user must run `cp .env.example .env` and set their own password before `docker compose up -d`, per `SETUP.md`.

## Testing Status
- End-to-end tested in Docker: container built, workflow imported, activated, both conditional branches fired via real HTTP webhook calls, both executions confirmed `status: "success"` by querying the container's own execution database.
- No automated test suite exists (or is needed) for this — it's a static documentation + workflow-definition deliverable, not application code.

## Notes for Next Session
### Context for New Claude Session
- This is a teaching/documentation deliverable, not an application. There is no ongoing "build" — treat any future work here as edits to docs/workflow or as helping the user actually teach from this material.
- If asked to test again, remember: pin the image tag (currently `1.110.2`), and remember the Webhook node needs `webhookId` set if the JSON is ever hand-edited or regenerated.

### Immediate Priorities
1. None outstanding — package is complete.
2. If the user wants a real Slack/Email alert wired in, follow `SETUP.md` step 8.
3. If the user wants this reverse-proxied through the existing `nginx-webstack` container for external access, that would be new scope — ask before changing nginx config.

### Warnings/Cautions
- Do not upgrade the pinned n8n image tag to `:latest` without re-verifying — 2.x introduced the workflow-publication CLI changes noted above.
- The `n8n_data` Docker volume was left in place after testing (not `down -v`'d) so the imported/activated demo workflow is still there if the user runs `docker compose up -d` again — they don't need to re-import it, just re-create `.env` first.
