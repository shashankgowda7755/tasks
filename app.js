
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
  { t: "Design unified operating system", p: "high", c: "Core Architecture", d: addDays(2) },
  { t: "Define system architecture layers", p: "high", c: "Core Architecture", d: addDays(2) },
  { t: "Audit Cold Outreach Strategy (Meta Policy compliant)", p: "high", c: "Governance", d: addDays(2) }
];

// STATE
let tasks = [];
let currentFilter = 'all';

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
      console.error('Cloud Load Error', e);
      alert('Connection Error: Working offline. Data will stick to this device only.');
    }
  }

  // LOCAL FALLBACK
  if (!loadedFromCloud) {
    const stored = localStorage.getItem('antigravity_tasks_v2');
    if (stored) {
      tasks = JSON.parse(stored);
      tasks.forEach(migrateData);
    } else {
      // Seed
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
        createdAt: Date.now()
      }));
      window.save();
    }
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
  const title = input.value.trim();
  if (!title) return;

  tasks.unshift({
    id: Date.now().toString(),
    title,
    priority: 'high',
    category: 'General',
    dueDate: new Date().toISOString().split('T')[0],
    progress: 0,
    logs: [],
    notes: ''
  });
  window.save();
  input.value = '';
  window.render();
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

window.cyclePriority = function (e, id) {
  e.stopPropagation();
  const task = tasks.find(t => t.id === id);
  if (task) {
    if (task.priority === 'high') task.priority = 'medium';
    else if (task.priority === 'medium') task.priority = 'low';
    else task.priority = 'high';
    window.save();
    window.render();
  }
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
  let filtered = tasks;
  if (currentFilter === 'high') filtered = tasks.filter(t => t.priority === 'high');
  else if (currentFilter === 'crm') filtered = tasks.filter(t => t.category === 'CRM');
  else if (currentFilter === 'automation') filtered = tasks.filter(t => t.category === 'Automation');

  const list = document.getElementById('task-list');
  list.innerHTML = '';

  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center; color:#64748b; padding:20px;">No tasks found.</div>`;
    return;
  }

  filtered.forEach(task => {
    const progress = task.progress || 0;
    const isDone = progress === 100;

    const r = 18; const c = 2 * Math.PI * r; const offset = c - (progress / 100) * c;
    const ringColor = isDone ? 'var(--success)' : 'var(--primary)';

    // LOGS HTML GENERATION
    // Ensure logs array exists
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

    const html = `
      <div class="task-card" id="card-${task.id}">
        <div class="card-main" onclick="window.toggleExpand('${task.id}')">
          <div class="status-ring">
            <svg class="ring-svg" viewBox="0 0 40 40">
               <circle class="ring-bg" cx="20" cy="20" r="${r}" stroke-width="3" fill="none"></circle>
               <circle class="ring-fg" cx="20" cy="20" r="${r}" stroke-width="3" fill="none"
                       style="stroke-dasharray: ${c}; stroke-dashoffset: ${offset}; stroke: ${ringColor}"></circle>
            </svg>
            <span class="percent-text" style="color:${isDone ? 'var(--success)' : '#94a3b8'}">${progress}%</span>
          </div>
          <div class="card-info">
             <div class="card-title ${isDone ? 'done' : ''}">
                <span contenteditable="true" 
                      onblur="window.updateTitle('${task.id}', this)"
                      onclick="event.stopPropagation()"
                      style="cursor:text; outline:none; border-bottom:1px dashed #475569;">${escapeHtml(task.title)}</span>
                <span class="tag">${task.category || 'Gen'}</span>
             </div>
             <div class="card-meta">
               <span class="priority-badge p-${task.priority}" 
                     onclick="window.cyclePriority(event, '${task.id}')"
                     title="Click Priority">
                     ${getPriorityLabel(task.priority)}
               </span>
               <span class="date-meta">Captured: ${formatDate(task.createdAt || Date.now())}</span>
             </div>
          </div>
          <button class="delete-icon-btn" onclick="window.deleteTask(event, '${task.id}')">${ICONS.trash}</button>
        </div>
        
        <div class="card-expanded">
           <div class="control-row">
              <label style="color:#94a3b8; font-size:0.8rem; margin-bottom:4px; display:block;">Progress: ${progress}%</label>
              <input type="range" min="0" max="100" value="${progress}" 
                     oninput="document.getElementById('val-${task.id}').textContent = this.value + '%'"
                     onchange="window.updateProgress('${task.id}', this.value)">
              <span id="val-${task.id}" style="display:none">${progress}%</span>
           </div>
           
           <div class="actions-grid">
              <button class="action-chip" onclick="window.addProgress('${task.id}', 10)">+10%</button>
              <button class="action-chip" onclick="window.addProgress('${task.id}', 25)">+25%</button>
              <button class="action-chip done-btn" onclick="window.updateProgress('${task.id}', 100)">Mark Complete</button>
           </div>
           
           <div class="log-group">
             <textarea class="log-input" placeholder="Type a new update... (Supports multiple paragraphs)"
                       onkeydown="if(event.key === 'Enter' && (event.metaKey || event.ctrlKey)) window.addLog('${task.id}', this)"></textarea>
             <div class="log-submit-row">
                <button class="log-btn" onclick="window.submitLog(event, '${task.id}')">Add Update</button>
             </div>
           </div>
           
           <div class="log-feed">
              ${logsHtml}
           </div>
        </div>
      </div>
      `;
    list.insertAdjacentHTML('beforeend', html);
  });
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
