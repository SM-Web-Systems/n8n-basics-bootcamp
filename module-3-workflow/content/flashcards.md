# n8n Flashcards

## Card 1

**Q:** In the demo workflow, which specific n8n node is responsible for the 'Into Webhook' stage?

**A:** The Webhook trigger node.

---

## Card 2

**Q:** What is the top-level key for incoming data in the n8n Webhook node example?

**A:** The "body" key.

---

## Card 3

**Q:** In the 'Into Webhook' JSON payload, what are the three keys nested inside the body object?

**A:** They are "name", "message", and "priority".

---

## Card 4

**Q:** What action does the 'Normalize Data' node perform on the incoming body object?

**A:** It flattens the nested body fields into top-level JSON keys.

---

## Card 5

**Q:** Which timestamp field is added to the payload by the 'Normalize Data' node?

**A:** The "receivedAt" field.

---

## Card 6

**Q:** What is the specific date and time value used in the 'receivedAt' example field?

**A:** The value is 2026-07-06T14:20:00.000Z.

---

## Card 7

**Q:** Which node in the demo is used to branch the workflow based on the priority level?

**A:** The IF node.

---

## Card 8

**Q:** In the demo workflow, what field name is added to the JSON payload only in the true branch?

**A:** The "alertText" field.

---

## Card 9

**Q:** What is the example prefix used in the 'alertText' field for high priority alerts?

**A:** The prefix is "🚨 HIGH PRIORITY".

---

## Card 10

**Q:** How does the payload from the 'No Alert Needed' branch compare to the 'Normalize Data' output?

**A:** The payload remains completely unchanged from the Normalize Data stage.

---

## Card 11

**Q:** In the n8n architecture, the Editor UI acts as a _____ to the n8n server.

**A:** Client

---

## Card 12

**Q:** Which n8n component is responsible for storing workflows and running executions?

**A:** The n8n server.

---

## Card 13

**Q:** Why does an n8n workflow continue to run if the browser tab is closed?

**A:** The execution logic resides on the n8n server rather than the client UI.

---

## Card 14

**Q:** Which n8n component is responsible for receiving incoming webhooks?

**A:** The n8n server.

---

## Card 15

**Q:** What node type is used to 'normalize' data in the Webhook Alert Demo?

**A:** A Set node.

---

## Card 16

**Q:** The 'Simulate Slack Alert' node exists on the _____ branch of the IF node.

**A:** True

---

## Card 17

**Q:** The 'No Alert Needed' path represents the _____ branch of the IF node.

**A:** False

---

## Card 18

**Q:** In the demo example, what specific 'message' is passed through the payload?

**A:** The message is "Server CPU at 95%".

---

## Card 19

**Q:** In the demo, what specific 'priority' value triggers the true branch?

**A:** The value "high".

---

## Card 20

**Q:** What is the primary purpose of the 'Simulate Slack Alert' node in this specific demo?

**A:** It simulates sending an alert by appending alert text to the existing JSON.

---

## Card 21

**Q:** Where does the workflow definition data actually reside within the n8n ecosystem?

**A:** It is stored on the n8n server.

---

## Card 22

**Q:** True or False: The Editor UI must be open for n8n to receive a webhook.

**A:** False, the server handles webhooks independently of the UI.

---

## Card 23

**Q:** Which architectural component is described as the place where 'pieces sit inside' for this demo?

**A:** The n8n server architecture.

---

## Card 24

**Q:** In the demo JSON, which key represents the sender of the message?

**A:** The "name" key.

---

## Card 25

**Q:** What specific file contains the exported JSON workflow definition for this demo?

**A:** The file named webhook-alert-demo-source.md.

---
