
// CONFIGURATION
// Paste your Google Web App URL here to enable Cloud Sync
const API_URL = 'https://script.google.com/macros/s/AKfycbwomBtM8GKIifbtj48vrbHmoEdJl6IQnVNT63BTGX8OGBKRbO7Hfuiv6xNIYHwNIIi9/exec';

// ICONS
const ICONS = {
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
};

// INITIAL DATA
const TODAY = new Date();
const addDays = (days) => {
  const d = new Date(TODAY);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

const INITIAL_DATA_RAW = [
  // 1. CORE SYSTEM ARCHITECTURE
  { t: "Design unified operating system", p: "high", c: "Core Architecture", d: addDays(2) },
  { t: "Define system architecture layers", p: "high", c: "Core Architecture", d: addDays(2) },
  { t: "Decide build vs buy vs integrate", p: "high", c: "Core Architecture", d: addDays(3) },
  { t: "Ensure solo-operator maintainability", p: "high", c: "Core Architecture", d: addDays(3) },
  { t: "Ensure scalability to 50+ users", p: "high", c: "Core Architecture", d: addDays(3) },
  { t: "Prevent data silos", p: "high", c: "Core Architecture", d: addDays(3) },
  { t: "Define single source of truth", p: "high", c: "Core Architecture", d: addDays(3) },

  // 2. CRM (CENTRAL BRAIN)
  { t: "Select central CRM platform", p: "high", c: "CRM", d: addDays(4) },
  { t: "Create CRM modules (Leads, Donors, etc)", p: "high", c: "CRM", d: addDays(4) },
  { t: "Configure role-based views", p: "high", c: "CRM", d: addDays(5) },
  { t: "Log all activities automatically", p: "high", c: "CRM", d: addDays(5) },
  { t: "Automate reminders & follow-ups", p: "high", c: "CRM", d: addDays(5) },
  { t: "Migrate 200–300 past events", p: "medium", c: "CRM", d: addDays(10) },
  { t: "Configure permissions", p: "high", c: "CRM", d: addDays(6) },

  // 3. OUTBOUND SALES SYSTEM
  { t: "Define outbound sales workflow", p: "high", c: "Sales", d: addDays(7) },
  { t: "Track email / WhatsApp / calls", p: "high", c: "Sales", d: addDays(7) },
  { t: "Track outreach metrics", p: "high", c: "Sales", d: addDays(7) },
  { t: "Define pipeline stages", p: "high", c: "Sales", d: addDays(7) },
  { t: "Track deal values & revenue", p: "high", c: "Sales", d: addDays(8) },
  { t: "Track sales cycle duration", p: "medium", c: "Sales", d: addDays(14) },
  { t: "Track repeat clients & renewals", p: "medium", c: "Sales", d: addDays(14) },
  { t: "Automate sales follow-ups", p: "high", c: "Sales", d: addDays(8) },
  { t: "Calendar-based reminders", p: "high", c: "Sales", d: addDays(8) },

  // 4. FOLLOW-UP AUTOMATION
  { t: "Identify follow-up triggers", p: "high", c: "Automation", d: addDays(9) },
  { t: "Email follow-up automation", p: "high", c: "Automation", d: addDays(9) },
  { t: "WhatsApp follow-up automation", p: "high", c: "Automation", d: addDays(9) },
  { t: "Call reminder automation", p: "medium", c: "Automation", d: addDays(12) },
  { t: "Conditional logic (no reply, proposal sent)", p: "high", c: "Automation", d: addDays(10) },
  { t: "Snooze & reschedule logic", p: "medium", c: "Automation", d: addDays(12) },

  // 5. WHATSAPP AUTOMATION
  { t: "Configure Meta WhatsApp API", p: "high", c: "WhatsApp", d: addDays(10) },
  { t: "Enable two-way conversations", p: "high", c: "WhatsApp", d: addDays(10) },
  { t: "Create approved templates", p: "high", c: "WhatsApp", d: addDays(10) },
  { t: "CRM integration (WhatsApp)", p: "high", c: "WhatsApp", d: addDays(11) },
  { t: "Number safety & compliance", p: "high", c: "WhatsApp", d: addDays(11) },
  { t: "Conversation logging", p: "high", c: "WhatsApp", d: addDays(11) },

  // 6. EMAIL SYSTEM
  { t: "Google Workspace integration", p: "high", c: "Email", d: addDays(12) },
  { t: "Bulk email sending", p: "high", c: "Email", d: addDays(12) },
  { t: "Audience segmentation", p: "high", c: "Email", d: addDays(12) },
  { t: "Personalization tokens", p: "high", c: "Email", d: addDays(13) },
  { t: "Reply detection", p: "high", c: "Email", d: addDays(13) },

  // 8. PROJECT MANAGEMENT
  { t: "Configure Jira projects", p: "high", c: "Projects", d: addDays(14) },
  { t: "Event & campaign projects", p: "high", c: "Projects", d: addDays(14) },
  { t: "Workflow definitions", p: "high", c: "Projects", d: addDays(14) },
  { t: "Task ownership & deadlines", p: "high", c: "Projects", d: addDays(14) },
  { t: "Progress dashboards", p: "high", c: "Projects", d: addDays(15) },
  { t: "CRM ↔ Jira integration", p: "high", c: "Projects", d: addDays(15) },

  // 9. EVENT CRM
  { t: "Event as project model", p: "high", c: "Events", d: addDays(15) },
  { t: "Event checklists", p: "high", c: "Events", d: addDays(15) },
  { t: "Lifecycle tracking", p: "high", c: "Events", d: addDays(16) },
  { t: "Contact tracking", p: "high", c: "Events", d: addDays(16) },
  { t: "Report submission tracking", p: "high", c: "Events", d: addDays(16) },

  // 11. CUSTOM WEBSITES
  { t: "Certificate generation sites", p: "high", c: "Websites", d: addDays(18) },
  { t: "Campaign landing pages", p: "high", c: "Websites", d: addDays(18) },
  { t: "Form-based data capture", p: "high", c: "Websites", d: addDays(19) },
  { t: "Auto certificate generation", p: "high", c: "Websites", d: addDays(19) },
  { t: "Download support", p: "high", c: "Websites", d: addDays(19) },
  { t: "Template reuse", p: "high", c: "Websites", d: addDays(20) },

  // 12. DESIGN SYSTEM
  { t: "Certificate templates", p: "high", c: "Design", d: addDays(20) },
  { t: "Non-designer editing capabilities", p: "high", c: "Design", d: addDays(20) },
  { t: "Brand consistency guide", p: "high", c: "Design", d: addDays(20) },

  // 13. DATA EXTRACTION
  { t: "Structured storage for scraped data", p: "high", c: "Data", d: addDays(22) },
  { t: "Source identification", p: "medium", c: "Data", d: addDays(25) },
  { t: "Location & Org scraping", p: "medium", c: "Data", d: addDays(25) },

  // 14. REPORTING
  { t: "Sales dashboards", p: "high", c: "Reporting", d: addDays(30) },
  { t: "Client servicing dashboards", p: "high", c: "Reporting", d: addDays(30) },
  { t: "Operations dashboards", p: "high", c: "Reporting", d: addDays(30) },
  { t: "CEO snapshot dashboard", p: "high", c: "Reporting", d: addDays(30) },
  { t: "Auto-refresh logic", p: "high", c: "Reporting", d: addDays(31) },

  // 15. IMPACT REPORTING
  { t: "Impact report templates", p: "high", c: "Impact", d: addDays(32) },
  { t: "Automated report generation", p: "high", c: "Impact", d: addDays(32) },
  { t: "PDF / deck export", p: "high", c: "Impact", d: addDays(32) },

  // 17. DONOR ENGAGEMENT
  { t: "Donor database setup", p: "high", c: "Donors", d: addDays(35) },
  { t: "Monthly messaging automation", p: "high", c: "Donors", d: addDays(35) },
  { t: "Month-based logic", p: "medium", c: "Donors", d: addDays(40) },

  // 18. CAMPAIGNS
  { t: "Campaign workflow design", p: "high", c: "Campaigns", d: addDays(36) },
  { t: "Outreach automation", p: "high", c: "Campaigns", d: addDays(36) },
  { t: "Participation tracking", p: "high", c: "Campaigns", d: addDays(37) },
  { t: "Performance metrics", p: "medium", c: "Campaigns", d: addDays(40) },

  // 21. FINANCE
  { t: "Budget templates", p: "high", c: "Finance", d: addDays(45) },
  { t: "Dynamic calculators", p: "high", c: "Finance", d: addDays(45) },
  { t: "Event-wise reuse", p: "high", c: "Finance", d: addDays(45) },

  // 22. TEAM TASK SCHEDULING
  { t: "Daily task assignment logic", p: "high", c: "Team", d: addDays(50) },
  { t: "Morning reminders", p: "high", c: "Team", d: addDays(50) },
  { t: "Evening status collection", p: "high", c: "Team", d: addDays(50) },
  { t: "WhatsApp nudges", p: "high", c: "Team", d: addDays(50) },

  // 24. GOVERNANCE
  { t: "Automation vs manual rules", p: "high", c: "Gov", d: addDays(60) },
  { t: "Documentation", p: "high", c: "Gov", d: addDays(60) },
];

// STATE
let tasks = [];
let currentFilter = 'all';
let currentSort = 'default';

// FUNCTIONS (Global)
window.init = async function () {
  let loadedFromCloud = false;

  // CLOUD SYNC
  if (API_URL) {
    document.body.insertAdjacentHTML('afterbegin', `<div id="sync-status" style="position:fixed; top:10px; right:120px; background:#6366f1; color:white; padding:6px 12px; border-radius:20px; font-size:0.75rem; z-index:1000; display:none; font-weight:600; box-shadow:0 4px 6px rgba(0,0,0,0.1);">Saving...</div>`);

    try {
      const res = await fetch(`${API_URL}?action=read`);
      const json = await res.json();
      if (json.status === 'success') {
        const localData = localStorage.getItem('antigravity_tasks_v2');

        // Smart Sync: If Cloud is empty but Local has data, use Local and push to Cloud
        if (json.data.length === 0 && localData) {
          console.log('First Sync: Uploading local data to Cloud...');
          loadedFromCloud = false; // Fallback to local loader
          setTimeout(() => {
            const s = document.getElementById('sync-status');
            if (s) { s.style.display = 'block'; s.textContent = 'First Sync...'; }
            window.save();
          }, 2000);
        } else {
          tasks = json.data;
          tasks.forEach(migrateData);
          loadedFromCloud = true;
          console.log('Loaded from Cloud');
        }
      }
    } catch (e) {
      console.warn('Cloud Load Warning: using local data for now.', e);
      // alert('Connection Error: Working offline. Data will stick to this device only.');
    }
  }

  // LOCAL FALLBACK (Only if Cloud failed)
  if (!loadedFromCloud) {
    const stored = localStorage.getItem('antigravity_tasks_v2');
    if (stored) {
      tasks = JSON.parse(stored);
      tasks.forEach(migrateData);
    }
  }

  // FINAL CHECK: If tasks are still empty (Cloud was empty OR Local was empty), SEED IT.
  if (tasks.length === 0) {
    console.log('Zero tasks detected in Cloud/Local. Injecting Roadmap...');
    tasks = INITIAL_DATA_RAW.map((item, idx) => ({
      id: `seed-${idx}`,
      title: item.t,
      priority: item.p,
      category: item.c,
      dueDate: item.d,
      progress: 0,
      logs: [],
      notes: '',
      completed: false,
      isVisible: true,
      createdAt: Date.now()
    }));
    window.save();
  }

  window.render();
};

function migrateData(t) {
  if (!t.logs) t.logs = [];
  // Convert old string notes to first log if exists
  if (t.notes && t.notes.trim().length > 0 && t.logs.length === 0) {
    t.logs.push({
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: 'Legacy Note',
      text: t.notes
    });
    t.notes = '';
  }
}

// Debounce Save
let saveTimeout;
window.save = function () {
  // Always save local backup
  localStorage.setItem('antigravity_tasks_v2', JSON.stringify(tasks));

  if (API_URL) {
    clearTimeout(saveTimeout);
    const statusEl = document.getElementById('sync-status');
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.textContent = 'Syncing...';
      statusEl.style.background = '#6366f1';
    }

    saveTimeout = setTimeout(async () => {
      try {
        await fetch(API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tasks: tasks })
        });
        if (statusEl) {
          statusEl.textContent = 'Saved';
          statusEl.style.background = '#10b981';
          setTimeout(() => statusEl.style.display = 'none', 2000);
        }
      } catch (e) {
        console.error('Cloud Save Error', e);
        if (statusEl) {
          statusEl.textContent = 'Offline';
          statusEl.style.background = '#ef4444';
        }
      }
    }, 1500); // 1.5s debounce
  }
};


window.resetApp = function () {
  if (confirm('FULL RESET: This will delete all your progress and restore factory defaults. Are you sure?')) {
    localStorage.removeItem('antigravity_tasks_v2');
    location.reload();
  }
};

window.toggleExpand = function (id) {
  const card = document.getElementById(`card-${id}`);
  if (card) {
    if (card.classList.contains('open')) {
      card.classList.remove('open');
    } else {
      card.classList.add('open');
    }
  }
};

window.updateProgress = function (id, val) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    let newVal = parseInt(val);
    if (newVal > 100) newVal = 100;
    if (newVal < 0) newVal = 0;
    task.progress = newVal;
    window.save();
    window.render();

    setTimeout(() => {
      const c = document.getElementById(`card-${id}`);
      if (c) c.classList.add('open');
    }, 0);
  }
};

window.addProgress = function (id, delta) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    let p = (task.progress || 0) + delta;
    window.updateProgress(id, p);
  }
};

window.updateTitle = function (id, el) {
  const task = tasks.find(t => t.id === id);
  const newTitle = el.innerText.trim();
  if (task && newTitle && newTitle !== task.title) {
    task.title = newTitle;
    window.save();
  }
};

window.deleteTask = function (e, id) {
  e.stopPropagation();
  if (confirm('Delete this task?')) {
    tasks = tasks.filter(t => t.id !== id);
    window.save();
    window.render();
  }
};

window.setFilter = function (filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
    if (b.dataset.filter === filter) b.classList.add('active');
  });
  window.render();
};

window.addTask = function () {
  const input = document.getElementById('task-input');
  const pSelect = document.getElementById('new-task-priority');
  const cInput = document.getElementById('new-task-category');

  const title = input.value.trim();
  const priority = pSelect.value;
  const category = cInput.value.trim() || 'General';

  if (!title) return;

  tasks.unshift({
    id: Date.now().toString(),
    title,
    priority: priority,
    category: category,
    dueDate: new Date().toISOString().split('T')[0],
    progress: 0,
    logs: [],
    notes: '',
    completed: false,
    isVisible: true,
    createdAt: Date.now()
  });
  window.save();
  input.value = '';
  cInput.value = '';
  window.render();
};

window.updateCategory = function (id, val) {
  const task = tasks.find(t => t.id === id);
  // Support both element (contenteditable) and direct value
  const newCat = (val instanceof HTMLElement) ? val.innerText.trim() : val;

  if (task && newCat && newCat !== task.category) {
    task.category = newCat;
    window.save();
    if (!(val instanceof HTMLElement)) window.render(); // Re-render if changed via dropdown
  }
};

window.setPriority = function (id, val) {
  const task = tasks.find(t => t.id === id);
  if (task && task.priority !== val) {
    task.priority = val;
    window.save();
    window.render();
  }
};

// --- LOGGING SYSTEM ---
window.addLog = function (id, textInput) {
  // Check if input is string or element (support both)
  let val = '';
  if (typeof textInput === 'string') val = textInput;
  else val = textInput.value.trim();

  if (!val) return;

  const task = tasks.find(t => t.id === id);
  if (task) {
    if (!task.logs) task.logs = [];

    const now = new Date();
    task.logs.unshift({
      id: Date.now(),
      date: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      text: val
    });

    window.save();
    window.render();

    setTimeout(() => {
      const c = document.getElementById(`card-${id}`);
      if (c) c.classList.add('open');
    }, 0);
  }
};

window.submitLog = function (e, id) {
  const btn = e.target;
  const container = btn.closest('.log-group');
  const input = container.querySelector('.log-input');
  window.addLog(id, input);
};

// VISIBILITY
window.toggleVisibility = function (e, id) {
  e.stopPropagation();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.isVisible = !task.isVisible;
    window.save();
    window.render();
  }
};

window.setSort = function (sortVal) {
  currentSort = sortVal;
  window.render();
};

// RENDER
window.render = function () {
  // Stats
  const total = tasks.length;
  let totalP = 0;
  tasks.forEach(t => totalP += (t.progress || 0));
  const global = total === 0 ? 0 : Math.round(totalP / total);
  const p0 = tasks.filter(t => t.priority === 'high' && (t.progress || 0) < 100).length;

  if (document.getElementById('global-stat')) document.getElementById('global-stat').textContent = `${global}%`;
  if (document.getElementById('p0-stat')) document.getElementById('p0-stat').textContent = p0;

  // Filter
  // Filter
  let filtered = tasks;
  if (currentFilter === 'high') {
    filtered = tasks.filter(t => t.priority === 'high');
  } else if (currentFilter !== 'all') {
    // Generic category filter (case insensitive)
    filtered = tasks.filter(t => (t.category || '').toLowerCase() === currentFilter.toLowerCase());
  }

  // Sort
  if (currentSort !== 'default') {
    filtered.sort((a, b) => {
      if (currentSort === 'p-high') {
        const pMap = { high: 3, medium: 2, low: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      if (currentSort === 'p-low') {
        const pMap = { high: 3, medium: 2, low: 1 };
        return pMap[a.priority] - pMap[b.priority];
      }
      if (currentSort === 'prog-high') { return (b.progress || 0) - (a.progress || 0); }
      if (currentSort === 'prog-low') { return (a.progress || 0) - (b.progress || 0); }
      return 0;
    });
  }

  const list = document.getElementById('task-list');
  list.innerHTML = '';

  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center; color:#64748b; padding:20px;">No tasks found.</div>`;
    return;
  }

  filtered.forEach(task => {
    if (task.isVisible === undefined) task.isVisible = true;

    const progress = task.progress || 0;
    const isDone = progress === 100;
    const isHidden = !task.isVisible;

    const r = 18; const c = 2 * Math.PI * r; const offset = c - (progress / 100) * c;
    const ringColor = isDone ? 'var(--success)' : 'var(--primary)';

    // LOGS HTML
    if (!task.logs) task.logs = [];
    let logsHtml = '';
    if (task.logs.length > 0) {
      logsHtml = task.logs.map(log => `
           <div class="log-entry-card">
              <div class="log-entry-header">
                 <span class="log-date">${log.date}</span>
                 <span class="log-time">${log.time}</span>
              </div>
              <div class="log-entry-body">${escapeHtml(log.text)}</div>
           </div>
         `).join('');
    } else {
      logsHtml = `<div style="text-align:center; color:#475569; font-size:0.8rem; padding:10px;">No updates yet.</div>`;
    }

    const borderColors = { high: 'border-l-accent-red', medium: 'border-l-accent-orange', low: 'border-l-accent-green' };
    const bgColors = {
      high: 'bg-red-600 text-white shadow-sm shadow-red-500/30',
      medium: 'bg-orange-500 text-white shadow-sm shadow-orange-500/30',
      low: 'bg-green-500 text-white shadow-sm shadow-green-500/30'
    };

    const html = `
    <div class="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-card hover:shadow-md transition-all border-l-4 ${borderColors[task.priority] || 'border-l-slate-400'} relative overflow-hidden mb-4" id="card-${task.id}">
        <!-- Main Row -->
        <div class="flex justify-between items-start mb-3 cursor-pointer" onclick="window.toggleExpand('${task.id}')">
            <div class="flex flex-col gap-1">
                <span class="text-xs uppercase font-bold text-slate-400 tracking-wider" 
                      contenteditable="true" onblur="window.updateCategory('${task.id}', this)" onclick="event.stopPropagation()">
                      ${task.category || 'General'}
                </span>
                <h3 class="text-lg font-bold text-slate-800 dark:text-white leading-snug ${isDone ? 'line-through opacity-50' : ''}"
                    contenteditable="true" onblur="window.updateTitle('${task.id}', this)" onclick="event.stopPropagation()">
                    ${escapeHtml(task.title)}
                </h3>
            </div>
            
            <button class="w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${isDone ? 'text-brand-500 bg-brand-50/10' : 'text-slate-300 hover:text-brand-500 hover:bg-slate-50 dark:hover:bg-slate-700'}"
                    onclick="event.stopPropagation(); window.toggleExpand('${task.id}')">
                 <span class="material-symbols-outlined text-[26px]">${isDone ? 'check_circle' : 'radio_button_unchecked'}</span>
            </button>
        </div>

        <!-- Meta Row -->
        <div class="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700/50">
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg ${bgColors[task.priority] || 'bg-slate-100 dark:bg-slate-800'}" onclick="window.cyclePriority(event, '${task.id}')">
                    <span class="material-symbols-outlined text-[16px] fill-1">flag</span>
                    <span class="text-xs font-bold uppercase tracking-wide">${task.priority}</span>
                </div>
                <!-- Visiblity Toggle -->
                <button onclick="window.toggleVisibility(event, '${task.id}')" class="text-slate-400 hover:text-brand-500 p-1">
                    <span class="material-symbols-outlined text-[20px]">${isHidden ? 'visibility_off' : 'visibility'}</span>
                </button>
                ${isHidden ? '<span class="text-xs text-slate-500 uppercase font-medium">Hidden</span>' : ''}
            </div>
            <div class="flex items-center gap-3">
                 <span class="text-sm font-bold ${isDone ? 'text-brand-500' : 'text-slate-500'}">${progress}%</span>
                 <button class="text-slate-400 hover:text-red-500 p-1" onclick="window.deleteTask(event, '${task.id}')">
                    <span class="material-symbols-outlined text-[22px]">delete</span>
                 </button>
            </div>
        </div>

        <!-- Expanded Content (Hidden by default) -->
        <div class="card-expanded mt-5 pt-4 border-t border-dashed border-slate-700" style="display:none;" id="expand-${task.id}">
             <!-- Edit Details Row -->
             <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="relative">
                    <label class="block text-[10px] uppercase text-slate-500 font-bold mb-1">Priority</label>
                    <select onchange="window.setPriority('${task.id}', this.value)" class="w-full bg-slate-800 text-xs text-white rounded p-1.5 border border-slate-700">
                        <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High (P0)</option>
                        <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium (P1)</option>
                        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low (P2)</option>
                    </select>
                </div>
                <div class="relative">
                    <label class="block text-[10px] uppercase text-slate-500 font-bold mb-1">Category</label>
                    <select onchange="window.updateCategory('${task.id}', this.value)" class="w-full bg-slate-800 text-xs text-white rounded p-1.5 border border-slate-700">
                        <option value="General" ${task.category === 'General' ? 'selected' : ''}>General</option>
                        <option value="CRM" ${task.category === 'CRM' ? 'selected' : ''}>CRM</option>
                        <option value="Automation" ${task.category === 'Automation' ? 'selected' : ''}>Automation</option>
                        <option value="Logistics" ${task.category === 'Logistics' ? 'selected' : ''}>Logistics</option>
                        <option value="Fieldwork" ${task.category === 'Fieldwork' ? 'selected' : ''}>Fieldwork</option>
                        <option value="Finance" ${task.category === 'Finance' ? 'selected' : ''}>Finance</option>
                        <option value="IT" ${task.category === 'IT' ? 'selected' : ''}>IT Support</option>
                        <option value="Incident" ${task.category === 'Incident' ? 'selected' : ''}>Incident</option>
                    </select>
                </div>
             </div>

             <!-- Progress Control -->
             <div class="flex items-center gap-2 mb-3">
                <input type="range" class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" min="0" max="100" value="${progress}"
                       oninput="this.nextElementSibling.innerText = this.value + '%'"
                       onchange="window.updateProgress('${task.id}', this.value)">
                <span class="text-xs w-8 text-right font-mono">${progress}%</span>
             </div>
             
             <!-- Log Input -->
             <div class="flex gap-2 mb-3">
                <input type="text" class="flex-1 bg-slate-800 border-none rounded text-xs p-2 text-white" placeholder="Add update..."
                       onkeydown="if(event.key === 'Enter') window.addLog('${task.id}', this)">
                <button class="bg-brand-600 text-white text-xs px-3 rounded" onclick="window.addLog('${task.id}', this.previousElementSibling)">Log</button>
             </div>

             <!-- Logs Feed -->
             <div class="flex flex-col gap-2 max-h-32 overflow-y-auto no-scrollbar">
                ${task.logs && task.logs.length > 0 ? task.logs.map(log => `
                   <div class="text-[11px] text-slate-400 border-l-2 border-slate-700 pl-2">
                      <div class="flex justify-between"><span class="text-slate-500">${log.date}</span></div>
                      <div class="text-slate-300">${escapeHtml(log.text)}</div>
                   </div>
                `).join('') : '<div class="text-center text-xs text-slate-600">No logs yet.</div>'}
             </div>
        </div>
    </div>
    `;
    list.insertAdjacentHTML('beforeend', html);
  });
};

// Override toggleExpand to work with Tailwind structure
window.toggleExpand = function (id) {
  const el = document.getElementById(`expand-${id}`);
  if (el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
};

// --- VIEW SWITCHING ---
window.switchView = function (view) {
  const dashboard = document.getElementById('view-dashboard');
  const todo = document.getElementById('view-todo');

  // Mobile Nav
  const navHome = document.getElementById('nav-home');
  const navTodo = document.getElementById('nav-todo');

  // Desktop Nav
  const sideHome = document.getElementById('side-nav-home');
  const sideTodo = document.getElementById('side-nav-todo');

  if (view === 'dashboard') {
    dashboard.classList.remove('hidden');
    todo.classList.add('hidden');

    // Mobile
    navHome.classList.add('text-brand-600', 'dark:text-brand-500');
    navHome.classList.remove('text-slate-400', 'dark:text-slate-500');
    navHome.querySelector('.material-symbols-outlined').classList.add('fill-1');

    navTodo.classList.remove('text-brand-600', 'dark:text-brand-500');
    navTodo.classList.add('text-slate-400', 'dark:text-slate-500');
    navTodo.querySelector('.material-symbols-outlined').classList.remove('fill-1');

    // Sidebar
    if (sideHome) {
      sideHome.classList.remove('text-slate-400', 'bg-transparent', 'border-transparent');
      sideHome.classList.add('text-white', 'bg-slate-800/50', 'border-slate-700/50', 'shadow-sm');
      sideHome.querySelector('.material-symbols-outlined').classList.add('text-brand-500', 'fill-1');

      sideTodo.classList.add('text-slate-400', 'bg-transparent', 'border-transparent');
      sideTodo.classList.remove('text-white', 'bg-slate-800/50', 'border-slate-700/50', 'shadow-sm');
      sideTodo.querySelector('.material-symbols-outlined').classList.remove('text-brand-500', 'fill-1');
    }

  } else {
    dashboard.classList.add('hidden');
    todo.classList.remove('hidden');

    // Mobile
    navTodo.classList.add('text-brand-600', 'dark:text-brand-500');
    navTodo.classList.remove('text-slate-400', 'dark:text-slate-500');
    navTodo.querySelector('.material-symbols-outlined').classList.add('fill-1');

    navHome.classList.remove('text-brand-600', 'dark:text-brand-500');
    navHome.classList.add('text-slate-400', 'dark:text-slate-500');
    navHome.querySelector('.material-symbols-outlined').classList.remove('fill-1');

    // Sidebar
    if (sideHome) {
      sideTodo.classList.remove('text-slate-400', 'bg-transparent', 'border-transparent');
      sideTodo.classList.add('text-white', 'bg-slate-800/50', 'border-slate-700/50', 'shadow-sm');
      sideTodo.querySelector('.material-symbols-outlined').classList.add('text-brand-500', 'fill-1');

      sideHome.classList.add('text-slate-400', 'bg-transparent', 'border-transparent');
      sideHome.classList.remove('text-white', 'bg-slate-800/50', 'border-slate-700/50', 'shadow-sm');
      sideHome.querySelector('.material-symbols-outlined').classList.remove('text-brand-500', 'fill-1');
    }

    window.renderTodos();
  }
};

// --- TO DO LIST LOGIC ---
let todos = []; // Separate from tasks

// Load Todos from LocalStorage (Simple persistence)
try {
  const saved = localStorage.getItem('simple_todos');
  if (saved) todos = JSON.parse(saved);
} catch (e) { console.log('No todos found'); }

window.saveTodos = function () {
  localStorage.setItem('simple_todos', JSON.stringify(todos));
  window.renderTodos();
};

window.addToDoItem = function () {
  const textInput = document.getElementById('todo-input-text');
  const dateInput = document.getElementById('todo-input-date');
  const text = textInput.value.trim();
  const date = dateInput.value;

  if (text) {
    todos.unshift({
      id: Date.now(),
      text: text,
      date: date || null, // Capture date
      done: false,
      createdAt: Date.now()
    });
    window.saveTodos();
    textInput.value = '';
    dateInput.value = ''; // Reset date
  }
};

window.renderTodos = function () {
  const container = document.getElementById('todo-list-container');
  const countEl = document.getElementById('todo-count');

  if (!container) return;

  // Filter valid dates if needed, or just show all
  const pending = todos.filter(t => !t.done).length;
  if (countEl) countEl.innerText = pending;

  container.innerHTML = '';

  if (todos.length === 0) {
    container.innerHTML = '<div class="text-center text-slate-500 py-10 text-sm">No tasks for today. Chill! 🌴</div>';
    return;
  }

  todos.forEach(t => {
    // Format Date
    let dateStr = '';
    if (t.date) {
      const d = new Date(t.date);
      // Format: "Today, 5:00 PM" or "Jan 12, 9:00 AM"
      const isToday = new Date().toDateString() === d.toDateString();
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      dateStr = isToday ? `Today, ${timeStr}` : `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${timeStr}`;
    }

    const html = `
        <div class="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-black/5 dark:ring-white/10 active:scale-[0.98] transition-all cursor-pointer ${t.done ? 'opacity-50' : ''}" onclick="window.toggleTodo(${t.id})">
            <div class="flex-shrink-0">
                <div class="w-6 h-6 rounded-full border-2 ${t.done ? 'border-brand-500 bg-brand-500' : 'border-slate-300 dark:border-slate-500'} flex items-center justify-center transition-colors">
                    ${t.done ? '<span class="material-symbols-outlined text-white text-sm">check</span>' : ''}
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-base font-semibold ${t.done ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'} truncate text-left">${escapeHtml(t.text)}</h4>
                ${dateStr ? `<div class="flex items-center gap-1 mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span class="material-symbols-outlined text-[14px]">event</span> ${dateStr}
                </div>` : ''}
            </div>
            <button onclick="window.deleteTodo(event, ${t.id})" class="text-slate-300 hover:text-red-500">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
        `;
    container.insertAdjacentHTML('beforeend', html);
  });
};

// INITIALIZATION
window.renderTodos(); // Ensure To-Do list loads immediately
// Also set default date input to today
try {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById('todo-input-date').value = now.toISOString().slice(0, 16);
} catch (e) { }

window.toggleTodo = function (id) {
  const t = todos.find(x => x.id == id);
  if (t) {
    t.done = !t.done;
    if (t.done) {
      const idx = todos.indexOf(t);
      todos.splice(idx, 1);
      todos.push(t);
    } else {
      const idx = todos.indexOf(t);
      todos.splice(idx, 1);
      todos.unshift(t);
    }
    window.saveTodos();
  }
};

window.deleteTodo = function (e, id) {
  e.stopPropagation();
  if (confirm('Remove this item?')) {
    todos = todos.filter(x => x.id != id);
    window.saveTodos();
  }
};

// --- PWA INSTALL LOGIC ---
let deferredPrompt;
const installModal = document.getElementById('pwa-install-app');

// Check if already installed (Standalone)
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

if (!isStandalone) {
  // Android / Chrome
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show after a short delay
    setTimeout(() => {
      if (installModal) {
        installModal.classList.remove('hidden');
        // Small animation delay
        setTimeout(() => installModal.classList.remove('translate-y-full'), 100);
      }
    }, 3000);
  });
}

window.installPwa = async function () {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
    window.dismissInstall();
  } else {
    // Fallback for iOS detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      const iosModal = document.getElementById('ios-install-modal');
      if (iosModal) {
        iosModal.classList.remove('hidden');
        iosModal.querySelector('div').classList.remove('translate-y-full');
      }
    }
  }
};

window.dismissInstall = function () {
  if (installModal) {
    installModal.classList.add('translate-y-full');
    setTimeout(() => installModal.classList.add('hidden'), 300);
  }
};






function getPriorityLabel(p) {
  if (p === 'high') return 'P0 HIGH';
  if (p === 'medium') return 'P1 MED';
  return 'P2 LOW';
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString();
}

// Start
window.init();
