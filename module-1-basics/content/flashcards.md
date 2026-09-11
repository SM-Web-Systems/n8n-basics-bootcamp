# n8n Flashcards

## Card 1

**Q:** What is n8n?

**A:** A self-hostable, low-code workflow automation tool used to connect different services via nodes.

---

## Card 2

**Q:** How does n8n's hosting model differ from Zapier or Make?

**A:** It can be self-hosted using Docker rather than requiring a paid hosted plan.

---

## Card 3

**Q:** In n8n, the entire automation comprising nodes and data flow rules is called a _____.

**A:** Workflow

---

## Card 4

**Q:** What is the function of a 'Node' in an n8n workflow?

**A:** A single step that performs a specific job such as transforming data or calling an external service.

---

## Card 5

**Q:** What specific type of node is responsible for starting an n8n workflow?

**A:** Trigger node

---

## Card 6

**Q:** How many active trigger nodes are permitted per n8n workflow?

**A:** Exactly one.

---

## Card 7

**Q:** Which trigger starts a workflow when an HTTP request is sent to a unique URL?

**A:** Webhook trigger

---

## Card 8

**Q:** Which trigger starts a workflow on a recurring timer, such as every hour?

**A:** Cron/Schedule trigger

---

## Card 9

**Q:** What is the primary purpose of a 'Manual trigger'?

**A:** To start a workflow for testing purposes when the user clicks 'Execute' in the editor.

---

## Card 10

**Q:** In n8n terminology, nodes that occur after the trigger are called _____ nodes.

**A:** Regular or action

---

## Card 11

**Q:** What is the primary function of a 'Set' node?

**A:** To add, rename, or reshape data fields within a workflow.

---

## Card 12

**Q:** Which node is used to branch a workflow based on a specific condition?

**A:** IF node

---

## Card 13

**Q:** How does data move between nodes in n8n?

**A:** As a list of items, where each item is a JSON object.

---

## Card 14

**Q:** Unless configured otherwise, how many times does a node run relative to the input items?

**A:** Once per item.

---

## Card 15

**Q:** In what direction does the mental model of n8n data flow operate?

**A:** Left to right.

---

## Card 16

**Q:** What are 'Credentials' in n8n?

**A:** Reusable, encrypted connection details like API keys or OAuth tokens.

---

## Card 17

**Q:** What is the benefit of n8n credentials being reusable?

**A:** They can be configured once and borrowed by any node that needs that service without repasting secrets.

---

## Card 18

**Q:** What term refers to a single completed or failed run of a workflow?

**A:** Execution

---

## Card 19

**Q:** What is the primary n8n tool for debugging data passing through each node?

**A:** Execution history

---

## Card 20

**Q:** Which Webhook URL is only live while the workflow is open and 'Listen for test event' is clicked?

**A:** Test URL

---

## Card 21

**Q:** Which Webhook URL is used for live operations once a workflow is set to 'Active'?

**A:** Production URL

---

## Card 22

**Q:** What status must a workflow have for its triggers to fire automatically on their own?

**A:** Active

---

## Card 23

**Q:** Why might a node appear to process only one record when many were expected?

**A:** The user may be viewing a single item rather than the full item list in the Executions view.

---

## Card 24

**Q:** How is the scope of n8n credentials defined?

**A:** They are scoped to a specific node type rather than being global.

---

## Card 25

**Q:** In an n8n expression, what does the variable '$json' represent?

**A:** The data of the current item being processed.

---

## Card 26

**Q:** What is the syntax for referencing a field named 'priority' from the current item in an expression?

**A:** {{ $json.priority }}

---

## Card 27

**Q:** Which UI element must be toggled to allow a field to accept an expression?

**A:** The 'fx' toggle.

---

## Card 28

**Q:** What unique identifier must be included when writing workflow JSON by hand to ensure a clean Webhook URL path?

**A:** webhookId

---

## Card 29

**Q:** If a webhookId is missing from a manually generated Webhook node, what is the resulting URL structure?

**A:** /webhook/<workflowId>/<nodeName>/<path>

---

## Card 30

**Q:** In the demo workflow, which node is used to normalize incoming body data and add a timestamp?

**A:** Normalize Data (Set node)

---

## Card 31

**Q:** What is the purpose of the 'No Alert Needed' node in the provided demo workflow?

**A:** It is a NoOp (no-operation) node representing the completion of a false logic branch.

---

## Card 32

**Q:** Why are raw incoming payloads often passed through a 'Set' node in real integrations?

**A:** To transform data into the specific shape required for downstream nodes.

---

## Card 33

**Q:** What platform does n8n typically run in for self-hosting?

**A:** Docker

---

## Card 34

**Q:** Which node in the demo workflow decides the path based on the value of 'priority'?

**A:** Check Priority (IF node)

---

## Card 35

**Q:** What does a 'NoOp' node do?

**A:** It performs no operation and serves as a placeholder or logic terminator.

---

## Card 36

**Q:** True or False: Every node in n8n runs exactly once per workflow execution regardless of the number of items.

**A:** False (nodes run once per item).

---

## Card 37

**Q:** Where can a user inspect the exact data that passed through nodes in previous runs?

**A:** The execution history view.

---

## Card 38

**Q:** What problem is solved by using visual graphs in n8n compared to traditional coding?

**A:** It avoids writing bespoke scripts for every individual integration.

---

## Card 39

**Q:** How does an n8n workflow behave while it is being edited in the UI?

**A:** Triggers only respond to manual test executions.

---

## Card 40

**Q:** What is the 'single most important mental model' to have when using n8n?

**A:** Thinking in terms of a list of JSON objects flowing from left to right.

---

## Card 41

**Q:** Which node would you use to send a message to a communication platform like Slack or via Email?

**A:** Slack or Email action nodes.

---

## Card 42

**Q:** Concept: Data Massaging

**A:** Definition: The process of transforming and cleaning data as it moves between different services in a workflow.

---

## Card 43

**Q:** If you need to call a generic external API that does not have a dedicated node, which node should you use?

**A:** HTTP Request node

---

## Card 44

**Q:** Identify the potential error: A user sends a request to the Test URL while the workflow is not open in the editor.

**A:** The webhook will not fire because the Test URL is only active while the editor is open and listening.

---

## Card 45

**Q:** In the demo workflow, why is a Set node used to 'Simulate Slack Alert' instead of a real Slack node?

**A:** To allow the demo to run end-to-end without requiring the user to have external account credentials.

---

## Card 46

**Q:** What is the result of applying a credential to a node?

**A:** The node gains authorized access to an external service using the encrypted details stored in the credential.

---

## Card 47

**Q:** How does n8n handle secrets like API keys?

**A:** They are stored as encrypted credentials that are reused across nodes.

---

## Card 48

**Q:** What information is typically found in an n8n 'Item'?

**A:** A JSON object containing key-value pairs of data.

---

## Card 49

**Q:** Which node type acts as the entry point for all data into a workflow?

**A:** Trigger node

---

## Card 50

**Q:** In the context of n8n, what does the 'Normalize Data' step typically involve?

**A:** Reshaping incoming payloads into clean, top-level fields with standardized formats.

---

## Card 51

**Q:** If a workflow is not 'Active', will a Cron trigger start it on the scheduled time?

**A:** No, triggers only fire automatically when the workflow is set to Active.

---

## Card 52

**Q:** When using an IF node, how many output paths are typically generated?

**A:** Two: a true branch and a false branch.

---
