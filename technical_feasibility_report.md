# OneSystem Technical Feasibility & Strategy Report
**Status:** DRAFT | **Date:** Jan 08, 2026

## 1. Executive Summary
The "OneSystem" vision is powerful but faces specific technical and policy constraints in 2026. This report validates the feasibility of each module and highlights critical blockers that must be addressed to ensure scalability and compliance.

## 2. Critical "Must Adds" (New Requirements)
These tasks were missing from the original list but are technically required for the system to function.

### A. Infrastructure & Deliverability
*   **Email Relay Service (SendGrid/Amazon SES):**
    *   *Reason:* Google Workspace limits sending to 2,000 emails/day. Exceeding this gets your domain blocked.
    *   *Action:* You need a dedicated SMTP relay for bulk campaigns. SendGrid offers nonprofit discounts.
*   **Whatsapp Template Management:**
    *   *Reason:* Meta API does *not* allow free-form messaging to users who haven't messaged you in the last 24 hours. You must use pre-approved "Templates".
    *   *Action:* A specific workflow for "Template Submission & Approval" is needed in the Automation module.

### B. Compliance & Safety
*   **Opt-in Database Field:**
    *   *Reason:* Meta strictly bans "Cold Outreach" via API. You can get your number banned permanently if reported for spamming users who didn't opt-in.
    *   *Action:* CRM must have a strict boolean flag `whatsapp_consent_obtained`.

## 3. The "Cannot Adds" (Technical Hard Limits)
These requested features are either impossible or highly risky under current platforms.

| Feature Request | Feasibility | Reason | Alternative |
| :--- | :--- | :--- | :--- |
| **"Cold Outreach" via WhatsApp** | 🛑 **BLOCKED** | Meta Policy strictly forbids unsolicited messages. Risk of number ban is 100%. | Use SMS (Twilio) for cold outreach or Email first to get WhatsApp opt-in. |
| **Unlimited Gmail Sending** | 🛑 **BLOCKED** | Google Workspace hard limit: 2,000/day. | Integrate SendGrid/Mailgun for broadcast emails. |
| **Voice Agent (AI Calling)** | ⚠️ **RISKY** | High cost & latency. "Robot" calls often damage donor trust in India. | Use AI for *inbound* call handling/routing first. |

## 4. Architecture Recommendation: "The Glue Strategy"
Building a CRM from scratch is dangerous for a "solo system owner". It creates a heavy maintenance burden.

**Recommended Stack:**
1.  **Frontend (The "OneSystem" Dashboard):**
    *   Custom React/Next.js App (What we are building).
    *   *Role:* The "Single Pane of Glass" for the CEO/Staff.
2.  **Backend (The Engines):**
    *   **Database:** PostgreSQL / Supabase (Single Source of Truth).
    *   **Auth:** Firebase or Supabase Auth.
    *   **Project Mgmt:** Jira APIs (Do not rebuild Jira).
    *   **Automation:** n8n (Self-hosted) or Make.com.
    *   **Storage:** Google Drive API (for photos/docs).

## 5. Strategic Roadmap Adjustments
We have updated your Task List with the following high-priority governance tasks:

1.  [P0] **Audit Cold Outreach Strategy:** Verify compliance with Meta Business Policy.
2.  [P0] **Setup Dedicated SMTP Relay:** Register for SendGrid Impact Program (Nonprofit).
3.  [P1] **Define "Opt-In" Data Model:** Update CRM schema to store consent proof.
4.  [P1] **WhatsApp Template Strategy:** Design 5-10 "Utility" templates for approval.

### Conclusion
The vision is achievable if we shift "Cold Outreach" to Email/SMS and reserve WhatsApp for "High-Engagement" nurturing. The system infrastructure must decouple "Business Logic" (Rules) from "Delivery" (Email/WhatsApp providers) to survive bans or price hikes.
