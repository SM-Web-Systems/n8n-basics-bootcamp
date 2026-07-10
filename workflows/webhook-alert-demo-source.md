# Webhook Alert Demo — n8n Workflow Definition

This is the exported n8n workflow JSON for the demo described in `diagrams/architecture.md`:
a Webhook trigger, a Set node that normalizes incoming data, an IF node that branches on
priority, and either a simulated Slack alert or a no-op depending on the branch.

```json
{
  "id": "webhook-alert-demo",
  "name": "Webhook Alert Demo",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "alert-demo",
        "responseMode": "onReceived",
        "options": {}
      },
      "id": "1f1b1a10-0001-4a1a-9a01-000000000001",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        240,
        300
      ],
      "webhookId": "2f6b3c40-64c1-4b1a-9a2e-6c1a2b3d4e5f"
    },
    {
      "parameters": {
        "mode": "manual",
        "includeOtherFields": false,
        "assignments": {
          "assignments": [
            {
              "id": "a1",
              "name": "name",
              "type": "string",
              "value": "={{ $json.body.name }}"
            },
            {
              "id": "a2",
              "name": "message",
              "type": "string",
              "value": "={{ $json.body.message }}"
            },
            {
              "id": "a3",
              "name": "priority",
              "type": "string",
              "value": "={{ $json.body.priority || 'normal' }}"
            },
            {
              "id": "a4",
              "name": "receivedAt",
              "type": "string",
              "value": "={{ $now.toISO() }}"
            }
          ]
        },
        "options": {}
      },
      "id": "1f1b1a10-0002-4a1a-9a01-000000000002",
      "name": "Normalize Data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        460,
        300
      ]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "c1",
              "leftValue": "={{ $json.priority }}",
              "rightValue": "high",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "1f1b1a10-0003-4a1a-9a01-000000000003",
      "name": "Check Priority",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        680,
        300
      ]
    },
    {
      "parameters": {
        "mode": "manual",
        "includeOtherFields": true,
        "assignments": {
          "assignments": [
            {
              "id": "b1",
              "name": "alertText",
              "type": "string",
              "value": "=🚨 HIGH PRIORITY from {{ $json.name }}: {{ $json.message }}"
            }
          ]
        },
        "options": {}
      },
      "id": "1f1b1a10-0004-4a1a-9a01-000000000004",
      "name": "Simulate Slack Alert",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        900,
        180
      ],
      "notes": "Replace this Set node with a real Slack node once you've added a Slack credential — see SETUP.md."
    },
    {
      "parameters": {},
      "id": "1f1b1a10-0005-4a1a-9a01-000000000005",
      "name": "No Alert Needed",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        900,
        420
      ]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Normalize Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Normalize Data": {
      "main": [
        [
          {
            "node": "Check Priority",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check Priority": {
      "main": [
        [
          {
            "node": "Simulate Slack Alert",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "No Alert Needed",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "pinData": {}
}
```
