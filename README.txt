Audit QMOD v5 — Offline Audit + Email Team Review

MAIN FLOW
1. Each auditor creates/continues an audit record offline. Data and compressed photo evidence are autosaved locally in IndexedDB.
2. When ready, press Email Audit Result. The fixed destination is azlan.yusuff@mcmc.gov.my.
3. On mobile/tablet that supports file sharing, Audit QMOD creates one .qmod attachment and opens the device share sheet. Choose Outlook/Mail and send it to the fixed recipient (the address is copied to clipboard where supported).
4. On desktop browsers that cannot attach a generated file directly to mailto, Audit QMOD downloads the .qmod file and opens a pre-addressed email draft. Attach the downloaded .qmod and send.
5. Reviewer downloads 2–3 .qmod attachments from email, opens Team Review, and presses Import Team Results. Multiple files can be selected at once.
6. Imported submissions are read-only. Results are grouped by State Office + Year + Audit Document + Audit Date.
7. Compare auditor decisions, remarks and photo evidence. Different decisions are highlighted.
8. Create Final Review Record, reconcile, then Finalise & Lock.
9. Final Excel / Word / PDF is generated only from the locked final record.

DATA SAFETY
- No Supabase, SharePoint, OneDrive API, background sync, polling or WebSocket.
- Auditor working data remains on the device until the user explicitly emails/saves a .qmod package.
- Imported auditor submissions cannot be edited on the reviewer device.
- Duplicate imports are skipped using submissionId.
- No latest-write-wins merge. Final decisions require human reconciliation.

EMAIL LIMITATION
A normal browser/PWA cannot reliably auto-attach a generated file to a pre-addressed email on every platform. Mobile file-share is the smoothest path. Desktop uses a safe fallback: download .qmod + open the pre-addressed mail composer.

LOW BATTERY DESIGN
IndexedDB local storage, compressed images, static UI, no GPS, no live charts, no cloud sync and no background network activity.
