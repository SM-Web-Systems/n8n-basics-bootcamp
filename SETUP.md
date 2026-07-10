# Setup Guide

Step-by-step instructions to run the demo yourself. Assumes Docker and Docker Compose are already installed (they are on this host).

## 1. Configure environment variables

```bash
cd /home/webadmin/web-stack/html/n8n
cp .env.example .env
```

Edit `.env` and set a real `N8N_BASIC_AUTH_PASSWORD` (don't leave the placeholder). Adjust `GENERIC_TIMEZONE` if you're not in Europe/London.

## 2. Start n8n

```bash
docker compose up -d
docker compose ps
```

You should see the `n8n-poc` container in a running/healthy state. Check logs if anything looks wrong:

```bash
docker compose logs -f n8n
```

## 3. Open the editor

Visit **http://localhost:5678** in a browser. Log in with the basic-auth username/password you set in `.env`.

(n8n may also prompt for an owner account setup on first launch — that's separate from basic auth and is fine to complete with any local email/password, since this instance isn't exposed to the internet.)

## 4. Import the demo workflow

In the n8n editor:

1. Click the **⋯** menu (top right) → **Import from File...**
2. Select `workflows/webhook-alert-demo.json` from this repo.
3. You should see 5 connected nodes: **Webhook → Normalize Data → Check Priority → Simulate Slack Alert / No Alert Needed**.

## 5. Activate the workflow

Toggle **Active** (top right of the editor) to **on**. This makes the webhook's *production* URL live — see the "Test URL vs Production URL" gotcha in `README.md`.

Click the **Webhook** node to see its **Production URL**, something like:

```
http://localhost:5678/webhook/alert-demo
```

## 6. Fire the webhook

From a terminal:

```bash
curl -X POST http://localhost:5678/webhook/alert-demo \
  -H "Content-Type: application/json" \
  -d '{"name": "Dave", "message": "Server CPU at 95%", "priority": "high"}'
```

Try a second call with `"priority": "normal"` (or omit it entirely) to see the false branch take over instead.

## 7. Check the execution

Back in the n8n editor, open the **Executions** tab (left sidebar). You should see a successful execution for each `curl` call. Click one open and click through each node to see exactly what data looked like at every stage — this is the core debugging workflow you'll use for every n8n project.

## 8. (Optional) Wire up a real Slack or Email alert

The demo ships with a **Simulate Slack Alert** Set node instead of a real Slack/Email node so it works with zero external accounts. To send a real alert:

1. Delete the **Simulate Slack Alert** node (or leave it and add a new node after it).
2. Add a **Slack** node (or **Send Email** node) after **Check Priority**'s true branch.
3. Create a new credential (Slack: an incoming webhook URL or OAuth token; Email: your SMTP details) — n8n will prompt you when you first select the node's "Credential" dropdown.
4. Map `{{ $json.alertText }}` (or `{{ $json.message }}`) into the message body field.
5. Save, re-activate, and re-run step 6.

## 9. Tear down

When you're done:

```bash
docker compose down
```

Your workflow and execution history persist in the `n8n_data` Docker volume, so `docker compose up -d` again later picks up right where you left off. To wipe everything and start fresh instead:

```bash
docker compose down -v
```
