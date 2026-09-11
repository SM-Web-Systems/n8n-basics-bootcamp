# n8n Flashcards

## Card 1

**Q:** What is the primary function of a trigger node in n8n?

**A:** It starts a workflow's execution.

---

## Card 2

**Q:** What is the role of a regular or action node in n8n?

**A:** It performs work, such as transforming data or calling an API, after a workflow has started.

---

## Card 3

**Q:** Under what condition can a workflow run automatically?

**A:** It must contain at least one trigger node.

---

## Card 4

**Q:** How must a workflow be executed if it contains zero trigger nodes?

**A:** It can only be run manually from the editor.

---

## Card 5

**Q:** Why must a workflow be set to 'Active' for a Cron trigger to function?

**A:** n8n only keeps triggers for active workflows registered and listening in the background.

---

## Card 6

**Q:** How do inactive workflows respond to external trigger events?

**A:** They do not respond to external events; they only respond to manual test executions from the editor.

---

## Card 7

**Q:** Term: Item (in n8n)

**A:** A single JSON object representing one unit of data flowing through the workflow.

---

## Card 8

**Q:** Why does n8n process a list of items rather than a single object by default?

**A:** It allows the node to process one or many records automatically without manual looping logic.

---

## Card 9

**Q:** Where in the n8n interface can you find the data a node received and produced during a run?

**A:** The Executions tab or list.

---

## Card 10

**Q:** What action allows you to inspect specific input and output data for a node in a past run?

**A:** Opening a specific execution from the list and clicking on the node.

---

## Card 11

**Q:** What is one benefit of storing credentials separately from individual nodes?

**A:** A single credential can be configured once and reused across many nodes and workflows.

---

## Card 12

**Q:** How does separate credential storage improve security in n8n?

**A:** It prevents secrets from being duplicated in plaintext across every node that uses them.

---

## Card 13

**Q:** What expression syntax is used to reference the 'message' field from the current item?

**A:** {{ $json.message }}

---

## Card 14

**Q:** In an expression like {{ $json.body.priority || 'normal' }}, what is the purpose of '||'?

**A:** It provides a fallback value if the primary field is missing or falsy.

---

## Card 15

**Q:** How many times does an n8n 'test' webhook URL listen for an event?

**A:** It listens only once while the user is in the editor.

---

## Card 16

**Q:** What is the operational difference between a test webhook URL and a production webhook URL?

**A:** The test URL is for manual checks in the editor, while the production URL stays listening continuously in the background.

---

## Card 17

**Q:** What must be clicked in the n8n editor for a test webhook to receive data?

**A:** Listen for test event.

---

## Card 18

**Q:** In the demo workflow, what happens if a webhook request lacks a priority field?

**A:** It defaults to 'normal' via the Normalize Data node's expression logic.

---

## Card 19

**Q:** How can you visually confirm that all branches of a logic node are firing correctly?

**A:** Add a distinct NoOp node to each branch.

---

## Card 20

**Q:** What node is used to provide fixed test data to a workflow when using a Schedule trigger?

**A:** The Set node.

---

## Card 21

**Q:** What does the 'multiple outputs' mode in an IF node allow a user to do?

**A:** It allows the workflow to take more than two distinct paths based on specific values.

---

## Card 22

**Q:** What is an 'Error Trigger' workflow?

**A:** A separate workflow that n8n calls automatically when another workflow fails.

---

## Card 23

**Q:** How can a developer force a failure to test an Error Trigger workflow?

**A:** By temporarily breaking an expression, such as referencing a non-existent field.

---

## Card 24

**Q:** Where should a validation IF node be placed to filter out missing message payloads?

**A:** Immediately after the Webhook trigger node.

---

## Card 25

**Q:** What is the purpose of routing invalid payloads to a NoOp node named 'Rejected'?

**A:** To stop the workflow for invalid data without continuing to data normalization.

---

## Card 26

**Q:** What concept is demonstrated by replacing a Webhook trigger with a Schedule trigger followed by a Set node?

**A:** Downstream nodes do not care how the data arrived as long as it matches the expected format.

---

## Card 27

**Q:** To use a real Slack or Email node in n8n, what must be provided in the node parameters?

**A:** Webhook or SMTP credentials.

---

## Card 28

**Q:** Cloze: In n8n, nodes operate on a _____ of items rather than just one.

**A:** list

---

## Card 29

**Q:** Cloze: A production URL is only listening once the workflow is toggled to _____.

**A:** Active

---

## Card 30

**Q:** Cloze: The _____ tab allows you to click through each node and inspect its exact input and output data.

**A:** Executions

---

## Card 31

**Q:** What does referencing {{ $json.body.priority }} in a node parameter do?

**A:** It retrieves the priority value located within the body of the incoming JSON object.

---

## Card 32

**Q:** In exercise 1, what new field and fixed value were added to the Normalize Data node?

**A:** A field called 'source' with a value of 'demo'.

---

## Card 33

**Q:** What happens if a workflow is set to Active but has no trigger nodes?

**A:** It will remain active but will never fire automatically.

---

## Card 34

**Q:** How can a user verify that a new field successfully reached the end of a workflow?

**A:** Check the execution data in the final node of the run.

---

## Card 35

**Q:** When a workflow fails, what data does the Error Trigger workflow typically log?

**A:** Details about the error that caused the failure.

---

## Card 36

**Q:** Why is the use of '||' in expressions considered a type of data normalization?

**A:** It ensures a consistent default value exists even when input data is incomplete.

---

## Card 37

**Q:** What is the result of using a Cron trigger set to fire every minute?

**A:** The workflow execution will start automatically every sixty seconds while active.

---

## Card 38

**Q:** What node can act as a placeholder or logging point without affecting data flow?

**A:** The NoOp node.

---

## Card 39

**Q:** Which URL type should be used when configuring a third-party service for live production data?

**A:** The production webhook URL.

---

## Card 40

**Q:** Why is it important to use a validation node for the 'message' field early in a workflow?

**A:** To prevent processing empty or invalid data in subsequent, potentially costly, action nodes.

---
