Audit QMOD v5.5
================

Production-style offline-first PWA for QMOD audits.

Main workflow
-------------
1. Perform Audit: create or continue an offline audit record.
2. Complete SOP Audit, Wireless BAS, PCS and Wired BAS checklists.
3. Add remarks, finding category, risk rating and photo evidence.
4. Send or save the auditor result as a .qmod package.
5. Review Audit: batch-import .qmod results from 2–3 auditors.
6. Compare decisions, remarks and photo evidence.
7. Reconcile differences in a separate Final Review record.
8. Finalise and lock the agreed result.
9. Generate PDF/Print, Word and Excel reports.

v5.5 changes
------------
- Entire user interface is in English.
- Review Audit now includes Delete controls for individual auditor results.
- Demo Team Data can be removed with Delete Demo Data.
- Final Review drafts/finalised records are visible in Review Audit and can be deleted separately.
- Back from Compare Auditor Results returns to Review Audit.
- Imported/final records also return to Review Audit instead of Perform Audit.
- Improved responsive layout and touch targets for phones and iPhones.
- Separate Take Photo and Choose Photos controls for easier mobile evidence capture.
- Local-only IndexedDB storage; no background sync or polling.

GitHub Pages
------------
Upload all files in this folder to the root of the GitHub Pages repository.
Do not upload the containing folder itself.

The PWA remains offline-first after the first successful online load.
