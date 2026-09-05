Audit QMOD v5.8

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


v5.8 UI release: visual-only redesign. Audit workflow, template loading, storage, evidence capture, team comparison, reconciliation and report logic are unchanged from v5.7.
