# Exercises & Quiz

Complete these after finishing `SETUP.md` and getting the demo workflow running.

## Hands-on exercises (increasing difficulty)

1. **Add a field.** In the **Normalize Data** node, add a new field called `source` with a fixed value of `"demo"`. Re-run the webhook and confirm `source` shows up in the execution data.

2. **Add a second branch.** Change **Check Priority** to use n8n's IF node in "multiple outputs" mode (or chain a second IF) so that `priority` of `"high"`, `"normal"`, and anything else each take a different path. Add a distinct NoOp node per branch so you can see all three fire.

3. **Add a scheduled variant.** Duplicate the workflow. Replace the **Webhook** trigger with a **Schedule/Cron** trigger that fires every minute, and feed it fixed test data using a **Set** node instead of relying on the webhook body. This teaches you that everything downstream of a trigger doesn't care *how* the data arrived.

4. **Add error handling.** Add an **Error Trigger** workflow (a separate workflow n8n calls automatically when this one fails) that just logs the error with a NoOp node. Force a failure by temporarily breaking an expression (e.g. reference a field that doesn't exist) and confirm the error workflow fires.

5. **Swap in a real action.** Follow step 8 in `SETUP.md` to replace **Simulate Slack Alert** with a real Slack or Email node, using your own webhook/SMTP credentials.

6. **Add validation.** Add a second IF node right after the Webhook that checks whether `message` is present and non-empty. Route missing/invalid payloads to a NoOp node named "Rejected — Missing Message" instead of continuing through Normalize Data.

## Quiz

1. What is the difference between a workflow's *test* webhook URL and its *production* webhook URL?
2. Why must a workflow be set to **Active** for a Webhook or Cron trigger to fire on its own?
3. In n8n, what is an "item," and why does it matter that nodes process a *list* of items rather than a single object?
4. What's the difference between a trigger node and a regular/action node? Can a workflow have zero trigger nodes and still run?
5. Where would you look to see exactly what data a node received and produced during a specific run?
6. Why are credentials stored separately from individual nodes instead of being pasted into each node's parameters?
7. In the demo workflow, what would happen if you sent a webhook request with no `priority` field at all? Why?
8. What expression syntax would you use inside a node parameter to reference the `message` field from the current item?

### Answer key

1. The test URL is only listening while you have the workflow open in the editor and click "Listen for test event" (fires once); the production URL is only listening once the workflow is toggled **Active**, and stays listening continuously in the background.
2. Because inactive workflows only respond to manual test executions triggered from the editor — n8n won't keep an inactive workflow's triggers registered/listening in the background.
3. An item is a single JSON object representing one unit of data flowing through the workflow. Nodes operate on a *list* of items (not just one), which is why the same node definition can process one record or one thousand without any special looping logic — n8n loops for you.
4. A trigger node starts a workflow's execution (Webhook, Cron, Manual, etc.); a regular/action node does work after the workflow has started (transform data, branch, call an API). Every workflow needs at least one trigger node to run automatically — without one, it can only ever be run manually from the editor.
5. The **Executions** tab/list. Opening a specific execution lets you click through each node and inspect its exact input/output item data for that run.
6. So a credential (API key, OAuth token, SMTP login) can be configured once and reused by many nodes/workflows, and so secrets aren't duplicated in plaintext across every node that uses them.
7. It defaults to `"normal"`, because **Normalize Data** sets `priority` with the expression `{{ $json.body.priority || 'normal' }}`, which falls back to `"normal"` when the field is missing or falsy.
8. `{{ $json.message }}`
