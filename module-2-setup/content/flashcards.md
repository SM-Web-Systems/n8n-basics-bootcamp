# n8n Flashcards

## Card 1

**Q:** Which file must be edited to set the n8n basic authentication password?

**A:** The .env file.

---

## Card 2

**Q:** What is the specific environment variable used to secure n8n with a password?

**A:** N8N_BASIC_AUTH_PASSWORD

---

## Card 3

**Q:** Which environment variable should be adjusted if the user is located outside of Europe/London?

**A:** GENERIC_TIMEZONE

---

## Card 4

**Q:** What is the name of the Docker container used in this n8n proof-of-concept?

**A:** n8n-poc

---

## Card 5

**Q:** In Docker, what is the first step to verify if the n8n container is running or healthy?

**A:** Check the logs.

---

## Card 6

**Q:** At what local address can you access the n8n editor once the container is running?

**A:** http://localhost:5678

---

## Card 7

**Q:** How does n8n basic authentication differ from the 'owner account' setup on first launch?

**A:** They are separate; basic auth is set in .env while the owner account is created in the browser.

---

## Card 8

**Q:** Why is it acceptable to use any local email and password for the n8n owner account in this demo?

**A:** The instance is not exposed to the internet.

---

## Card 9

**Q:** Where is the 'Import from File...' option located in the n8n editor?

**A:** The three-dot (⋯) menu in the top right corner.

---

## Card 10

**Q:** What is the file name of the demo workflow provided in the repository?

**A:** webhook-alert-demo.json

---

## Card 11

**Q:** Which node serves as the starting point for the demo workflow?

**A:** The Webhook node.

---

## Card 12

**Q:** Which node immediately follows the Webhook node in the demo workflow sequence?

**A:** The Normalize Data node.

---

## Card 13

**Q:** What is the third node in the demo workflow, responsible for branching logic?

**A:** The Check Priority node.

---

## Card 14

**Q:** Name the two final nodes that represent the branches of the 'Check Priority' logic.

**A:** Simulate Slack Alert and No Alert Needed.

---

## Card 15

**Q:** What action must be performed in the n8n editor to make a webhook's production URL live?

**A:** Toggle the 'Active' switch to 'on'.

---

## Card 16

**Q:** Where in the n8n editor can a user find the specific Production URL for a webhook?

**A:** By clicking on the Webhook node itself.

---

## Card 17

**Q:** Which terminal tool is used in the guide to 'fire' or trigger the webhook?

**A:** curl

---

## Card 18

**Q:** In the demo, setting the 'priority' to _____ will trigger the 'false' branch of the workflow.

**A:** normal

---

## Card 19

**Q:** Where in the n8n sidebar can you view a history of successful and failed workflow runs?

**A:** The Executions tab.

---

## Card 20

**Q:** How can a user inspect the specific data at each stage of a finished workflow run?

**A:** Open a record in the Executions tab and click through each node.

---

## Card 21

**Q:** What is considered the core debugging workflow for every n8n project?

**A:** Reviewing data at every stage within the Executions tab.

---

## Card 22

**Q:** Why does the demo ship with a 'Simulate Slack Alert' node instead of a real Slack node?

**A:** To allow the demo to work without external accounts or credentials.

---

## Card 23

**Q:** Which node type should you use to replace 'Simulate Slack Alert' if you want a real email notification?

**A:** The Send Email node.

---

## Card 24

**Q:** When using a real Slack node, what two types of credentials might n8n prompt for?

**A:** An incoming webhook URL or an OAuth token.

---

## Card 25

**Q:** What type of details are required to configure a 'Send Email' node in n8n?

**A:** SMTP details.

---

## Card 26

**Q:** In the demo, what is the n8n expression used to map the alert text into a message body?

**A:** {{ $json.alertText }}

---

## Card 27

**Q:** Which property can be used as an alternative to $json.alertText in the demo alert mapping?

**A:** {{ $json.message }}

---

## Card 28

**Q:** What happens to your workflow and execution history when you run 'docker compose down'?

**A:** They persist in the n8n_data Docker volume.

---

## Card 29

**Q:** What is the name of the Docker volume used to store n8n data persistently?

**A:** n8n_data

---

## Card 30

**Q:** How do you completely wipe the n8n instance and start fresh from a terminal?

**A:** Use the command 'docker compose down -v'.

---

## Card 31

**Q:** The _____ node is used to standardize incoming payload data before it is evaluated by logic nodes.

**A:** Normalize Data

---

## Card 32

**Q:** In n8n, which node state must be achieved to ensure the 'Production URL' is functional?

**A:** Active

---

## Card 33

**Q:** What is the primary purpose of the 'Check Priority' node in the demo workflow?

**A:** To determine if an alert should be sent based on the incoming data.

---

## Card 34

**Q:** True or False: Deleting the 'Simulate Slack Alert' node is required to add a real Slack node.

**A:** False (you can also add the new node after it).

---

## Card 35

**Q:** In the context of n8n setup, what does the .env file allow you to customize?

**A:** Environment variables.

---

## Card 36

**Q:** How do you resume work in n8n after the containers have been stopped?

**A:** Run 'docker compose up -d' again.

---

## Card 37

**Q:** What is the default port used by n8n in this Docker configuration?

**A:** 5678

---

## Card 38

**Q:** Which specific menu do you click to find the 'Import from File' option?

**A:** The ⋯ (More) menu.

---

## Card 39

**Q:** Term: Production URL

**A:** Definition: The live endpoint of a Webhook node that is active and ready for real traffic.

---

## Card 40

**Q:** Term: Execution

**A:** Definition: A single run of a workflow, triggered by a node like a Webhook.

---

## Card 41

**Q:** The demo workflow's 'Normalize Data' node uses which specific node type?

**A:** Set node

---

## Card 42

**Q:** Which part of the n8n interface provides the 'Test URL' vs 'Production URL' distinction for webhooks?

**A:** The Webhook node settings.

---

## Card 43

**Q:** When setting up credentials for a new node, when does n8n typically prompt the user?

**A:** When first selecting the 'Credential' dropdown within the node.

---

## Card 44

**Q:** What is the consequence of leaving the placeholder value for N8N_BASIC_AUTH_PASSWORD in .env?

**A:** The instance remains insecure with a default or placeholder password.

---

## Card 45

**Q:** In n8n, what does the 'Toggle Active' button specifically control?

**A:** Whether the workflow's production triggers and webhooks are live.

---

## Card 46

**Q:** Which directory in the repository contains the demo workflow JSON file?

**A:** workflows/

---

## Card 47

**Q:** What must you do to a workflow after editing it to ensure the changes are live for the Production URL?

**A:** Save the workflow.

---

## Card 48

**Q:** In n8n, where is the 'Active' toggle located?

**A:** The top right of the editor.

---

## Card 49

**Q:** The 'Check Priority' node utilizes which logic-based node type in n8n?

**A:** If node (or Switch node).

---

## Card 50

**Q:** Which file provides additional information on the 'Test URL vs Production URL' distinction according to the guide?

**A:** README.md

---

## Card 51

**Q:** What must be included in a 'curl' call to trigger the 'true' branch of the priority check?

**A:** A JSON payload with "priority": "high" (or equivalent trigger value).

---

## Card 52

**Q:** Concept: $json

**A:** Definition: An n8n variable used in expressions to reference the incoming JSON data of the current node.

---

## Card 53

**Q:** Process: Adding a real alert.

**A:** Step: Add Slack or Send Email node -> Create credentials -> Map data using expressions.

---

## Card 54

**Q:** What indicates that the n8n-poc container is ready for use after starting?

**A:** A 'running/healthy' state.

---
