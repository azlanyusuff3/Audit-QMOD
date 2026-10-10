/* Audit QMOD v5.14 mobile presentation layer.
   CSS breakpoints choose mobile or desktop; no User-Agent detection.
   Existing audit actions and IndexedDB remain the same. */
(function() {
  'use strict';
  const originalUiTable = uiTable;
  const originalUiFilterRows = uiFilterRows;
  const originalUiDashboardHTML = uiDashboardHTML;

  function mobileStatus(record) {
    const s = uiStatus(record);
    return '<span class="aq-pill '+s.key+'">'+esc(s.label)+'</span>';
  }

  function mobileAuditCard(record, scope) {
    const t = totalStatsFor(record);
    const safeId = uiArg(record.id);
    const s = uiStatus(record);
    const search = esc([record.id,record.info?.stateOffice,record.info?.auditorName,record.info?.auditDocument,record.info?.auditDate].join(' ').toLowerCase());
    const percent = pct(t.done,t.total);
    const editable = record.recordType!=='final' && !record.importedAt;
    const sel = scope==='records' && record.recordType!=='final'
      ? '<label class="aq-mobile-select"><input type="checkbox" '+(compareSelection.has(record.id)?'checked':'')+' onchange="toggleCompareSelection('+safeId+',this.checked)"> Compare</label>'
      : '';
    const extra = scope==='records' ? '<details class="aq-mobile-more"><summary>More actions</summary><div class="aq-mobile-extra">'
      +(editable?'<button type="button" onclick="exportAuditorSubmission('+safeId+')">Save .qmod</button><button type="button" onclick="emailAuditResult('+safeId+')">Send result</button>':'')
      +'<button type="button" onclick="exportRecordBackup('+safeId+')">Backup this audit</button>'
      +'<button type="button" class="danger" onclick="deleteAuditRecord('+safeId+')">Delete audit</button></div></details>' : '';
    return '<article class="aq-mobile-record" data-search="'+search+'" data-status="'+s.key+'">'
      +'<div class="aq-mobile-card-top"><div class="aq-mobile-card-heading"><span class="aq-mobile-card-eyebrow">AUDIT RECORD</span>'
      +'<h3>'+esc(record.info?.stateOffice||'New Audit')+'</h3></div>'+mobileStatus(record)+'</div>'
      +'<div class="aq-mobile-card-document">'+esc(record.info?.auditDocument||'No audit document selected')+'</div>'
      +'<div class="aq-mobile-card-details"><span><b>Auditor</b>'+esc(record.info?.auditorName||'Not assigned')+'</span>'
      +'<span><b>Audit date</b>'+esc(record.info?.auditDate||'Not set')+'</span></div>'
      +'<div class="aq-mobile-card-progress"><div><b>Checklist progress</b><span>'+t.done+'/'+t.total+' completed · '+percent+'%</span></div>'
      +'<div class="aq-mobile-card-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+percent+'" aria-label="Checklist completion"><i style="width:'+percent+'%"></i></div></div>'
      +'<div class="aq-mobile-card-foot"><button type="button" class="aq-mobile-open" onclick="openAuditRecord('+safeId+')">'
      +(record.recordType==='final'?'Open final review':record.importedAt?'View auditor source':'Continue audit')+' <span aria-hidden="true">→</span></button>'
      +sel+extra+'</div></article>';
  }

  uiTable = function(rows,scope) {
    const desktop = originalUiTable(rows,scope);
    const cards = rows.length ? rows.map(r=>mobileAuditCard(r,scope)).join('') :
      '<div class="aq-empty"><b>No audits to display</b>Create an audit to start.</div>';
    return '<div class="aq-desktop-audit-table">'+desktop+'</div>'
      +'<div class="aq-mobile-audit-list" aria-label="Mobile audit list">'+cards
      +'<p class="aq-mobile-result-count" id="aq-'+scope+'-mobile-count">Showing '+rows.length+' audit(s) on this device</p></div>';
  };

  uiFilterRows = function(scope) {
    originalUiFilterRows(scope);
    const root = document.getElementById('aq-'+scope+'-panel');
    if(!root) return;
    const query = (document.getElementById('aq-'+scope+'-search')?.value||'').trim().toLowerCase();
    const status = document.getElementById('aq-'+scope+'-status')?.value||'all';
    let count = 0;
    for(const card of root.querySelectorAll('.aq-mobile-record')) {
      const visible = (!query || card.dataset.search.includes(query)) && (status==='all' || card.dataset.status===status);
      card.hidden = !visible;
      if(visible) count++;
    }
    const counter = document.getElementById('aq-'+scope+'-mobile-count');
    if(counter) counter.textContent = count+' matching audit(s)';
  };

  uiDashboardHTML = function() {
    const html = originalUiDashboardHTML();
    const shortcuts = '<div class="aq-mobile-shortcuts" aria-label="Quick actions">'
      +'<button type="button" onclick="uiGo(&quot;new&quot;)"><span aria-hidden="true">＋</span>New Audit</button>'
      +'<button type="button" onclick="uiGo(&quot;records&quot;)"><span aria-hidden="true">▤</span>My Audits</button>'
      +'<button type="button" onclick="uiGo(&quot;team&quot;)"><span aria-hidden="true">◇</span>Final Review</button>'
      +'<button type="button" onclick="uiGo(&quot;backup&quot;)"><span aria-hidden="true">⇩</span>Backup</button>'
      +'</div>';
    return html.replace('<div class="aq-content-grid">',shortcuts+'<div class="aq-content-grid">');
  };

  // Native phone navigation has a distinct collapse state from desktop sidebar.
  // Closing on resize also prevents the drawer remaining open after rotating the device.
  const prevMenu = uiToggleMenu;
  uiToggleMenu = function(force) {
    prevMenu(force);
    const open = document.body.classList.contains('aq-menu-open');
    const menu = document.querySelector('.aq-menu');
    const sidebar = document.getElementById('aqSidebar');
    if(menu) menu.setAttribute('aria-expanded',String(open));
    if(sidebar) sidebar.setAttribute('aria-hidden',String(!open && window.matchMedia('(max-width: 820px)').matches));
  };

  window.addEventListener('resize',function(){
    if(window.matchMedia('(min-width: 821px)').matches && document.body.classList.contains('aq-menu-open')) uiToggleMenu(false);
  },{passive:true});
})();
