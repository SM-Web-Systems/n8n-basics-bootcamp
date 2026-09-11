#!/usr/bin/env bash
set -uo pipefail
source /home/webadmin/notebooklm-py/venv/bin/activate
cd /home/webadmin/web-stack/html/n8n-lms

N8N_DOCS=/home/webadmin/web-stack/html/n8n

bash /home/webadmin/.claude/skills/lms-factory/scripts/generate.sh \
  "$PWD/module-1-basics" "n8n Basics Bootcamp: n8n Basics & Core Concepts" \
  "text,audio,video,infographic,slides,quiz,flashcards,mindmap" \
  "$N8N_DOCS/README.md"

bash /home/webadmin/.claude/skills/lms-factory/scripts/generate.sh \
  "$PWD/module-2-setup" "n8n Basics Bootcamp: Setting Up n8n with Docker" \
  "text,audio,video,infographic,slides,quiz,flashcards,mindmap" \
  "$N8N_DOCS/SETUP.md"

bash /home/webadmin/.claude/skills/lms-factory/scripts/generate.sh \
  "$PWD/module-3-workflow" "n8n Basics Bootcamp: Building the Webhook Alert Demo" \
  "text,audio,video,infographic,slides,quiz,flashcards,mindmap" \
  "$N8N_DOCS/diagrams/architecture.md" "$N8N_DOCS/workflows/webhook-alert-demo.json"

bash /home/webadmin/.claude/skills/lms-factory/scripts/generate.sh \
  "$PWD/module-4-practice" "n8n Basics Bootcamp: Practice & Assessment" \
  "text,audio,video,infographic,slides,quiz,flashcards,mindmap" \
  "$N8N_DOCS/EXERCISES.md"

echo "ALL_MODULES_DONE"
