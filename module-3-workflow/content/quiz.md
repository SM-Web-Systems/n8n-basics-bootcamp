# n8n Quiz

## Question 1
In the demo workflow, which specific field is added to the JSON payload by the 'Normalize Data' node?

- [x] receivedAt
- [ ] alertText
- [ ] priority
- [ ] executionId

**Hint:** Consider the timestamp metadata that identifies the moment data enters the system logic.

## Question 2
What is the primary relationship between the n8n Editor UI and the n8n server?

- [x] The Editor UI is a client that communicates with the server.
- [ ] The Editor UI executes the code directly in the browser tab.
- [ ] The server is a secondary backup for the Editor UI's local storage.
- [ ] The Editor UI and server are the same monolithic local application.

**Hint:** Think about where the logic resides and how a user interacts with it.

## Question 3
According to the demo workflow definition, which node is used to normalize the incoming data?

- [x] Set node
- [ ] IF node
- [ ] Webhook node
- [ ] Slack node

**Hint:** Identify the component responsible for defining or overriding specific data fields.

## Question 4
What happens to a running execution if the user closes their browser tab containing the Editor UI?

- [x] The workflow continues to run on the server.
- [ ] The execution is paused until the UI is reopened.
- [ ] The execution is terminated immediately to save resources.
- [ ] The execution data is moved to the browser's local storage.

**Hint:** Recall why the server is considered the core engine of the n8n architecture.

## Question 5
In the 'Into Webhook' stage, how is the JSON data structured?

- [x] The data is nested inside a 'body' object.
- [ ] The data is provided as a flat list of key-value pairs.
- [ ] The data is automatically converted into a string.
- [ ] The data includes an 'alertText' field by default.

**Hint:** Look at the initial example item data provided in the data flow table.

## Question 6
Which node is responsible for deciding whether to send a Slack alert or take no action?

- [x] IF node
- [ ] Normalize Data node
- [ ] Slack Alert node
- [ ] Webhook trigger

**Hint:** Think of the node that acts as a fork in the road for the data flow.

## Question 7
If the workflow follows the 'false' branch of the 'No Alert Needed' node, how does the output data differ from the 'Normalize Data' stage?

- [x] The data remains unchanged.
- [ ] The 'receivedAt' timestamp is removed.
- [ ] A 'noAlert' flag is added to the JSON.
- [ ] The 'body' wrapper is reapplied to the data.

**Hint:** Refer to the 'What changes at each step' table for the false branch behavior.

## Question 8
What core responsibility does the n8n server have regarding workflows?

- [x] Storing workflows and running executions.
- [ ] Providing the graphical drag-and-drop interface.
- [ ] Rendering the workflow diagrams for documentation.
- [ ] Managing the user's browser extensions.

**Hint:** Focus on the 'Key idea' section of the n8n component overview.

## Question 9
Which field is used by the IF node to branch the demo workflow?

- [x] priority
- [ ] message
- [ ] name
- [ ] receivedAt

**Hint:** Consider which attribute determines if a situation is 'high priority' or not.

## Question 10
In the Slack Alert branch, what is the structure of the 'alertText' field?

- [x] A string combining an emoji, the priority level, the name, and the message.
- [ ] A boolean indicating whether the alert was successfully sent.
- [ ] An array of all previous messages from that user.
- [ ] A nested JSON object containing only the raw message.

**Hint:** Look closely at the example item data for the 'Simulate Slack Alert' stage.
