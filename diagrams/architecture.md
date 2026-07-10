# Architecture Diagrams

## 1. Demo workflow data flow

Shows what the JSON payload looks like as it passes through each node.

```mermaid
flowchart LR
    A["Webhook (Trigger)\nPOST /webhook/alert-demo\nbody: {name, message, priority}"] --> B["Normalize Data (Set)\nadds: receivedAt, default priority"]
    B --> C{"Check Priority (IF)\npriority == 'high' ?"}
    C -- true --> D["Simulate Slack Alert (Set)\nadds: alertText"]
    C -- false --> E["No Alert Needed (NoOp)\npasses data through unchanged"]
```

**What changes at each step:**

| Stage | Example item data |
|---|---|
| Into Webhook | `{ "body": { "name": "Dave", "message": "Server CPU at 95%", "priority": "high" } }` |
| Out of Normalize Data | `{ "name": "Dave", "message": "Server CPU at 95%", "priority": "high", "receivedAt": "2026-07-06T14:20:00.000Z" }` |
| Out of Simulate Slack Alert (true branch) | same, plus `{ "alertText": "🚨 HIGH PRIORITY from Dave: Server CPU at 95%" }` |
| Out of No Alert Needed (false branch) | unchanged from Normalize Data |

## 2. n8n component overview

Where this demo's pieces sit inside n8n's own architecture.

```mermaid
flowchart TB
    subgraph Browser
        UI["n8n Editor UI"]
    end
    subgraph "n8n Container (Docker)"
        Server["n8n Server\n(REST API + Workflow Engine)"]
        Engine["Execution Engine\nruns one node at a time,\npasses items along connections"]
        Vault["Credential Store\n(encrypted, in .n8n volume)"]
        Data["n8n_data volume\nworkflows, credentials, execution history"]
    end
    External["External services\n(Slack, Email/SMTP, APIs, DBs)"]
    Caller["curl / external system\n(sends the webhook POST)"]

    UI -->|manage workflows| Server
    Server --> Engine
    Engine --> Vault
    Server --> Data
    Caller -->|"POST /webhook/alert-demo"| Server
    Engine -->|action nodes call out| External
```

**Key idea:** the Editor UI is just a client of the n8n server — the server is what actually stores workflows, receives webhooks, and runs executions. This is why the workflow keeps running even if you close your browser tab.
