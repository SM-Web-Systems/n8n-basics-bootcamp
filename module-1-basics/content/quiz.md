# n8n Quiz

## Question 1
What is the primary architectural difference between n8n and tools like Zapier or Make as described in the material?

- [x] n8n is a self-hostable tool that can be run locally using Docker.
- [ ] n8n uses bespoke scripts for every integration instead of a visual graph.
- [ ] n8n only allows for linear automations without branching logic.
- [ ] n8n requires a paid monthly subscription for all hosting scenarios.

**Hint:** Consider where the software is actually executed and who manages the server.

## Question 2
In the context of n8n, what is the 'single most important mental model' regarding how data moves through a workflow?

- [x] Data flows from left to right as a list of JSON objects called items.
- [ ] Data is processed as a single continuous binary stream between nodes.
- [ ] Each node generates a new database table that the next node queries.
- [ ] Data moves vertically from trigger nodes to terminal nodes.

**Hint:** Focus on the specific format and direction of the data packets mentioned in the core concepts.

## Question 3
Which type of node is responsible for initiating the execution of a workflow?

- [ ] Action node
- [x] Trigger node
- [ ] Execution node
- [ ] Credential node

**Hint:** This node acts as the entry point for the entire automation graph.

## Question 4
What is a major 'gotcha' when working with Webhook nodes in n8n?

- [x] The test URL is only active while the editor is open and listening for an event.
- [ ] Webhook nodes can only receive GET requests and cannot handle POST bodies.
- [ ] Production URLs are active as soon as a Webhook node is placed on the canvas.
- [ ] Test URLs automatically become Production URLs once the workflow is saved.

**Hint:** Look for the distinction n8n makes between the development phase and the live automation phase.

## Question 5
How are credentials managed within n8n to ensure security and reusability?

- [ ] They are stored globally and automatically applied to every node in the workflow.
- [x] They are reusable, encrypted connection details that nodes borrow from.
- [ ] They must be hard-coded into the JSON metadata of each node for maximum speed.
- [ ] Credentials only work for the specific user who created the workflow.

**Hint:** Think about the benefits of separating sensitive API keys from the logic of the workflow nodes.

## Question 6
In the demo workflow, what is the primary purpose of the 'Normalize Data' (Set node)?

- [ ] To filter out items that do not meet the priority criteria.
- [ ] To pause the workflow until an external Slack alert is confirmed.
- [x] To reshape incoming raw payloads into clean fields and add timestamps.
- [ ] To generate the unique Webhook URL for the trigger node.

**Hint:** Recall the 'transform' step mentioned in the demo description regarding raw payloads.

## Question 7
Which syntax is used in n8n expressions to reference data from the current item?

- [x] {{ $json.fieldName }}
- [ ] {{ item['fieldName'] }}
- [ ] $data.value
- [ ] [[ node.output.fieldName ]]

**Hint:** The keyword used represents the data format (JSON) and starts with a dollar sign.

## Question 8
Why is it critical to include a 'webhookId' when defining a Webhook node via hand-written JSON?

- [ ] Without it, n8n cannot encrypt the incoming POST body.
- [x] The node will default to a longer, less intuitive URL path.
- [ ] The workflow will fail to save because the node name becomes invalid.
- [ ] It is required to link the webhook to specific user credentials.

**Hint:** Consider how the URL structure changes if this identifier is missing from the node configuration.

## Question 9
What functionality does the 'Execution' history provide to a developer?

- [x] It serves as a primary debugging tool by showing data at every node in past runs.
- [ ] It allows the developer to edit the logic of a workflow while it is running.
- [ ] It automatically fixes errors found in previous failed runs.
- [ ] It is used to store long-term records of user API keys.

**Hint:** Think about what information you would need to find out why a specific automation run failed.

## Question 10
If a workflow is not set to 'Active', what happens when a Cron/Schedule trigger time is reached?

- [ ] The workflow will only fire if the editor is currently open in a browser.
- [x] The trigger will not fire on its own.
- [ ] n8n will queue the execution and run it as soon as the workflow becomes Active.
- [ ] The workflow will fire normally but will not record an Execution history.

**Hint:** Look for the specific 'Gotcha' related to the workflow's status and its ability to respond to events.
