# Hospitality Playbook — Event Workspace

A single-file web app for planning corporate hospitality events, built around the
**Corporate Hospitality Playbook** (17 sections across 4 phases, plus a planning timeline).

Each event you create gets its own working copy of the playbook to run as a live
checklist — with notes, collaborators, budgets, vendors, and attachments saved per event.

## Features

- **Events** — create multiple events, each tied to a client, with its own progress %.
- **Playbook checklist** — every step of the playbook, grouped by phase, tick-able per event.
- **Section notes** — a notes box in every section.
- **Section 01 answers** — an answer box under each "Questions to ask" prompt.
- **Budget (Section 04)** — an editable budget total, plus per-line **amount** and
  **In process / Final** status, with a live line-items total. Add your own budget lines.
- **Vendors (Section 11)** — add vendors with a "Contract signed" toggle.
- **Attachments (Section 17)** — attach key-learnings documents to Post-Event Follow-Up.
- **Collaborators** — list teammates per event (placeholder — see limitations).
- **Guide** — the full playbook as a standalone, searchable reference.

## Usage

Open `index.html` in any modern browser. No build step, no server, no install.
All data is saved in the browser's local storage on the machine you use.

## Current limitations (local prototype)

This is a browser-only prototype. In particular:

- **Data is local to one browser** — it isn't synced across devices or people.
- **Collaborators are a placeholder** — adding a teammate does not send a real invite
  or share the event; live multi-user collaboration needs a backend.
- **Attachments** are stored in the browser and limited by its storage quota (~5 MB total),
  so keep files small.

## Roadmap

- Accounts + backend so events sync and can be shared.
- Real email invites and live collaboration.
- Cloud file storage for attachments.

## Origin

Content and visual style are derived from the Corporate Hospitality Playbook design document.
