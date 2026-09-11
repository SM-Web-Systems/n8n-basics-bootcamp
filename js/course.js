// ===== COURSE DATA =====
const MODULES = [
  { id: 1, dir: "module-1-basics", title: "n8n Basics & Core Concepts", subtitle: "Workflows, nodes, triggers, and how data flows", icon: "\ud83e\udde9", color: "#4f46e5", description: "What n8n is, why it exists, and the core vocabulary: triggers, action nodes, items, credentials, and executions.", duration: "30 min" },
  { id: 2, dir: "module-2-setup", title: "Setting Up n8n with Docker", subtitle: "Get a real instance running locally", icon: "\ud83d\udc33", color: "#4f46e5", description: "Step-by-step: docker-compose setup, first login, importing a workflow, activating it, and finding your webhook URL.", duration: "25 min" },
  { id: 3, dir: "module-3-workflow", title: "Building the Webhook Alert Demo", subtitle: "Webhook \u2192 transform \u2192 branch \u2192 alert", icon: "\ud83d\udd00", color: "#4f46e5", description: "A deep dive into the demo workflow's architecture: what happens at each node, and how n8n's own components fit together.", duration: "35 min" },
  { id: 4, dir: "module-4-practice", title: "Practice & Assessment", subtitle: "Extend the workflow and test your understanding", icon: "\ud83c\udfaf", color: "#4f46e5", description: "Hands-on extension exercises plus a quiz covering everything from the course.", duration: "40 min" },
];

// ===== UTILITY =====
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function showToast(msg, duration = 3000) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

function saveProgress(key, val) {
  try { localStorage.setItem('bc_' + key, JSON.stringify(val)); } catch(e) {}
}
function loadProgress(key, def) {
  try { const v = localStorage.getItem('bc_' + key); return v ? JSON.parse(v) : def; } catch(e) { return def; }
}

// ===== STREAK TRACKING =====
function recordActivity() {
  const today = new Date().toISOString().slice(0, 10);
  const lastDate = loadProgress('streak_last', null);
  let count = loadProgress('streak_count', 0);
  if (lastDate === today) return count;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (lastDate === yesterday) { count++; }
  else { count = 1; }
  saveProgress('streak_last', today);
  saveProgress('streak_count', count);
  return count;
}

function getStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const lastDate = loadProgress('streak_last', null);
  if (lastDate === today || lastDate === yesterday) return loadProgress('streak_count', 0);
  return 0;
}

// ===== MARKDOWN PARSER =====
async function renderMarkdown(path, targetEl) {
  targetEl.innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';
  try {
    const r = await fetch(path);
    if (!r.ok) throw new Error('Not found');
    const text = await r.text();
    targetEl.innerHTML = marked.parse(text);
    // Inject copy buttons into code blocks
    targetEl.querySelectorAll('pre').forEach(pre => {
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const code = pre.querySelector('code');
        const txt = code ? code.textContent : pre.textContent;
        try {
          await navigator.clipboard.writeText(txt);
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
        } catch (_) {}
      });
      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  } catch(e) {
    targetEl.innerHTML = `<p style="color:var(--text3)">Content not available: ${path}</p>`;
  }
}

// ===== QUIZ ENGINE =====
function parseQuiz(markdown) {
  const questions = [];
  const blocks = markdown.split(/^## Question \d+/m).slice(1);
  blocks.forEach(block => {
    const lines = block.trim().split('\n').filter(l => l.trim());
    const questionLines = [];
    const options = [];
    let hint = '';
    let correctIndex = -1;
    let inQuestion = true;
    lines.forEach(line => {
      const optMatch = line.match(/^- \[( |x)\] (.+)/);
      const hintMatch = line.match(/^\*\*Hint:\*\* (.+)/);
      if (optMatch) {
        inQuestion = false;
        if (optMatch[1] === 'x') correctIndex = options.length;
        options.push(optMatch[2].trim());
      } else if (hintMatch) {
        hint = hintMatch[1];
      } else if (inQuestion && line.trim()) {
        questionLines.push(line.trim());
      }
    });
    if (questionLines.length && options.length) {
      questions.push({ question: questionLines.join(' '), options, correctIndex, hint });
    }
  });
  return questions;
}

function initQuiz(container, questions, moduleId) {
  let current = 0, score = 0, answered = false;
  const savedScore = loadProgress(`quiz_${moduleId}`, null);

  function render() {
    if (current >= questions.length) return showResult();
    const q = questions[current];
    answered = false;
    container.innerHTML = `
      <div class="quiz-progress">
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${(current/questions.length)*100}%"></div></div>
        <span class="quiz-progress-text">${current + 1} / ${questions.length}</span>
      </div>
      <div class="quiz-card">
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <div class="quiz-option" data-idx="${i}">
              <span class="option-letter">${String.fromCharCode(65+i)}</span>
              <span>${opt}</span>
            </div>`).join('')}
        </div>
        <div class="quiz-hint" style="display:none"><span>Hint:</span> ${q.hint}</div>
      </div>
      <div class="quiz-nav">
        <span class="quiz-score">Score: ${score}/${current}</span>
        <div style="display:flex;gap:8px">
          <button class="btn btn-secondary" id="hint-btn" style="font-size:0.85rem;padding:8px 16px">Show Hint</button>
          <button class="btn btn-primary" id="next-btn" disabled>Next →</button>
        </div>
      </div>`;

    $$('.quiz-option', container).forEach(opt => {
      opt.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const idx = parseInt(opt.dataset.idx);
        $$('.quiz-option', container).forEach((o, i) => {
          if (i === q.correctIndex) o.classList.add('correct');
          else if (i === idx) o.classList.add('wrong');
        });
        if (idx === q.correctIndex) score++;
        $('#next-btn', container).disabled = false;
        saveProgress(`quiz_${moduleId}`, { score, total: questions.length });
      });
    });
    $('#hint-btn', container).addEventListener('click', () => {
      const h = $('.quiz-hint', container);
      h.style.display = h.style.display === 'none' ? 'block' : 'none';
    });
    $('#next-btn', container).addEventListener('click', () => { current++; render(); });
  }

  function showResult() {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 80 ? '🎉 Excellent work!' : pct >= 60 ? '👍 Good effort!' : '📚 Keep studying!';
    container.innerHTML = `
      <div class="quiz-result">
        <div class="result-score">${pct}%</div>
        <div class="result-label">${score} / ${questions.length} correct — ${msg}</div>
        <div class="result-bar-wrap"><div class="result-bar" style="width:0%" id="rbar"></div></div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="location.reload()">Retake Quiz</button>
        </div>
      </div>`;
    setTimeout(() => { const b = document.getElementById('rbar'); if(b) b.style.width = pct + '%'; }, 100);
    saveProgress(`quiz_${moduleId}`, { score, total: questions.length, completed: true });
  }

  render();
}

// ===== FLASHCARD ENGINE =====
function parseFlashcards(markdown) {
  const cards = [];
  const blocks = markdown.split(/^## Card \d+/m).slice(1);
  blocks.forEach(block => {
    const qMatch = block.match(/\*\*Q:\*\* (.+?)(?=\n\n\*\*A:\*\*|\n\*\*A:\*\*)/s);
    const aMatch = block.match(/\*\*A:\*\* (.+?)(?=\n---|\n## |$)/s);
    if (qMatch && aMatch) {
      cards.push({ q: qMatch[1].trim(), a: aMatch[1].trim() });
    }
  });
  return cards;
}

function initFlashcards(container, cards, moduleId) {
  let current = 0, flipped = false;
  let seen = new Set(loadProgress(`fc_seen_${moduleId}`, []));

  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
  let deck = [...cards];

  function render() {
    const card = deck[current];
    flipped = false;
    container.innerHTML = `
      <div class="fc-controls">
        <span class="fc-progress">Card ${current + 1} of ${deck.length} • ${seen.size} mastered</span>
        <div style="display:flex;gap:8px">
          <button class="btn btn-secondary" id="shuffle-btn" style="font-size:0.8rem;padding:6px 14px">🔀 Shuffle</button>
          <button class="btn btn-secondary" id="reset-btn" style="font-size:0.8rem;padding:6px 14px">↺ Reset</button>
        </div>
      </div>
      <div class="fc-scene" id="fc-scene">
        <div class="fc-card" id="fc-card">
          <div class="fc-face fc-front">
            <div class="fc-label">Question</div>
            <div class="fc-text">${card.q}</div>
            <div class="fc-hint">Click to reveal answer</div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-label">Answer</div>
            <div class="fc-text">${card.a}</div>
          </div>
        </div>
      </div>
      <div class="fc-nav">
        <button class="btn btn-secondary" id="prev-btn" ${current === 0 ? 'disabled' : ''}>← Prev</button>
        <span class="fc-counter">${current + 1} / ${deck.length}</span>
        <button class="btn btn-secondary" id="next-btn" ${current >= deck.length-1 ? 'disabled' : ''}>Next →</button>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:16px">
        <button class="btn btn-secondary" id="mastered-btn" style="font-size:0.8rem;padding:8px 16px;color:var(--green)">✓ Mark Mastered</button>
      </div>`;

    $('#fc-scene', container).addEventListener('click', () => {
      flipped = !flipped;
      $('#fc-card', container).classList.toggle('flipped', flipped);
    });
    $('#prev-btn', container).addEventListener('click', () => { if(current > 0) { current--; render(); } });
    $('#next-btn', container).addEventListener('click', () => { if(current < deck.length-1) { current++; render(); } });
    $('#shuffle-btn', container).addEventListener('click', () => { deck = shuffle(deck); current = 0; render(); showToast('Cards shuffled!'); });
    $('#reset-btn', container).addEventListener('click', () => { seen.clear(); saveProgress(`fc_seen_${moduleId}`, []); current = 0; render(); showToast('Progress reset'); });
    $('#mastered-btn', container).addEventListener('click', () => {
      seen.add(current);
      saveProgress(`fc_seen_${moduleId}`, [...seen]);
      if (current < deck.length - 1) { current++; render(); }
      showToast('Marked as mastered! ✓');
    });
  }
  render();
}

// ===== SM-2 SPACED REPETITION FLASHCARDS =====
function initSM2Flashcards(container, cards, moduleId) {
  const SM2_KEY = `sm2_${moduleId}`;

  function loadState() {
    const saved = loadProgress(SM2_KEY, null);
    if (saved && saved.length === cards.length) return saved;
    return cards.map(() => ({ interval: 0, ef: 2.5, reps: 0, due: 0 }));
  }
  function saveState(st) { saveProgress(SM2_KEY, st); }

  function sm2Grade(s, grade) {
    let { interval, ef, reps } = s;
    if (grade < 2) {
      reps = 0; interval = 1;
      ef = Math.max(1.3, ef - (grade === 0 ? 0.2 : 0.1));
    } else {
      if (reps === 0) interval = 1;
      else if (reps === 1) interval = 6;
      else interval = Math.round(interval * ef);
      reps++;
      if (grade === 3) ef = Math.min(3.0, ef + 0.1);
    }
    return { interval, ef, reps, due: Date.now() + interval * 86400000 };
  }

  let state = loadState();
  let pos = 0, flipped = false;

  function buildDeck() {
    const now = Date.now();
    const indexed = cards.map((c, i) => ({ card: c, st: state[i], i }));
    const due = indexed.filter(x => x.st.due <= now).sort((a, b) => a.st.due - b.st.due);
    const future = indexed.filter(x => x.st.due > now).sort((a, b) => a.st.due - b.st.due);
    return [...due, ...future];
  }
  let deck = buildDeck();

  function nextIntervalLabel(s, grade) {
    const tmp = sm2Grade(s, grade);
    return tmp.interval + (tmp.interval === 1 ? 'd' : 'd');
  }

  function render() {
    if (!deck.length) {
      container.innerHTML = '<p style="color:var(--text2);padding:40px;text-align:center">No flashcards.</p>';
      return;
    }
    const { card, st } = deck[pos];
    flipped = false;
    const dueNow = deck.filter(x => x.st.due <= Date.now()).length;

    container.innerHTML = `
      <div class="fc-controls">
        <span class="fc-progress">Card ${pos + 1} / ${deck.length} &bull; <span style="color:var(--yellow)">${dueNow} due</span></span>
        <div style="display:flex;gap:8px">
          <button class="btn btn-secondary" id="sm2-shuffle" style="font-size:0.8rem;padding:6px 14px">🔀 Shuffle</button>
          <button class="btn btn-secondary" id="sm2-reset" style="font-size:0.8rem;padding:6px 14px">↺ Reset</button>
        </div>
      </div>
      <div class="fc-scene" id="fc-scene">
        <div class="fc-card" id="fc-card">
          <div class="fc-face fc-front">
            <div class="fc-label">${st.reps > 0 ? `Interval: ${st.interval}d` : 'New card'}</div>
            <div class="fc-text">${card.q}</div>
            <div class="fc-hint">Click to reveal answer</div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-label">Answer</div>
            <div class="fc-text">${card.a}</div>
          </div>
        </div>
      </div>
      <div class="sm2-buttons" id="sm2-rating" style="display:none">
        <button class="sm2-btn sm2-btn-again" data-grade="0">Again<small>&lt;1d</small></button>
        <button class="sm2-btn sm2-btn-hard"  data-grade="1">Hard<small>${nextIntervalLabel(st,1)}</small></button>
        <button class="sm2-btn sm2-btn-good"  data-grade="2">Good<small>${nextIntervalLabel(st,2)}</small></button>
        <button class="sm2-btn sm2-btn-easy"  data-grade="3">Easy<small>${nextIntervalLabel(st,3)}</small></button>
      </div>
      <div class="sm2-info" id="sm2-info">Flip the card, then rate your recall</div>
      <div class="fc-nav" style="margin-top:12px">
        <button class="btn btn-secondary" id="prev-btn" ${pos === 0 ? 'disabled' : ''}>← Prev</button>
        <span class="fc-counter">${pos + 1} / ${deck.length}</span>
        <button class="btn btn-secondary" id="next-btn" ${pos >= deck.length - 1 ? 'disabled' : ''}>Next →</button>
      </div>`;

    $('#fc-scene', container).addEventListener('click', () => {
      flipped = !flipped;
      $('#fc-card', container).classList.toggle('flipped', flipped);
      if (flipped) {
        $('#sm2-rating', container).style.display = 'flex';
        $('#sm2-info', container).textContent = 'Rate your recall — schedules the next review';
      }
    });

    $$('.sm2-btn', container).forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const grade = parseInt(btn.dataset.grade);
        const { i, st: cardSt } = deck[pos];
        state[i] = sm2Grade(cardSt, grade);
        saveState(state);
        deck = buildDeck();
        if (pos >= deck.length) pos = Math.max(0, deck.length - 1);
        const labels = ['Again 🔴', 'Hard 🟡', 'Good 🔵', 'Easy 🟢'];
        showToast(`${labels[grade]} — next in ${state[i].interval} day${state[i].interval === 1 ? '' : 's'}`);
        render();
      });
    });

    $('#prev-btn', container).addEventListener('click', () => { if (pos > 0) { pos--; render(); } });
    $('#next-btn', container).addEventListener('click', () => { if (pos < deck.length - 1) { pos++; render(); } });
    $('#sm2-shuffle', container).addEventListener('click', () => {
      deck = buildDeck().sort(() => Math.random() - 0.5);
      pos = 0; render(); showToast('Cards shuffled!');
    });
    $('#sm2-reset', container).addEventListener('click', () => {
      state = cards.map(() => ({ interval: 0, ef: 2.5, reps: 0, due: 0 }));
      saveState(state); deck = buildDeck(); pos = 0; render(); showToast('SM-2 progress reset');
    });
  }
  render();
}

// ===== MIND MAP =====
async function initMindMap(container, path) {
  const svg = container.querySelector('#mindmap-svg');
  if (!svg) return;

  try {
    const r = await fetch(path);
    if (!r.ok) throw new Error('Not found');
    const data = await r.json();
    renderMindMap(svg, data);
  } catch(e) {
    svg.innerHTML = `<text x="50%" y="50%" text-anchor="middle" fill="var(--text3)">Mind map not available</text>`;
  }
}

function renderMindMap(svgEl, data) {
  const W = svgEl.clientWidth || 900, H = 580;
  const margin = { top: 20, right: 120, bottom: 20, left: 120 };
  const iW = W - margin.left - margin.right;
  const iH = H - margin.top - margin.bottom;

  // Use D3 tree layout
  const hierarchy = d3.hierarchy(data);
  const treeLayout = d3.tree().size([iH, iW]);
  const root = treeLayout(hierarchy);

  const svg = d3.select(svgEl);
  svg.selectAll('*').remove();
  svg.attr('viewBox', `0 0 ${W} ${H}`);

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Zoom
  const zoom = d3.zoom().scaleExtent([0.3, 2]).on('zoom', e => g.attr('transform', e.transform));
  svg.call(zoom).call(zoom.transform, d3.zoomIdentity.translate(margin.left, margin.top));

  // Links
  g.selectAll('.link').data(root.links()).enter()
    .append('path').attr('class', 'link')
    .attr('d', d3.linkHorizontal().x(d => d.y).y(d => d.x));

  // Nodes
  const node = g.selectAll('.node').data(root.descendants()).enter()
    .append('g').attr('class', d => 'node' + (d.depth === 0 ? ' root' : ''))
    .attr('transform', d => `translate(${d.y},${d.x})`);

  node.append('circle').attr('r', d => d.depth === 0 ? 8 : d.depth === 1 ? 6 : 4)
    .attr('fill', d => {
      if (d.depth === 0) return 'var(--accent)';
      if (d.depth === 1) return 'var(--bg4)';
      return 'var(--bg3)';
    })
    .attr('stroke', d => {
      if (d.depth === 0) return 'var(--accent2)';
      if (d.depth === 1) return 'var(--cyan)';
      return 'var(--border)';
    })
    .attr('stroke-width', 2);

  node.append('text')
    .attr('dy', '0.31em')
    .attr('x', d => d.children ? -10 : 10)
    .attr('text-anchor', d => d.children ? 'end' : 'start')
    .attr('fill', d => d.depth === 0 ? 'var(--text)' : d.depth === 1 ? 'var(--accent)' : 'var(--text2)')
    .attr('font-size', d => d.depth === 0 ? 14 : d.depth === 1 ? 12 : 11)
    .attr('font-weight', d => d.depth <= 1 ? 700 : 400)
    .text(d => d.data.name.length > 30 ? d.data.name.slice(0, 28) + '…' : d.data.name);
}

// ===== INFOGRAPHIC ZOOM =====
function initInfographic(container) {
  let scale = 1;
  const img = container.querySelector('.infographic-img-wrap img');
  if (!img) return;
  container.querySelector('#zoom-in').addEventListener('click', () => { scale = Math.min(3, scale + 0.25); img.style.transform = `scale(${scale})`; updateZoom(); });
  container.querySelector('#zoom-out').addEventListener('click', () => { scale = Math.max(0.5, scale - 0.25); img.style.transform = `scale(${scale})`; updateZoom(); });
  container.querySelector('#zoom-reset').addEventListener('click', () => { scale = 1; img.style.transform = 'scale(1)'; updateZoom(); });
  function updateZoom() { container.querySelector('#zoom-label').textContent = Math.round(scale * 100) + '%'; }
}

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
  const modal = document.createElement('div');
  modal.id = 'shortcut-modal';
  modal.className = 'shortcut-modal';
  modal.innerHTML = `
    <div class="shortcut-box">
      <h3>⌨️ Keyboard Shortcuts</h3>
      <div class="shortcut-row"><span>Show/hide this help</span><kbd class="shortcut-key">?</kbd></div>
      <div class="shortcut-row"><span>Next card / question</span><kbd class="shortcut-key">→</kbd></div>
      <div class="shortcut-row"><span>Previous card</span><kbd class="shortcut-key">←</kbd></div>
      <div class="shortcut-row"><span>Flip flashcard</span><kbd class="shortcut-key">Space</kbd></div>
      <div class="shortcut-row"><span>Rate: Again</span><kbd class="shortcut-key">1</kbd></div>
      <div class="shortcut-row"><span>Rate: Hard</span><kbd class="shortcut-key">2</kbd></div>
      <div class="shortcut-row"><span>Rate: Good</span><kbd class="shortcut-key">3</kbd></div>
      <div class="shortcut-row"><span>Rate: Easy</span><kbd class="shortcut-key">4</kbd></div>
      <div class="shortcut-row"><span>Close / dismiss</span><kbd class="shortcut-key">Esc</kbd></div>
      <div style="margin-top:20px;text-align:center">
        <button class="btn btn-secondary" onclick="document.getElementById('shortcut-modal').classList.remove('open')" style="font-size:0.85rem;padding:8px 20px">Close</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === '?') { modal.classList.toggle('open'); return; }
    if (e.key === 'Escape') { modal.classList.remove('open'); return; }
    if (e.key === ' ') {
      e.preventDefault();
      const scene = document.getElementById('fc-scene');
      if (scene) scene.click();
      return;
    }
    if (e.key === 'ArrowRight') {
      const btn = document.getElementById('next-btn');
      if (btn && !btn.disabled) { btn.click(); }
      return;
    }
    if (e.key === 'ArrowLeft') {
      const btn = document.getElementById('prev-btn');
      if (btn && !btn.disabled) { btn.click(); }
      return;
    }
    if (['1','2','3','4'].includes(e.key)) {
      const rating = document.getElementById('sm2-rating');
      if (rating && rating.style.display !== 'none') {
        const grade = parseInt(e.key) - 1;
        const btn = rating.querySelector(`[data-grade="${grade}"]`);
        if (btn) btn.click();
      }
    }
  });
}

// ===== NOTES PANEL =====
function initNotes(container, moduleId) {
  const key = `notes_${moduleId}`;
  const saved = loadProgress(key, '');
  let saveTimer = null;
  container.innerHTML = `
    <div class="notes-container">
      <div class="notes-header">
        <h3>📝 My Notes — Module ${moduleId}</h3>
        <span class="notes-status" id="notes-status">Saved</span>
      </div>
      <textarea class="notes-textarea" id="notes-area" placeholder="Take notes as you study... These are saved automatically in your browser.">${saved}</textarea>
      <div class="notes-hint">Notes are saved locally in your browser and persist between visits. They won't sync between devices.</div>
    </div>`;
  document.getElementById('notes-area').addEventListener('input', e => {
    document.getElementById('notes-status').textContent = 'Saving...';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveProgress(key, e.target.value);
      document.getElementById('notes-status').textContent = 'Saved ✓';
    }, 800);
  });
}

// ===== PREREQUISITE CHECK =====
function checkPrerequisites(moduleId) {
  if (moduleId <= 1) return;
  const prevQuiz = loadProgress(`quiz_${moduleId - 1}`, null);
  if (!prevQuiz) {
    const banner = document.getElementById('prereq-banner');
    if (banner) {
      banner.style.display = 'flex';
      banner.innerHTML = `⚠️ Recommended: complete the <a href="module.html?id=${moduleId - 1}">Module ${moduleId - 1}</a> quiz before starting this module.`;
    }
  }
}

// ===== VIBECODING CHALLENGES =====
const CHALLENGES = {};

async function verifyChallenge(type, input) {
  input = input.trim();
  if (!input) return { ok: false, msg: 'Please enter a value.' };
  const HORIZON = 'https://horizon-testnet.stellar.org';
  try {
    if (type === 'account') {
      if (input.length !== 56 || !input.startsWith('G'))
        return { ok: false, msg: 'Invalid public key — must start with G and be 56 characters.' };
      const r = await fetch(`${HORIZON}/accounts/${input}`);
      if (!r.ok) return { ok: false, msg: 'Account not found on Stellar testnet. Did you fund it with Friendbot?' };
      const data = await r.json();
      const xlm = data.balances?.find(b => b.asset_type === 'native');
      return { ok: true, msg: `✅ Account verified! Balance: ${parseFloat(xlm?.balance || 0).toFixed(2)} XLM on testnet.` };
    }
    if (type === 'tx') {
      if (input.length !== 64) return { ok: false, msg: 'Invalid transaction hash — must be exactly 64 hex characters.' };
      const r = await fetch(`${HORIZON}/transactions/${input}`);
      if (!r.ok) return { ok: false, msg: 'Transaction not found on Stellar testnet.' };
      const data = await r.json();
      return { ok: true, msg: `✅ Transaction verified! Ledger: ${data.ledger}. Time: ${new Date(data.created_at).toLocaleString()}` };
    }
    if (type === 'contract') {
      if (!input.startsWith('C') || input.length < 50)
        return { ok: false, msg: 'Invalid contract ID — Soroban contract IDs start with C.' };
      return { ok: true, msg: `✅ Contract ID format looks correct! Great work deploying your first Soroban contract.` };
    }
    if (type === 'url') {
      if (!input.startsWith('http')) return { ok: false, msg: 'Please enter a valid URL starting with https://' };
      return { ok: true, msg: `✅ Deployment URL recorded! Your app is live at: ${input}` };
    }
    return { ok: false, msg: 'Unknown verification type.' };
  } catch (e) {
    return { ok: false, msg: `Verification error: ${e.message}` };
  }
}

function initChallenge(container, moduleId) {
  const ch = CHALLENGES[moduleId];
  if (!ch) {
    container.innerHTML = '<p style="color:var(--text2);padding:40px">No challenge for this module.</p>';
    return;
  }
  const completedKey = `challenge_${moduleId}`;
  const completed = loadProgress(completedKey, null);

  container.innerHTML = `
    <div class="challenge-container">
      <div class="challenge-card">
        <div class="challenge-header">
          <div class="challenge-icon-lg">${ch.icon}</div>
          <div>
            <div class="challenge-title">${ch.title}</div>
            ${completed ? '<span class="challenge-completed-badge">✓ Completed</span>' : ''}
          </div>
        </div>
        <div class="challenge-desc">${ch.desc}</div>
        <div class="challenge-prompt"><strong>Vibecoding prompt to try:</strong><br>${ch.prompt}</div>
        <div class="challenge-input-wrap">
          <input class="challenge-input" id="challenge-input" type="text"
            placeholder="${ch.type === 'account' ? 'G... (56-char public key)' : ch.type === 'tx' ? 'Transaction hash (64 chars)' : ch.type === 'contract' ? 'C... (contract ID)' : 'https://...'}"
            value="${completed ? completed.input : ''}">
          <button class="btn btn-primary" id="challenge-verify-btn">Verify ✓</button>
        </div>
        <div class="challenge-status ${completed ? 'success' : ''}" id="challenge-status">${completed ? completed.msg : ''}</div>
        <div style="margin-top:12px;font-size:0.8rem;color:var(--text3)">💡 Hint: ${ch.hint}</div>
      </div>
    </div>`;

  document.getElementById('challenge-verify-btn').addEventListener('click', async () => {
    const input = document.getElementById('challenge-input').value;
    const btn = document.getElementById('challenge-verify-btn');
    const status = document.getElementById('challenge-status');
    btn.disabled = true; btn.textContent = 'Verifying...';
    status.className = 'challenge-status'; status.textContent = '';
    const result = await verifyChallenge(ch.type, input);
    status.textContent = result.msg;
    status.className = 'challenge-status ' + (result.ok ? 'success' : 'error');
    if (result.ok) {
      saveProgress(completedKey, { input, msg: result.msg, completedAt: new Date().toISOString() });
      showToast('Challenge completed! 🎉');
      recordActivity();
    }
    btn.disabled = false; btn.textContent = 'Verify ✓';
  });
}

// ===== PWA SERVICE WORKER =====
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

// ===== TABS =====
function initTabs(panelData) {
  const tabs = $$('.tab');
  const panels = $$('.panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + target);
      if (panel) {
        panel.classList.add('active');
        if (panelData[target] && !panelData[target].loaded) {
          panelData[target].load();
          panelData[target].loaded = true;
        }
      }
    });
  });
}
