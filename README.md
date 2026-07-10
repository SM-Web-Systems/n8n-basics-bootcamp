# n8n Basics — A Hands-On Proof of Concept

This is a self-contained, teachable introduction to [n8n](https://n8n.io), a low-code workflow automation tool. It's a self-hostable alternative to Zapier or Make: you connect "nodes" together to build automations, and you can run it yourself in Docker instead of paying for a hosted plan.

This package is meant to be worked through top-to-bottom with a learner:

1. **This file (`README.md`)** — concepts, explained plainly.
2. **[`SETUP.md`](./SETUP.md)** — get n8n running locally and import the demo.
3. **[`workflows/webhook-alert-demo.json`](./workflows/webhook-alert-demo.json)** — the working example.
4. **[`diagrams/architecture.md`](./diagrams/architecture.md)** — visual diagrams of how it all fits together.
5. **[`EXERCISES.md`](./EXERCISES.md)** — practice tasks and a quiz to check understanding.

## What problem does n8n solve?

Most automation needs boil down to: "when X happens, do Y, maybe with some data massaging in between." n8n lets you build that visually, as a graph of nodes, instead of writing a bespoke script for every integration.

## Core concepts

- **Workflow** — the whole automation: a set of nodes connected together, plus the rules for how data flows between them. Everything in n8n lives inside a workflow.

- **Node** — a single step. Every node does one job: receive data, transform data, make a decision, or call an external service. Nodes are the building blocks; workflows are how you arrange them.

- **Trigger node** — the node that *starts* a workflow. Every workflow needs exactly one active trigger. Common triggers:
  - **Webhook** — starts the workflow when an HTTP request hits a unique URL n8n gives you.
  - **Cron/Schedule** — starts the workflow on a timer (e.g. every hour).
  - **Manual trigger** — starts the workflow only when you click "Execute" in the editor (useful for testing).

- **Regular/action node** — everything after the trigger. Examples: **Set** (add/rename/reshape fields), **IF** (branch based on a condition), **HTTP Request** (call any API), **Slack**/**Email** (send a message).

- **Items and data flow** — data moves between nodes as a list of **items**, where each item is a JSON object. A node runs once per item (unless configured otherwise) and passes its output items to the next node. This is the single most important mental model in n8n: *think in terms of a list of JSON objects flowing left to right.*

- **Credentials** — reusable, encrypted connection details (API keys, OAuth tokens, SMTP logins) that action nodes borrow from. You configure a credential once and any node that needs that service can reuse it — you're not pasting secrets into every node.

- **Execution** — one completed (or failed) run of a workflow, triggered once. n8n keeps a history of executions so you can inspect exactly what data passed through each node on any past run — this is your primary debugging tool.

## The demo workflow

`workflows/webhook-alert-demo.json` implements a small but complete example: **Webhook → transform → conditional → alert.**

```
Webhook  →  Normalize Data (Set)  →  Check Priority (IF)  ─true→  Simulate Slack Alert (Set)
                                                            └false→ No Alert Needed (NoOp)
```

- **Webhook** receives a POST request with `{ name, message, priority }` in the body.
- **Normalize Data** (a Set node) reshapes the incoming body into clean top-level fields and stamps a `receivedAt` timestamp — this is the "transform" step every real integration needs, because raw payloads rarely arrive in the shape you want.
- **Check Priority** (an IF node) branches based on whether `priority` equals `"high"`.
- **Simulate Slack Alert** builds the alert text you'd send to Slack/Email. It's a Set node rather than a real Slack node so the demo runs end-to-end with zero external accounts — see `SETUP.md` for swapping in a real Slack/Email node once you have credentials.
- **No Alert Needed** is a NoOp (no-operation) node — it exists purely to show the false branch completing without side effects.

See `diagrams/architecture.md` for the visual flow and a diagram of how n8n's own components fit together.

## Gotchas worth knowing up front

- **Test URL vs. Production URL.** Every Webhook node has two URLs: a *test* URL (only live while you have the workflow open and click "Listen for test event") and a *production* URL (only live once the workflow is **Active**). Sending a request to the wrong one is the #1 source of "my webhook isn't firing" confusion.
- **A workflow must be Active for triggers to fire on their own.** While you're editing, triggers only respond to manual test executions.
- **Data is per-item.** If a node seems to only process "one" record when you expected many, you're likely looking at a single item — check the Executions view to see the full item list at that step.
- **Credentials are scoped to a node type**, not global — an HTTP Request node's auth and a Slack node's auth are configured completely separately, even if they hit the same service.
- **`$json` refers to the current item's data**, and expressions like `{{ $json.fieldName }}` are how you reference upstream data anywhere a field accepts an expression (the little "fx" toggle).
- **Webhook nodes need a `webhookId`.** When you build a Webhook node in the UI, n8n silently attaches a `webhookId` (a UUID) behind the scenes. If you ever hand-write or generate workflow JSON outside the UI (as this demo's `workflows/webhook-alert-demo.json` does), you must include that `webhookId` on the node — without it, n8n falls back to registering the webhook at `/webhook/<workflowId>/<nodeName>/<path>` instead of the clean `/webhook/<path>` you'd expect.

## Next step

Head to [`SETUP.md`](./SETUP.md) to get n8n running and see this workflow execute for real.
