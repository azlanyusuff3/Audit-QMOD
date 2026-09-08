Audit QMOD v5.11.1

Main flow
- Perform Audit
- Review Audit

Repository-managed audit templates
- SOP Audit
- Wireless BAS
- PCS
- Wired BAS

Master template file
- Audit_QMOD_Master_Templates.xlsx
- This workbook is the checklist data source for new audits.
- To publish a checklist update, edit the workbook and replace only this file in the GitHub repository. No app.js or audit-data.js change is required.
- When a user opens Audit QMOD online, the app checks the repository workbook and caches the latest valid version for offline use.
- Existing audits keep their own checklist snapshot for audit integrity.
- For an in-progress POC audit, Audit Templates > Update This Audit can move the draft to the latest repository templates while keeping responses that still have the same Item ID.

Adding another SOP
1. Open Audit_QMOD_Master_Templates.xlsx.
2. Duplicate the SOP Audit sheet.
3. Rename the copied sheet so its name starts with `SOP -` (example: SOP - Complaint).
4. Change Template ID, Template Name, Version and checklist rows.
5. Upload/replace Audit_QMOD_Master_Templates.xlsx in the GitHub repository.
6. Users opening Audit QMOD online will receive the new SOP automatically.

Template rules
- Keep the core sheet names: SOP Audit, Wireless BAS, PCS, Wired BAS.
- Keep existing Item IDs stable when only changing wording.
- Use a new unique Item ID for a new requirement.
- Active = No hides a row.
- Existing audit records and .qmod submissions preserve the template snapshot used for that audit.
- Team comparison blocks records created from different template fingerprints.

Final Review dashboard
- Overall Audit Result with section compliance for all four modules.
- Key Finding Summary generated from reconciled Not Complied items.
- Conclusion generated from final compliance and risk.
- The same summary is included in final Word/PDF and the Excel Summary sheet.

Offline / battery
- IndexedDB local storage
- No realtime sync or background polling
- Repository template check only on app open, New Audit, or Check for Updates
- Photos compressed before storage
- PWA service worker caches the latest valid master workbook for offline use


v5.10 UI release: visual-only redesign. Audit workflow, template loading, storage, evidence capture, team comparison, reconciliation and report logic are unchanged from v5.7.


v5.10 review logic:
- A single auditor result can create a Final Review and proceed to final report.
- Any number of auditor results from the same audit session can be compared together; the previous 3-auditor limit is removed.
- Single-source Final Review pre-fills the auditor's decisions, findings and photo evidence.

v5.10 source-workbook alignment:
- Removed Finding Category and Risk Rating from the audit/review/report UI because those fields are not in the source audit workbook.
- Evidence Expected is always visible and highlighted on every checklist item.
- Evidence Link / Reference, Auditor Remark and Remark align with the original audit-form columns.
- SOP Audit uses one Remark field; Wireless BAS, PCS and Wired BAS retain Auditor Remark + Remark.
- Final report quality gate now requires checklist decisions to be completed; no custom risk/category fields are required.
- Added a floating Top button on audit checklist pages for long mobile/desktop checklists.
- Repository Excel templates now visibly include blank Status / Evidence Link / Auditor Remark / Remark columns while responses remain stored in the app.


v5.11.1 partial-audit merge:
- Added Review Audit > Merge Partial Audit.
- Select 2 or more existing .qmod / Audit QMOD JSON files from the same audit session.
- Intended workflow: SOP Audit on laptop + Wireless BAS / PCS / Wired BAS on phone.
- The app creates ONE new editable auditor record; original files remain unchanged.
- Old v5.10 .qmod files remain readable. No data-format migration is required.
- Merge preserves non-overlapping answers, evidence, remarks and photo evidence.
- If the same field was edited differently in more than one file, the most recently updated value is kept and the merged record is flagged for review.
- Merge is blocked when State Office, Year, Audit Document or checklist template fingerprints do not match. Audit Date may differ between source files (for example an audit spanning 2–3 days). The merged record uses the earliest source date as its main Audit Date and keeps every original source date in merge history.
- IndexedDB database name is unchanged, so existing local records remain available after updating the PWA files.
