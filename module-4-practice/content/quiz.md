# n8n Quiz

## Question 1
When a node in n8n receives a list containing multiple JSON objects, how does it typically handle the execution of its logic?

- [x] It automatically iterates through each object in the list without requiring manual loop structures.
- [ ] It only processes the first object and discards the rest unless a 'Split in Batches' node is used.
- [ ] The workflow pauses and waits for the developer to specify a 'For Each' loop for the data.
- [ ] It merges all objects into a single large object before performing the action.

**Hint:** Consider the core design principle of n8n regarding how it handles units of data called 'items'.

## Question 2
A developer wants to ensure that a workflow only continues if the incoming webhook data contains a specific field. Which node configuration is most appropriate for this validation step?

- [x] An IF node that checks if the field is empty and routes invalid data to a NoOp node.
- [ ] A Normalize Data node that deletes all fields except the one being checked.
- [ ] A Schedule node that delays the execution until the field appears in the database.
- [ ] An Error Trigger node that restarts the webhook whenever a field is missing.

**Hint:** Think about how you would create a logical 'fork' in the road for valid versus invalid data.

## Question 3
Why would a workflow that works perfectly during manual testing in the editor fail to trigger when an external service sends data to the production URL?

- [x] The workflow has not been toggled to 'Active' status.
- [ ] The developer's browser window is closed, which stops all background executions.
- [ ] The production URL only accepts data once every $24$ hours.
- [ ] The 'Test' webhook URL was used by the external service instead of the 'Production' URL.

**Hint:** Check the status of the toggle switch usually found in the top right of the n8n interface.

## Question 4
In the expression $\{\{ \$json.body.priority \ || \ 'normal' \}\}$, what is the primary function of the logical operator?

- [x] It provides a fallback value of 'normal' if the priority field is missing or null.
- [ ] It forces the priority field to always be 'normal' regardless of the input data.
- [ ] It acts as a separator that allows the node to process two different fields simultaneously.
- [ ] It converts the incoming data from a string format into a boolean value.

**Hint:** Consider what happens to the workflow if the incoming webhook forgot to include a priority level.

## Question 5
What is the primary architectural advantage of storing API credentials separately from the nodes that use them?

- [x] It allows a single set of credentials to be updated in one place and reflected across all workflows.
- [ ] It increases the execution speed of nodes by $50\%$ because the API key is pre-loaded.
- [ ] It allows nodes to bypass security firewalls by using a dedicated credential tunnel.
- [ ] It prevents the workflow from running if the developer is not currently logged into the n8n dashboard.

**Hint:** Think about the effort required to update an expired password that is used by twenty different workflows.

## Question 6
You need to create a version of a webhook workflow that runs automatically at midnight without any external input. Which modification is necessary?

- [x] Replace the Webhook trigger with a Schedule trigger and use a Set node to provide dummy data.
- [ ] Add a NoOp node at the start of the workflow and set it to 'Wait' mode.
- [ ] Keep the Webhook trigger and change its 'HTTP Method' parameter to 'CRON'.
- [ ] Disable the workflow and set it to 'Manual Only' mode in the settings.

**Hint:** Reflect on how the workflow will receive its data if there is no longer an incoming HTTP request body.

## Question 7
Which n8n feature is best suited for logging errors to a secondary system whenever a main workflow crashes due to a network timeout?

- [x] An Error Trigger workflow that is linked to the main workflow's settings.
- [ ] A second IF node placed after every single node in the main workflow.
- [ ] A 'Normalize Data' node that filters out all error messages from the logs.
- [ ] Setting the main workflow to 'Production' mode, which automatically fixes common errors.

**Hint:** Look for a mechanism that triggers specifically when things go wrong in a separate workflow.

## Question 8
Where can a developer find the historical record of a workflow's activity to see exactly which branch was taken during a run that occurred two hours ago?

- [x] The Executions tab.
- [ ] The Credentials manager.
- [ ] The Node Library.
- [ ] The Workflow Settings JSON.

**Hint:** This location is used for troubleshooting and auditing past events.

## Question 9
What is the primary difference between a Trigger node and an Action node?

- [x] A Trigger node initiates the execution, while an Action node performs tasks after the workflow has started.
- [ ] A Trigger node can only be used once, while an Action node can be used in every workflow.
- [ ] Trigger nodes process JSON, while Action nodes only process binary data.
- [ ] Action nodes must always be placed at the very beginning of a workflow to function correctly.

**Hint:** Think about which node type 'listens' for an event and which node type 'acts' on it.

## Question 10
If you wish to route a workflow into three distinct paths based on the content of a single field, which n8n node configuration is most efficient?

- [x] An IF node configured with multiple output branches.
- [ ] Three separate Webhook triggers, each listening for a different value.
- [ ] A single NoOp node connected to three different action nodes.
- [ ] A Schedule node that runs three times in a row.

**Hint:** Consider the node often used for 'if/then' logic that can be expanded for more than two choices.
