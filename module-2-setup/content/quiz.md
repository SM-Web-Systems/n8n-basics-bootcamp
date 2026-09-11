# n8n Quiz

## Question 1
When configuring the .env file for the first time, what is a required action regarding the N8N_BASIC_AUTH_PASSWORD variable?

- [x] Replace the placeholder with a unique, real password.
- [ ] Delete the variable entirely to disable security.
- [ ] Keep the placeholder to ensure the container starts correctly.
- [ ] Change the variable name to N8N_PASSWORD_SECRET.

**Hint:** Think about the security implications of using default values in a configuration file.

## Question 2
Which port should be used in the browser to access the n8n editor locally?

- [x] 5678
- [ ] 8080
- [ ] 3000
- [ ] 5432

**Hint:** Recall the specific four-digit port number mentioned in the setup instructions for browser access.

## Question 3
How does the 'owner account' setup on first launch relate to the basic-auth credentials configured in the .env file?

- [x] The owner account is a separate setup from basic auth.
- [ ] The owner account automatically uses the .env password.
- [ ] Creating an owner account disables the .env basic auth.
- [ ] The owner account is only required for internet-exposed instances.

**Hint:** Consider if the prompt for local email and password replaces or adds to the .env settings.

## Question 4
Which node is responsible for deciding whether an alert should be sent in the demo workflow?

- [x] Check Priority
- [ ] Normalize Data
- [ ] Webhook
- [ ] Simulate Slack Alert

**Hint:** Look for the node name that implies a conditional evaluation of the input data.

## Question 5
What happens when you toggle the 'Active' switch to 'on' in the n8n editor?

- [x] The Production URL for the webhook becomes live.
- [ ] The editor enters read-only mode to prevent changes.
- [ ] The docker container restarts to apply changes.
- [ ] It automatically triggers a test execution with mock data.

**Hint:** Consider the distinction between Test URLs and Production URLs in the n8n environment.

## Question 6
When testing the workflow using curl, what is the result of a request where the priority is set to 'normal'?

- [x] The 'false' branch takes over and no alert is simulated.
- [ ] The workflow execution fails with a 404 error.
- [ ] The data is ignored by the 'Normalize Data' node.
- [ ] A Slack alert is still sent but marked as low priority.

**Hint:** Think about how a conditional branch reacts when its specific criteria (like 'high' priority) are not met.

## Question 7
Where can a user see the exact data as it appeared at every stage of a previous workflow run?

- [x] The Executions tab in the left sidebar.
- [ ] The Docker container logs in the terminal.
- [ ] The .env file in the root directory.
- [ ] The Webhook node's settings menu.

**Hint:** Look for the interface component dedicated to monitoring and debugging past activity.

## Question 8
What is the correct procedure for replacing the simulated alert with a real Slack notification?

- [x] Add a Slack node and map the message body using the appropriate expression.
- [ ] Modify the 'Simulate Slack Alert' node by adding an API key to its settings.
- [ ] Change the GENERIC_TIMEZONE to 'Slack/UTC'.
- [ ] Re-import the workflow with the 'live-mode' flag enabled.

**Hint:** Think about how n8n uses specialized nodes for third-party integrations and how data is passed to them.

## Question 9
When setting up a real Slack or Email node, when does n8n prompt the user to create or select a credential?

- [x] When first selecting the 'Credential' dropdown within the node.
- [ ] Immediately upon dragging the node onto the canvas.
- [ ] Only when the workflow is toggled to 'Active'.
- [ ] During the initial Docker Compose setup.

**Hint:** Recall the step in the guide where the user adds a real Slack or Email node.

## Question 10
What happens to the workflow and execution history when the n8n Docker container is stopped and restarted?

- [x] They persist because they are stored in a Docker volume called n8n_data.
- [ ] They are wiped unless the user manually exported them to a JSON file.
- [ ] Only the workflow persists; execution history is cleared to save space.
- [ ] The data is moved to the host's /tmp folder temporarily.

**Hint:** Think about how Docker handles persistent storage beyond the life of an individual container.
