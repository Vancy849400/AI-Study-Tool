/* ═══════════════════════════════════════════════════════════
   EXISTING STUDY PLAN LOGIC (unchanged)
   ═══════════════════════════════════════════════════════════ */

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


/* ═══════════════════════════════════════════════════════════
   AI STUDY TOOLS — New Section Below
   ═══════════════════════════════════════════════════════════

   SECURITY MODEL:
   - API key is held in a plain JS variable (in-memory only).
   - It is never written to localStorage, sessionStorage, or cookies.
   - All requests go directly from your browser to api.anthropic.com
     over HTTPS. No third-party sees the key.
   - For production / shared deployments, replace callAnthropicAPI()
     with a call to your own backend proxy endpoint so the key
     stays server-side entirely.
   ═══════════════════════════════════════════════════════════ */

/** In-memory store for the API key — never persisted anywhere */
let _apiKey = "";

/** Active AI tool tab index */
let activeAITab = 0;

/* ── API Key Management ── */

function saveApiKey() {
  const raw = document.getElementById("apiKeyInput").value.trim();
  const status = document.getElementById("keyStatus");

  if (!raw.startsWith("gsk_")) {
    status.textContent = "⚠ Groq keys start with gsk_";
    status.className = "key-status error";
    return;
  }

  _apiKey = raw;
  document.getElementById("apiKeyInput").value = ""; // clear field immediately
  status.textContent = "✓ Connected";
  status.className = "key-status ok";
}

/* ── Core API Utility ── */

/**
 * Sends a request to the Groq API (OpenAI-compatible).
 * @param {string} systemPrompt  - The system instruction for the AI
 * @param {string} userMessage   - The user message / prompt
 * @param {number} maxTokens     - Max tokens in the response (default 1200)
 * @returns {Promise<string>}    - The text content of the AI response
 */
async function callAnthropicAPI(systemPrompt, userMessage, maxTokens = 1200) {
  if (!_apiKey) {
    throw new Error("No API key — please enter your Groq API key above and click Connect.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${_apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userMessage  },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/* ── AI Tool Tab Switching ── */

function setAITab(i) {
  activeAITab = i;
  document.querySelectorAll(".ai-tool-panel").forEach((p, idx) => {
    p.classList.toggle("hidden", idx !== i);
  });
  document.querySelectorAll(".atab").forEach((t, idx) => {
    t.classList.toggle("active", idx === i);
  });
}

/* ── Helper: Loading / Error / Clear ── */

function setLoading(outputId, btnId, isLoading, label = "Running…") {
  const btn = document.getElementById(btnId);
  if (isLoading) {
    btn.disabled = true;
    btn.innerHTML = `<span class="ai-spinner"></span> ${label}`;
  } else {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.label || btn.innerHTML;
  }
}

function showError(outputId, message) {
  document.getElementById(outputId).innerHTML = `
    <div class="ai-error">⚠ ${message}</div>`;
}

/* ══════════════════════════════════════════════
   TOOL 1 — AI TUTOR
   Takes a topic → returns Core Concept, Analogy, Active Recall Qs
   ══════════════════════════════════════════════ */

async function runTutor() {
  const topic = document.getElementById("tutorInput").value.trim();
  if (!topic) return;

  const outputEl = document.getElementById("tutorOutput");
  const btn = document.getElementById("tutorBtn");

  // Store original label
  btn.dataset.label = "<span>Explain</span> →";
  btn.disabled = true;
  btn.innerHTML = `<span class="ai-spinner"></span> Thinking…`;
  outputEl.innerHTML = "";

  const systemPrompt = `You are an Expert Exam Tutor helping a BSc Accounting & Finance student master their curriculum in 31 days.

When the user submits a topic, you MUST respond with EXACTLY this HTML structure — no preamble, no markdown, just the HTML below:

<div class="tutor-result">
  <div class="tutor-block core">
    <h3>📚 Core Concept</h3>
    <p>[Exactly 3 clear, exam-focused sentences explaining the topic. Use plain language a smart 16-year-old could follow.]</p>
  </div>
  <div class="tutor-block analogy">
    <h3>💡 Memory Analogy</h3>
    <p>[One vivid, memorable real-world analogy that makes the concept stick. Start with "Think of it like…"]</p>
  </div>
  <div class="tutor-block recall">
    <h3>🎯 Active Recall Questions</h3>
    <ul>
      <li>[Question 1 — exam-style, requires understanding not just recall]</li>
      <li>[Question 2 — application or calculation question]</li>
    </ul>
  </div>
  <div class="tutor-block tip">
    <h3>⚡ Exam Tip</h3>
    <p>[One specific, actionable tip for scoring marks on this topic in an exam. Be concrete.]</p>
  </div>
</div>

Tone: Encouraging, concise, expert. Replace all bracketed placeholders with real content.`;

  try {
    const html = await callAnthropicAPI(systemPrompt, `Topic: ${topic}`);
    outputEl.innerHTML = html;
  } catch (e) {
    showError("tutorOutput", e.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = "<span>Explain</span> →";
  }
}

/* ══════════════════════════════════════════════
   TOOL 2 — FLASHCARD EXTRACTOR
   Takes study text → extracts 5 Q&A pairs → renders as flippable cards
   ══════════════════════════════════════════════ */

async function runFlashcards() {
  const text = document.getElementById("flashcardInput").value.trim();
  if (!text) return;

  const outputEl = document.getElementById("flashcardOutput");
  const btn = document.getElementById("flashcardBtn");

  btn.dataset.label = "<span>Extract Flashcards</span> →";
  btn.disabled = true;
  btn.innerHTML = `<span class="ai-spinner"></span> Extracting…`;
  outputEl.innerHTML = "";

  const systemPrompt = `You are a flashcard extraction engine for exam prep.

The user will provide a block of study text. Extract the 5 most important, exam-testable facts.

Return ONLY a valid JSON array — no markdown fences, no explanation, no extra text. The array must follow this exact schema:

[
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." }
]

Rules:
- Questions must be specific, exam-style (not vague)
- Answers must be concise but complete (1-3 sentences max)
- Cover different aspects of the text — do not cluster on one sub-topic
- Do not include the word "answer" in the question`;

  try {
    const raw = await callAnthropicAPI(systemPrompt, text, 800);

    // Safely parse the JSON — strip any accidental markdown fences
    const clean = raw.replace(/```json|```/g, "").trim();
    const cards = JSON.parse(clean);

    if (!Array.isArray(cards) || cards.length === 0) {
      throw new Error("Unexpected response format. Please try again.");
    }

    // Render flippable flashcards
    outputEl.innerHTML = `
      <p class="fc-hint">Click a card to reveal the answer</p>
      <div class="flashcard-grid">
        ${cards.map((c, i) => `
          <div class="flashcard" onclick="flipCard(this)" id="fc${i}">
            <div class="fc-inner">
              <div class="fc-front">
                <div class="fc-num">Q${i + 1}</div>
                <p>${c.question}</p>
              </div>
              <div class="fc-back">
                <div class="fc-num">A${i + 1}</div>
                <p>${c.answer}</p>
              </div>
            </div>
          </div>`).join("")}
      </div>`;

  } catch (e) {
    showError("flashcardOutput", e.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = "<span>Extract Flashcards</span> →";
  }
}

/** Flip a flashcard */
function flipCard(el) {
  el.classList.toggle("flipped");
}

/* ══════════════════════════════════════════════
   TOOL 3 — STUDY SCHEDULER (Spaced Repetition)
   Takes subjects + days → generates day-by-day schedule
   ══════════════════════════════════════════════ */

async function runSchedule() {
  const subjects = document.getElementById("scheduleSubjects").value.trim();
  const days = parseInt(document.getElementById("scheduleDays").value) || 31;
  const hrs = parseInt(document.getElementById("scheduleHrs").value) || 4;

  if (!subjects) {
    showError("scheduleOutput", "Please enter at least one subject.");
    return;
  }

  const outputEl = document.getElementById("scheduleOutput");
  const btn = document.getElementById("scheduleBtn");

  btn.dataset.label = "<span>Generate Schedule</span> →";
  btn.disabled = true;
  btn.innerHTML = `<span class="ai-spinner"></span> Building schedule…`;
  outputEl.innerHTML = "";

  const systemPrompt = `You are a spaced-repetition study planner for university exams. Your schedules are evidence-based and practical.

Spaced repetition logic you MUST follow:
1. Identify the hardest 2-3 subjects and schedule them heavily in Days 1–${Math.floor(days * 0.45)}.
2. Introduce each subject in the first week so nothing is left until last minute.
3. After the initial learning block for each subject, re-visit it at increasing intervals: 2 days, then 4 days, then 7 days.
4. Reserve the final ${Math.min(5, Math.floor(days * 0.15))} days for mixed practice exams only.
5. Include one rest/buffer day per week.

Output ONLY a valid JSON object — no markdown, no preamble:

{
  "summary": "2-3 sentence overview of the strategy",
  "hardest": ["subject1", "subject2"],
  "weeks": [
    {
      "label": "Week 1 — Days 1–7",
      "theme": "e.g. Foundation & Hardest Subjects",
      "days": [
        { "day": 1, "date": "Day 1", "subject": "Subject Name", "task": "Brief task description", "hours": ${hrs} },
        ...7 entries
      ]
    },
    ... one object per week
  ]
}`;

  try {
    const raw = await callAnthropicAPI(
      systemPrompt,
      `Subjects: ${subjects}\nTotal days: ${days}\nStudy hours per day: ${hrs}`,
      2000
    );

    const clean = raw.replace(/```json|```/g, "").trim();
    const sched = JSON.parse(clean);

    outputEl.innerHTML = `
      <div class="sched-summary">
        <div class="chip chip-green" style="margin-bottom:10px">Strategy Overview</div>
        <p>${sched.summary}</p>
        ${sched.hardest ? `<p style="margin-top:8px;font-size:12px;color:var(--red2)">
          ⚡ Priority subjects: <strong>${sched.hardest.join(", ")}</strong>
        </p>` : ""}
      </div>
      ${sched.weeks.map(week => `
        <div class="sched-week">
          <div class="sched-week-header">
            <span class="sched-week-label">${week.label}</span>
            <span class="sched-week-theme">${week.theme}</span>
          </div>
          <div class="sched-days-grid">
            ${week.days.map(d => `
              <div class="sched-day">
                <div class="sched-day-num">Day ${d.day}</div>
                <div class="sched-day-subject">${d.subject}</div>
                <div class="sched-day-task">${d.task}</div>
                <div class="sched-day-hrs">${d.hours}h</div>
              </div>`).join("")}
          </div>
        </div>`).join("")}`;

  } catch (e) {
    showError("scheduleOutput", e.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = "<span>Generate Schedule</span> →";
  }
}
