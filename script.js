let activePhase = 0;
let activeCourse = "AW";

/**
 * Render phase tabs — the top navigation buttons for switching between phases
 */
function renderPhaseTabs() {
  document.getElementById("phaseTabs").innerHTML = phases
    .map(
      (p, i) =>
        `<button class="ptab${i === activePhase ? " active" : ""}" onclick="setPhase(${i})">${p.name}</button>`,
    )
    .join("");
}

/**
 * Render the phase banner — displays current phase info, goal, and daily schedule
 */
function renderPhaseBanner() {
  const p = phases[activePhase];
  const scheduleHTML = p.schedule
    .map(
      (s) =>
        `<div class="sched-item">
      <div class="day-label">${s.day}</div>
      <div class="day-task">${s.task}</div>
      <div class="day-hrs">${s.hrs}</div>
    </div>`,
    )
    .join("");
  document.getElementById("phaseBanner").innerHTML = `
    <div>
      <div class="phase-badge">${p.days}</div>
    </div>
    <div class="phase-text">
      <h3>${p.name}</h3>
      <p><strong style="color:${p.color}">${p.goal}</strong></p>
      <p style="margin-top:6px">${p.detail}</p>
      <div class="schedule-grid" style="margin-top:16px">${scheduleHTML}</div>
    </div>`;
}

/**
 * Render course tabs — buttons to switch between the 6 courses
 */
function renderCourseTabs() {
  document.getElementById("courseTabs").innerHTML = courses
    .map(
      (c) =>
        `<button class="ctab" onclick="setCourse('${c.code}')"
      style="${c.code === activeCourse ? `background:${c.color};border-color:${c.color};color:#fff;font-weight:500` : ""}"
    >${c.code}: ${c.name}</button>`,
    )
    .join("");
}

/**
 * Render progress bar — shows how far through the 5 phases we are
 */
function renderProgress() {
  const pct = Math.round(((activePhase + 1) / 5) * 100);
  document.getElementById("progressLabel").textContent =
    `${phases[activePhase].name} · ${phases[activePhase].days}`;
  document.getElementById("progressPct").textContent = pct + "%";
  document.getElementById("progressBar").style.width = pct + "%";
}

/**
 * Render the full course content — explanation, key concepts, examples, and Q&A
 */
function renderCourseContent() {
  const d = content[activeCourse];
  const course = courses.find((c) => c.code === activeCourse);

  // Render key points with term + definition
  const kpHTML = d.keypoints
    .map(
      (k) =>
        `<div class="kp-item"><div class="kp-bullet"></div><div><span class="kp-term">${k.term}</span> ${k.def}</div></div>`,
    )
    .join("");

  // Render resource links
  const resHTML = d.resources
    .map(
      (r) =>
        `<a class="res-btn" href="${r.url}" target="_blank" rel="noopener">${r.label}</a>`,
    )
    .join("");

  // Render Q&A items (collapsible)
  const qaHTML = d.qa
    .map(
      (item, i) =>
        `<div class="qa-item">
      <button class="qa-q" onclick="toggleQA(${i})">
        <span>${item.q}</span>
        <span class="qa-arrow" id="arr${i}">▶</span>
      </button>
      <div class="qa-a" id="ans${i}">${item.a}</div>
    </div>`,
    )
    .join("");

  // Assemble all content into two section cards
  document.getElementById("courseContent").innerHTML = `
    <div class="section-card">
      <h2 style="color:${course.color}">
        <span class="icon">${d.emoji}</span>
        ${d.title} — Plain English Explanation
      </h2>
      <div class="chip chip-red">Step 1: The simple explanation</div>
      <div class="plain-text">${d.plain}</div>
      <div class="analogy-box">${d.analogy}</div>
      <div class="divider"></div>
      <div class="chip chip-blue">Key concepts to master</div>
      <div class="kp-list">${kpHTML}</div>
      <div class="divider"></div>
      <div class="chip chip-amber">Worked example</div>
      <div class="example-box">
        <div class="ex-label">${d.example.label}</div>
        ${d.example.text.replace(/\n/g, "<br>")}
      </div>
      <div class="divider"></div>
      <div class="chip chip-green">Useful resources</div>
      <div class="resources">${resHTML}</div>
    </div>

    <div class="section-card">
      <h2>
        <span class="icon">🎯</span>
        Practice Q&amp;A — Step 2: Toggle to reveal answers
      </h2>
      <p style="font-size:13px;color:var(--muted);margin-bottom:16px">
        After reading the explanation above, try answering each question from memory — as if teaching a 12-year-old. Then click to reveal the full answer and check your gaps.
      </p>
      ${qaHTML}
    </div>`;
}

/**
 * Set the active phase and re-render all affected elements
 */
function setPhase(i) {
  activePhase = i;
  renderPhaseTabs();
  renderPhaseBanner();
  renderProgress();
}

/**
 * Set the active course and re-render course content
 */
function setCourse(c) {
  activeCourse = c;
  renderCourseTabs();
  renderCourseContent();
}

/**
 * Toggle a Q&A item open/closed
 */
function toggleQA(i) {
  const ans = document.getElementById("ans" + i);
  const arr = document.getElementById("arr" + i);
  const isOpen = ans.classList.toggle("open");
  arr.classList.toggle("open", isOpen);
}

/**
 * Initialize the entire page on load
 */
function init() {
  renderPhaseTabs();
  renderPhaseBanner();
  renderCourseTabs();
  renderProgress();
  renderCourseContent();
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}


/* ═══════════════════════════════════════════════════════════════
   AI TUTOR — Cloudflare Worker proxy integration
   ═══════════════════════════════════════════════════════════════
   Replace WORKER_URL with your deployed Cloudflare Worker URL.
   The API key never touches the browser — the Worker holds it.
   ═══════════════════════════════════════════════════════════════ */

const WORKER_URL = "https://study-proxy.vancybukama.workers.dev"; // ← CHANGE THIS

/**
 * Send the user's question to the Cloudflare Worker proxy,
 * which forwards it to Groq with the hidden API key.
 * Updates #aiResponse with the formatted answer.
 */
async function askAITutor() {
  const input    = document.getElementById("aiQuestion");
  const outputEl = document.getElementById("aiResponse");
  const btn      = document.getElementById("aiAskBtn");

  const question = input.value.trim();
  if (!question) {
    input.focus();
    return;
  }

  // ── Loading state ──
  btn.disabled     = true;
  btn.innerHTML    = `<span class="ai-spinner"></span> Thinking…`;
  outputEl.className = "ai-response-box loading";
  outputEl.innerHTML = `
    <div class="ai-loading-inner">
      <span class="ai-spinner large"></span>
      <span>Your tutor is thinking…</span>
    </div>`;

  try {
    const res = await fetch(WORKER_URL, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify({ question }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server error ${res.status}`);
    }

    const { answer } = await res.json();

    outputEl.className = "ai-response-box visible";
    outputEl.innerHTML = `
      <div class="ai-response-header">
        <span class="ai-response-icon">🎓</span>
        <span class="ai-response-label">Kopaline AI Tutor</span>
        <button class="ai-clear-btn" onclick="clearAITutor()" title="Clear">✕</button>
      </div>
      <div class="ai-response-body">${answer}</div>`;

  } catch (err) {
    outputEl.className = "ai-response-box error";
    outputEl.innerHTML = `
      <div class="ai-response-header">
        <span class="ai-response-icon">⚠</span>
        <span class="ai-response-label">Error</span>
      </div>
      <div class="ai-response-body">
        <p>${err.message}</p>
        <p style="margin-top:8px;font-size:12px;color:var(--muted)">
          Check your Worker URL is correct and the Worker is deployed.
        </p>
      </div>`;
  } finally {
    btn.disabled  = false;
    btn.innerHTML = "Ask →";
  }
}

/** Clear the AI response panel and reset the input */
function clearAITutor() {
  document.getElementById("aiQuestion").value  = "";
  document.getElementById("aiResponse").className = "ai-response-box";
  document.getElementById("aiResponse").innerHTML  = "";
}

// Allow Enter key to submit the question.
// Uses the same readyState guard as init() because DOMContentLoaded has
// already fired by the time a <script> at the bottom of <body> runs —
// a bare addEventListener("DOMContentLoaded", …) would never execute.
function attachEnterKey() {
  const input = document.getElementById("aiQuestion");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        askAITutor();
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attachEnterKey);
} else {
  attachEnterKey();
}
