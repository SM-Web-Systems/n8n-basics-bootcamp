# n8n Webhook Alert Demo: Comprehensive Study Guide

This study guide provides a structured overview of the setup, execution, and optimization of an n8n webhook alert demonstration. It is designed to assist learners in understanding the mechanics of workflow automation, data normalization, and conditional logic within the n8n environment.

---

## 1. Core Workflow Concepts

The demonstration workflow is designed to process incoming data via a webhook and trigger alerts based on specific criteria. Understanding the following components is essential for mastering the setup.

### The Workflow Pipeline
The demo consists of five interconnected nodes that process data sequentially:
1.  **Webhook:** The entry point that receives external HTTP requests.
2.  **Normalize Data:** A processing step to ensure incoming data is formatted correctly.
3.  **Check Priority:** A logic gate that evaluates the data (e.g., checking if priority is "high").
4.  **Simulate Slack Alert:** The "True" branch executed if priority meets the criteria.
5.  **No Alert Needed:** The "False" branch executed if priority is normal or missing.

### Environment Configuration
Before launching the application, the environment must be configured using a `.env` file. Key variables include:
*   **N8N_BASIC_AUTH_PASSWORD:** Secures the editor interface.
*   **GENERIC_TIMEZONE:** Synchronizes the instance with the local time of the user.

### Testing vs. Production
A critical distinction in n8n is the state of the Webhook node:
*   **Test URL:** Used during the design phase for immediate feedback within the editor.
*   **Production URL:** Becomes active only when the workflow is toggled to **Active**. This URL is used for real-world triggers.

---

## 2. Short-Answer Practice Questions

**Q1: What is the primary purpose of the "Executions" tab in the n8n editor?**
*Answer:* The Executions tab is used for debugging. It allows users to view successful runs, click into specific executions, and inspect exactly what the data looked like at every stage of the workflow.

**Q2: Why does the demo use a "Simulate Slack Alert" node instead of a real Slack node by default?**
*Answer:* It is designed to work "out of the box" with zero external accounts. This allows the user to test the logic of the workflow without needing to provide API credentials or webhooks for third-party services.

**Q3: Which command-line tool is recommended for "firing" the webhook to test the workflow?**
*Answer:* The `curl` command is used to send a POST request to the webhook URL from a terminal.

**Q4: What is the difference between "Basic Auth" and the "Owner Account" in this setup?**
*Answer:* Basic Auth is configured in the `.env` file to protect the instance. The Owner Account is a separate setup prompted by n8n on the first launch for local email/password registration; it is not exposed to the internet in this specific proof-of-concept.

**Q5: How can a user ensure their workflow data persists even if the Docker containers are stopped?**
*Answer:* Data and execution history are stored in a Docker volume (specifically `n8n_data`). Using `docker compose up -d` allows the user to resume exactly where they left off.

---

## 3. Essay Prompts for Deeper Exploration

### Exercise 1: Architectural Logic and Data Normalization
*Discuss the importance of the "Normalize Data" node in an automated workflow. Why might an architect choose to include a normalization step immediately after a Webhook node rather than proceeding directly to the "Check Priority" logic? Reference the impact this has on long-term workflow stability.*

### Exercise 2: Transitioning from Prototype to Production
*The setup guide describes a process for replacing a simulation node with a real Slack or Email node. Explain the steps required to manage credentials and data mapping (e.g., using `$json.alertText`) during this transition. What are the potential risks and requirements when moving from a simulated environment to a live integration?*

### Exercise 3: The Role of Environment Variables in Deployment
*Analyze the role of the `.env` file and Docker Compose in the deployment of n8n. How does this infrastructure-as-code approach facilitate the setup for different users in different timezones, and what are the security implications of failing to adjust placeholder values?*

---

## 4. Glossary of Important Terms

| Term | Definition |
| :--- | :--- |
| **.env File** | A configuration file used to define environment variables such as passwords and timezones. |
| **Basic Auth** | A simple authentication method using a username and password to restrict access to the n8n editor. |
| **Credential** | Sensitive information (like API tokens or SMTP details) required by n8n to communicate with external services like Slack or Email. |
| **Docker Compose** | A tool for defining and running multi-container Docker applications; used here to launch the n8n-poc container. |
| **Execution** | A single run of a workflow. The history of these runs is stored in the "Executions" tab for debugging. |
| **JSON Mapping** | The process of linking specific data fields (e.g., `{{ $json.message }}`) from one node into the input fields of a subsequent node. |
| **Node** | An individual building block in a workflow that performs a specific function, such as receiving a webhook or sending an email. |
| **Production URL** | The permanent URL for a webhook that is only active when the workflow is set to "Active" mode. |
| **Webhook** | A method for one application to provide real-time information to another; in this context, it triggers the n8n workflow. |
| **Workflow** | A series of connected nodes that automate a specific task or process. |