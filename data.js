/**
 * ═══════════════════════════════════════════════════════════════
 *  Kopaline University — 31-Day Exam Mastery Plan
 *  data.js  — all global data consumed by script.js
 * ═══════════════════════════════════════════════════════════════
 *
 *  Exposes three globals:
 *    phases   — 5 study phases (tabs + banner data)
 *    courses  — 6 course metadata objects
 *    content  — per-course explanations, key points, examples & Q&A
 * ═══════════════════════════════════════════════════════════════
 */

/* ─────────────────────────────────────────────────────────────
   PHASES
   ───────────────────────────────────────────────────────────── */
const phases = [
  {
    name:   "Phase 1 — Foundation",
    days:   "Days 1–6",
    color:  "var(--blue2)",
    goal:   "Build a solid conceptual base across all 6 courses",
    detail: "Read core notes once, create a one-page summary per course, and identify your weakest areas before going deeper.",
    schedule: [
      { day: "Days 1–2", task: "FA & MA — read notes, write summaries",         hrs: "4 hrs/day" },
      { day: "Days 3–4", task: "CF & AA — read notes, write summaries",         hrs: "4 hrs/day" },
      { day: "Days 5–6", task: "TX & EB — read notes + self-assessment quiz",   hrs: "4 hrs/day" },
    ],
  },
  {
    name:   "Phase 2 — Deep Dive",
    days:   "Days 7–14",
    color:  "var(--purple)",
    goal:   "Master every examinable topic with worked examples",
    detail: "Two courses per day, rotating through all six. Focus on past-paper style questions and mark schemes.",
    schedule: [
      { day: "Days 7–8",   task: "FA deep dive — IAS standards & ratios",       hrs: "5 hrs/day" },
      { day: "Days 9–10",  task: "MA deep dive — costing & variance analysis",  hrs: "5 hrs/day" },
      { day: "Days 11–12", task: "CF deep dive — WACC, NPV, IRR, CAPM",         hrs: "5 hrs/day" },
      { day: "Days 13–14", task: "AA & TX deep dive — risk, ISAs, tax calcs",   hrs: "5 hrs/day" },
    ],
  },
  {
    name:   "Phase 3 — Practice",
    days:   "Days 15–22",
    color:  "var(--amber)",
    goal:   "Full past-paper practice under timed conditions",
    detail: "One full mock exam per day, alternating courses. Mark against official mark schemes immediately. Log every gap.",
    schedule: [
      { day: "Days 15–16", task: "FA & MA timed mocks (3 hrs each)",            hrs: "6 hrs/day" },
      { day: "Days 17–18", task: "CF & AA timed mocks",                         hrs: "6 hrs/day" },
      { day: "Days 19–20", task: "TX & EB timed mocks",                         hrs: "6 hrs/day" },
      { day: "Days 21–22", task: "Cross-course mixed question bank",             hrs: "5 hrs/day" },
    ],
  },
  {
    name:   "Phase 4 — Gap Attack",
    days:   "Days 23–27",
    color:  "var(--coral)",
    goal:   "Eliminate every weak area identified in Phase 3",
    detail: "Review your logged gaps. Redo missed questions. Write condensed 'cheat sheets' of tricky topics by hand.",
    schedule: [
      { day: "Days 23–24", task: "Targeted re-study of top 5 gap topics",       hrs: "5 hrs/day" },
      { day: "Days 25–26", task: "Re-attempt failed mock questions cold",        hrs: "4 hrs/day" },
      { day: "Day 27",     task: "Write summary cheat sheets (all 6 courses)",   hrs: "4 hrs" },
    ],
  },
  {
    name:   "Phase 5 — Final Sprint",
    days:   "Days 28–31",
    color:  "var(--green2)",
    goal:   "Consolidate, rest, and peak on exam day",
    detail: "Light review only — no new material. Read cheat sheets, sleep 8 hrs/night, and walk in confident.",
    schedule: [
      { day: "Days 28–29", task: "Cheat-sheet review + light Q&A practice",     hrs: "3 hrs/day" },
      { day: "Day 30",     task: "Relax, short walk, review formulas only",      hrs: "1–2 hrs" },
      { day: "Day 31",     task: "EXAM DAY — trust your preparation 🎓",         hrs: "—" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   COURSES  (code must match keys in `content` below)
   ───────────────────────────────────────────────────────────── */
const courses = [
  { code: "FA", name: "Financial Accounting", color: "var(--blue)"   },
  { code: "MA", name: "Management Accounting", color: "var(--purple)" },
  { code: "CF", name: "Corporate Finance",     color: "var(--green)"  },
  { code: "AA", name: "Auditing & Assurance",  color: "var(--amber)"  },
  { code: "TX", name: "Taxation",              color: "var(--coral)"  },
  { code: "EB", name: "Economics for Business",color: "var(--pink)"   },
];

/* ─────────────────────────────────────────────────────────────
   CONTENT  — one entry per course code
   ───────────────────────────────────────────────────────────── */
const content = {

  /* ══════════════════ FA — Financial Accounting ══════════════════ */
  FA: {
    emoji: "📒",
    title: "Financial Accounting",
    plain: `Financial accounting is about recording every financial transaction a business makes and then summarising those transactions into three key reports: the <strong>income statement</strong> (profit or loss), the <strong>balance sheet</strong> (assets, liabilities, equity), and the <strong>cash flow statement</strong>. The whole system rests on the principle of double-entry bookkeeping — every transaction has two equal and opposite effects.`,
    analogy: `<strong>Think of it like a seesaw.</strong> Every time money moves, both sides of the seesaw must balance. If you buy a laptop for cash, assets go up (laptop) and assets go down (cash) by the same amount — perfectly balanced. The balance sheet is just a photo of that seesaw at a single moment in time.`,
    keypoints: [
      { term: "Double-entry:",     def: "Every debit has an equal and opposite credit. Assets and expenses are debited to increase; liabilities, equity and income are credited to increase." },
      { term: "Accruals concept:", def: "Revenue and expenses are recognised when earned/incurred, not when cash moves." },
      { term: "Going concern:",    def: "Accounts are prepared assuming the business will continue operating for the foreseeable future." },
      { term: "IAS 2 Inventories:",def: "Stock is valued at the lower of cost and net realisable value (NRV)." },
      { term: "IFRS 15 Revenue:",  def: "Recognise revenue when (or as) performance obligations are satisfied." },
      { term: "Depreciation:",     def: "Systematic allocation of an asset's cost over its useful life (straight-line or reducing balance)." },
    ],
    example: {
      label: "Worked Example — Income Statement extract",
      text:
`Revenue                        £200,000
Cost of Sales                  (£120,000)
─────────────────────────────────────────
Gross Profit                    £80,000   (40% margin)
Operating Expenses              (£30,000)
─────────────────────────────────────────
Operating Profit (EBIT)         £50,000
Interest                        (£5,000)
─────────────────────────────────────────
Profit Before Tax               £45,000
Tax @ 25%                       (£11,250)
─────────────────────────────────────────
Profit After Tax                £33,750`,
    },
    resources: [
      { label: "IAS/IFRS Summaries — IASB",        url: "https://www.ifrs.org/issued-standards/list-of-standards/" },
      { label: "OpenTuition FA Notes (free)",       url: "https://opentuition.com/acca/fa/" },
      { label: "Investopedia — Financial Statements",url: "https://www.investopedia.com/financial-statements-4427713" },
    ],
    qa: [
      { q: "What is the accounting equation?",
        a: "Assets = Liabilities + Equity. Every transaction keeps this equation balanced. For example, borrowing £10,000 increases assets (cash) by £10,000 and liabilities (loan) by £10,000 — both sides rise equally." },
      { q: "What is the difference between capital expenditure and revenue expenditure?",
        a: "Capital expenditure (capex) buys or improves a long-term asset and is capitalised on the balance sheet, then depreciated. Revenue expenditure is a day-to-day running cost expensed immediately in the income statement. Misclassifying them distorts profit and asset values." },
      { q: "How does straight-line depreciation work?",
        a: "Annual charge = (Cost − Residual value) ÷ Useful life. E.g. a machine costing £50,000 with £5,000 residual value and 5-year life: (£50,000 − £5,000) ÷ 5 = £9,000/year. The carrying amount (NBV) reduces by £9,000 each year." },
      { q: "What is a provision and when should it be recognised?",
        a: "Under IAS 37, a provision is recognised when: (1) there is a present obligation from a past event, (2) it is probable (>50%) that an outflow of resources will occur, and (3) the amount can be reliably estimated. A contingent liability is merely disclosed, not recognised." },
      { q: "What are the key ratios for profitability, liquidity and gearing?",
        a: "Profitability: Gross margin = Gross profit / Revenue; ROCE = EBIT / Capital employed. Liquidity: Current ratio = Current assets / Current liabilities (target ≥2:1); Quick ratio = (CA − Inventory) / CL (target ≥1:1). Gearing: Debt / Equity or Debt / (Debt + Equity) × 100%." },
    ],
  },

  /* ══════════════════ MA — Management Accounting ══════════════════ */
  MA: {
    emoji: "📊",
    title: "Management Accounting",
    plain: `Management accounting provides financial information for <em>internal</em> decision-making — managers, not shareholders. The two main costing methods are <strong>marginal costing</strong> (only variable costs charged to products) and <strong>absorption costing</strong> (fixed costs shared across products). Budgeting and variance analysis help managers measure and control performance.`,
    analogy: `<strong>Think of marginal costing like a pizza stall.</strong> Each pizza costs £3 in ingredients (variable cost). The £500 stall hire (fixed cost) is a period cost — it stays the same whether you sell 1 pizza or 100. Under absorption costing, you spread that £500 across every pizza you expect to sell, changing the reported cost per unit.`,
    keypoints: [
      { term: "Contribution:",          def: "Selling price minus variable cost per unit. The amount each unit 'contributes' to covering fixed costs and then profit." },
      { term: "Break-even point:",      def: "Fixed costs ÷ Contribution per unit. The sales volume at which total contribution exactly covers fixed costs." },
      { term: "Absorption vs Marginal:",def: "Under absorption, fixed overheads are included in unit cost. Under marginal, they are treated as period costs. Profit differs when inventory levels change." },
      { term: "Variance analysis:",     def: "Actual result versus budget/standard. Favourable (F) = better than expected; Adverse (A) = worse." },
      { term: "Standard costing:",      def: "Setting pre-determined costs for materials, labour and overheads, then comparing to actuals to compute variances." },
      { term: "Activity-based costing (ABC):", def: "Assigns overheads using cost drivers (e.g. machine hours, number of set-ups) rather than a single blanket rate." },
    ],
    example: {
      label: "Worked Example — Break-even & Margin of Safety",
      text:
`Selling price per unit:  £20
Variable cost per unit:  £12
Contribution per unit:   £8   (£20 − £12)
Fixed costs:             £40,000

Break-even point = £40,000 ÷ £8 = 5,000 units

If budgeted sales = 7,000 units:
  Margin of Safety = 7,000 − 5,000 = 2,000 units
  MoS % = 2,000 / 7,000 × 100 = 28.6%
  → Sales can fall 28.6% before a loss is made.`,
    },
    resources: [
      { label: "OpenTuition MA Notes (free)",    url: "https://opentuition.com/acca/ma/" },
      { label: "CIMA Management Accounting Hub", url: "https://www.cimaglobal.com/Professional-development/Topics/Management-accounting/" },
      { label: "Investopedia — Variance Analysis",url: "https://www.investopedia.com/terms/v/variance.asp" },
    ],
    qa: [
      { q: "What is the difference between marginal and absorption costing profit?",
        a: "When inventory levels increase, absorption costing shows higher profit (some fixed costs are deferred in closing stock). When inventory decreases, absorption profit is lower (old fixed costs are released). Marginal costing profit is unaffected by inventory changes — fixed costs are always expensed in full in the period." },
      { q: "Calculate the material price variance given: Standard price £5/kg, Actual price £5.50/kg, Actual quantity used 1,000 kg.",
        a: "Material Price Variance = (Standard price − Actual price) × Actual quantity = (£5.00 − £5.50) × 1,000 = −£500 Adverse. It is adverse because we paid more than standard." },
      { q: "What is a favourable labour efficiency variance?",
        a: "Labour Efficiency Variance = (Standard hours − Actual hours) × Standard rate. Favourable means fewer hours were worked than standard, indicating workers were more productive than expected." },
      { q: "What is throughput accounting and the TA ratio?",
        a: "Throughput accounting focuses on the bottleneck resource. Throughput = Sales revenue minus direct material cost. TA Ratio = Throughput per unit of bottleneck resource ÷ Total factory cost per unit of bottleneck. A TA ratio > 1 means the product is worth making." },
      { q: "How is a flexible budget different from a fixed budget?",
        a: "A fixed budget is set at the start of the period and does not change. A flexible budget is adjusted to the actual activity level, making variance analysis more meaningful — it removes the impact of volume differences so you can see pure spending and efficiency variances." },
    ],
  },

  /* ══════════════════ CF — Corporate Finance ══════════════════ */
  CF: {
    emoji: "💰",
    title: "Corporate Finance",
    plain: `Corporate finance is about how companies raise capital, invest it wisely, and return value to shareholders. The three core decisions are: <strong>investment</strong> (NPV, IRR — should we take this project?), <strong>financing</strong> (WACC, capital structure — how do we fund it?), and <strong>dividend</strong> policy (how much profit do we return?). The goal is to maximise shareholder value.`,
    analogy: `<strong>Think of WACC like the minimum return your money demands.</strong> If your savings account pays 5% and your friend charges 8% interest to lend you money, and you borrow half from each, your blended cost of funding is 6.5%. A project must earn at least 6.5% or you'd have been better off not borrowing. That's WACC.`,
    keypoints: [
      { term: "NPV:",    def: "Net Present Value — sum of discounted future cash flows minus initial investment. Positive NPV = accept; negative NPV = reject." },
      { term: "IRR:",    def: "Internal Rate of Return — the discount rate at which NPV = 0. Accept if IRR > cost of capital." },
      { term: "WACC:",   def: "Weighted Average Cost of Capital = (E/V × Ke) + (D/V × Kd × (1−T)). The firm's blended cost of financing." },
      { term: "CAPM:",   def: "Ke = Rf + β(Rm − Rf). Required return = risk-free rate + beta × equity risk premium." },
      { term: "Modigliani-Miller:", def: "In a world without taxes, capital structure is irrelevant. With taxes, debt is valuable (interest tax shield) up to the point of financial distress." },
      { term: "Dividend policy:", def: "Dividend irrelevance (MM), dividend growth model: P₀ = D₁/(Ke − g). Practical factors: clientele effect, signalling." },
    ],
    example: {
      label: "Worked Example — CAPM & NPV",
      text:
`CAPM:
  Rf = 4%,  β = 1.2,  Rm = 10%
  Ke = 4% + 1.2 × (10% − 4%) = 4% + 7.2% = 11.2%

NPV (simple 2-year project):
  Initial investment:   −£100,000
  Year 1 cash flow:     £60,000  ÷ 1.112¹ = £53,957
  Year 2 cash flow:     £70,000  ÷ 1.112² = £56,548
  ───────────────────────────────────────────────────
  NPV = −£100,000 + £53,957 + £56,548 = +£10,505
  → Positive NPV: accept the project.`,
    },
    resources: [
      { label: "OpenTuition AFM/FM Notes",          url: "https://opentuition.com/acca/afm/" },
      { label: "Damodaran Online (NYU) — Valuation", url: "https://pages.stern.nyu.edu/~adamodar/" },
      { label: "Investopedia — WACC",                url: "https://www.investopedia.com/terms/w/wacc.asp" },
    ],
    qa: [
      { q: "When would you prefer IRR over NPV and what are IRR's limitations?",
        a: "IRR is useful for ranking projects when funds are limited. However IRR assumes reinvestment at the IRR rate (unrealistic), gives multiple solutions with non-conventional cash flows, and can contradict NPV rankings when projects differ in scale or timing. NPV is theoretically superior for wealth maximisation." },
      { q: "What is the equity beta versus asset beta distinction?",
        a: "Equity beta (βe) reflects both business and financial risk. Asset beta (βa) reflects only business risk — it strips out leverage. Ungear using: βa = βe × [E/(E + D(1−T))]. Regear when you change a project's financing structure to compute the correct CAPM cost of equity." },
      { q: "Explain the Modigliani-Miller propositions with taxes.",
        a: "With corporate taxes, debt creates a tax shield (interest is tax-deductible). Firm value increases with leverage: V levered = V unlevered + (T × D). WACC falls as gearing rises. However, beyond an optimal point, financial distress costs offset the tax benefit." },
      { q: "What is the dividend growth model and how do you apply it?",
        a: "P₀ = D₁ / (Ke − g), where D₁ is next year's expected dividend, Ke is the required return and g is the constant growth rate. Re-arranging: Ke = (D₁ / P₀) + g. Used to estimate the cost of equity from observable market data." },
      { q: "What is modified IRR (MIRR) and why is it better than IRR?",
        a: "MIRR assumes reinvestment at the cost of capital (not the IRR), giving a single unique value. It is calculated by: compounding all positive cash flows to the terminal year at WACC, discounting negative cash flows to year 0, then solving for the rate. MIRR is more realistic and avoids the multiple-IRR problem." },
    ],
  },

  /* ══════════════════ AA — Auditing & Assurance ══════════════════ */
  AA: {
    emoji: "🔍",
    title: "Auditing & Assurance",
    plain: `Auditing is the independent examination of a company's financial statements to give users (shareholders, lenders) reasonable assurance that the accounts are free from material misstatement. Auditors gather <strong>audit evidence</strong>, evaluate <strong>audit risk</strong> (the risk of giving a wrong opinion), and report their findings in an <strong>audit report</strong>. Key standards are the International Standards on Auditing (ISAs).`,
    analogy: `<strong>Think of an auditor like a MOT inspector for a car.</strong> The inspector doesn't drive your car for you — they test whether it meets the required standard and tell you (and the DVLA) whether it passes. They must be independent; your own mechanic can't certify your own car. The 'opinion' in the audit report is the pass/fail certificate.`,
    keypoints: [
      { term: "Audit risk:",          def: "AR = Inherent Risk × Control Risk × Detection Risk. Auditors cannot control IR or CR — they reduce DR by doing more work." },
      { term: "Materiality:",         def: "An item is material if its omission or misstatement would influence the economic decisions of users. Typically 5–10% of profit before tax or 0.5–1% of revenue." },
      { term: "ISA 315:",             def: "Requires the auditor to identify and assess risks of material misstatement through understanding the entity and its environment, including internal controls." },
      { term: "Audit assertions:",    def: "COVACCUE — Completeness, Occurrence/Existence, Valuation, Accuracy, Cut-off, Classification, Understandability, Rights & obligations." },
      { term: "Going concern (ISA 570):", def: "Auditor must evaluate whether going concern basis is appropriate. If doubt exists, assess adequacy of disclosures; if disclosure inadequate, modify opinion." },
      { term: "Modified opinion:",    def: "Qualified (except for…), Adverse (materially misstated), or Disclaimer (unable to form opinion). Emphasis of Matter does not modify the opinion." },
    ],
    example: {
      label: "Worked Example — Audit Risk Assessment",
      text:
`Scenario: A retail client launches a new e-commerce platform mid-year.

Inherent risks identified:
  • Revenue recognition (online vs in-store, returns) — ISA 315
  • IT system change — risk of data errors, new journal entries
  • Inventory valuation — rapid turnover, new NRV estimates

Control risks:
  • New staff, untested IT controls around revenue capture

Audit response (reducing Detection Risk):
  • Increase sample sizes on revenue transactions
  • Perform data analytics on sales patterns and returns
  • Attend year-end inventory count; test NRV calculations
  • Use IT specialist to review new system controls`,
    },
    resources: [
      { label: "IAASB — Full ISA Standards",        url: "https://www.iaasb.org/standards-pronouncements/auditing" },
      { label: "OpenTuition AA Notes (free)",        url: "https://opentuition.com/acca/aa/" },
      { label: "ACCA — Audit & Assurance Textbook",  url: "https://www.accaglobal.com/gb/en/student/exam-support-resources/fundamentals-exams-study-resources/f8/technical-articles.html" },
    ],
    qa: [
      { q: "What is the difference between audit risk and engagement risk?",
        a: "Audit risk is the risk of giving an inappropriate opinion (AR = IR × CR × DR). Engagement risk is broader — the risk to the audit firm's reputation, litigation or regulatory censure arising from accepting the engagement. Both are assessed at the planning stage." },
      { q: "List five substantive procedures for verifying trade receivables.",
        a: "(1) Direct confirmation (positive/negative circularisation). (2) Review of after-date cash receipts. (3) Recalculation of the aged receivables listing. (4) Review of credit notes post year-end (cut-off). (5) Analytical procedures comparing receivable days to prior year and industry." },
      { q: "What are the threats to auditor independence and how are they mitigated?",
        a: "Threats: self-interest, self-review, advocacy, familiarity, intimidation. Safeguards include: rotation of audit partners (ISA 210 / FRC rules), prohibiting financial interests in clients, separating audit from significant non-audit services, quality control reviews, and transparent fee disclosure in the audit report." },
      { q: "Explain the concept of professional scepticism.",
        a: "Professional scepticism (ISA 200) means maintaining a questioning mind and critically assessing audit evidence — not assuming management is honest or dishonest, but always corroborating assertions. It is especially important when dealing with estimates, related-party transactions and management override of controls." },
      { q: "What are the components of an unmodified audit report under ISA 700?",
        a: "Title, Addressee, Opinion paragraph, Basis for opinion (including independence statement), Going concern section, Key Audit Matters (listed entities), Other information, Responsibilities of management, Auditor's responsibilities, Other reporting responsibilities, Auditor's signature, Date, and Auditor's address." },
    ],
  },

  /* ══════════════════ TX — Taxation ══════════════════ */
  TX: {
    emoji: "🧾",
    title: "Taxation",
    plain: `Taxation covers how individuals and companies compute and pay tax to HMRC. The main heads of charge are: <strong>Income Tax</strong> (employment, trading, savings, dividends), <strong>Corporation Tax</strong> (company profits), <strong>Capital Gains Tax</strong> (gains on disposal of assets), and <strong>VAT</strong> (added at each stage of supply). Tax avoidance (legal) is allowed; tax evasion (illegal) is not.`,
    analogy: `<strong>Think of tax like layers of an onion.</strong> The outer layers are your gross income. Each relief, allowance and deduction you're entitled to peels away a layer, and you only pay tax on the inner core. The skill in taxation exams is knowing which layers to peel in the correct order, because HMRC has strict rules about what comes off first.`,
    keypoints: [
      { term: "Personal allowance:",    def: "£12,570 (standard). Reduced by £1 for every £2 earned above £100,000; fully lost at £125,140." },
      { term: "Income tax bands:",      def: "Basic rate 20% (£1–£37,700), Higher rate 40% (£37,701–£125,140), Additional rate 45% (above £125,140). Savings & dividend rates differ." },
      { term: "Corporation tax:",       def: "19% (profits ≤£50,000 small profits rate) to 25% (profits >£250,000 main rate). Marginal relief between £50,000–£250,000." },
      { term: "VAT:",                   def: "Standard rate 20%. Threshold (2024/25): £90,000 turnover. Input tax recoverable; output tax due on supplies. Net tax = Output − Input." },
      { term: "Capital gains tax:",     def: "Gain = Proceeds − Cost − Allowable deductions. Annual exempt amount £3,000 (2024/25). Basic rate 18%/24%; Higher rate 24%/28% (residential property)." },
      { term: "Capital allowances:",    def: "AIA (100% on most P&M up to £1m), Writing Down Allowance (18% main pool, 6% special rate pool), First Year Allowances." },
    ],
    example: {
      label: "Worked Example — Individual Income Tax",
      text:
`Employment income:       £60,000
Less: Personal allowance (£12,570)
─────────────────────────────────────
Taxable income:          £47,430

Tax:
  £37,700 × 20% (basic)  =  £7,540
  £9,730  × 40% (higher) =  £3,892
─────────────────────────────────────
Income tax liability:     £11,432

Note: The higher-rate band begins where basic-rate band ends
(£37,700 of taxable income, i.e. income of £50,270).`,
    },
    resources: [
      { label: "HMRC Tax Rates & Allowances",       url: "https://www.gov.uk/government/collections/tax-rates-and-allowances" },
      { label: "OpenTuition TX Notes (free)",        url: "https://opentuition.com/acca/tx-uk/" },
      { label: "ICAEW Tax Faculty Resources",        url: "https://www.icaew.com/technical/tax" },
    ],
    qa: [
      { q: "How is trading profit adjusted from accounting profit for tax purposes?",
        a: "Start with accounting profit, then add back disallowable expenses (entertaining, depreciation, legal costs for capital items, fines), deduct capital allowances in place of depreciation, adjust for pre-trading expenditure, and deduct any qualifying research & development relief. The result is the taxable trading profit." },
      { q: "What is the VAT fuel scale charge?",
        a: "Where a business pays for road fuel and some is used privately, HMRC uses fixed fuel scale charges based on CO₂ emissions to calculate output VAT on private use. The business adds this output VAT to its VAT return to account for the private benefit, rather than restricting the input tax claim." },
      { q: "Explain entrepreneurs' relief (now Business Asset Disposal Relief).",
        a: "BADR gives a 10% CGT rate (instead of 18%/24%) on qualifying gains up to a lifetime limit of £1 million. Conditions: the individual must have been an employee/officer of the company, held ≥5% of ordinary shares and voting rights, for at least two years prior to disposal." },
      { q: "What is the difference between a tax avoidance scheme and acceptable tax planning?",
        a: "Legitimate tax planning uses reliefs and allowances Parliament intended — e.g. ISAs, pension contributions, enterprise investment schemes. Avoidance exploits loopholes in unintended ways and may be challenged under GAAR (General Anti-Abuse Rule). Evasion involves deliberate misrepresentation or concealment and is criminal." },
      { q: "How does marginal relief for corporation tax work?",
        a: "Where company profits fall between £50,000 and £250,000, effective rate is tapered. Marginal relief = (£250,000 − Profits) × 3/200. This reduces the CT liability, resulting in an effective marginal rate of 26.5% within the relief band." },
    ],
  },

  /* ══════════════════ EB — Economics for Business ══════════════════ */
  EB: {
    emoji: "📈",
    title: "Economics for Business",
    plain: `Economics for Business covers how markets work (<strong>microeconomics</strong>) and how the whole economy behaves (<strong>macroeconomics</strong>). At the micro level you study supply, demand, elasticity and market structures. At the macro level you study GDP, inflation, unemployment, interest rates and government policy. Together these help managers understand the environment their business operates in.`,
    analogy: `<strong>Think of supply and demand like an auction.</strong> If a rare item (low supply) attracts lots of bidders (high demand), the price shoots up until some bidders drop out. If the auction room is nearly empty (low demand) and there are ten identical items (high supply), sellers must cut prices to attract any buyers. Price is always the balancing mechanism.`,
    keypoints: [
      { term: "Price elasticity of demand (PED):", def: "% change in quantity demanded ÷ % change in price. Elastic (|PED|>1): price rise reduces total revenue. Inelastic (|PED|<1): price rise increases total revenue." },
      { term: "Income elasticity (YED):",           def: "Normal goods YED > 0; Inferior goods YED < 0; Luxury goods YED > 1." },
      { term: "Market structures:",                 def: "Perfect competition (price taker, normal profit LR), Monopolistic competition (differentiated, easy entry), Oligopoly (interdependence, game theory), Monopoly (price maker, deadweight loss)." },
      { term: "GDP:",                               def: "Total value of goods and services produced in an economy in a period. GDP = C + I + G + (X − M)." },
      { term: "Monetary policy:",                   def: "Central bank controls interest rates and money supply to target inflation (UK: 2% CPI). Higher rates → lower borrowing → lower demand → lower inflation." },
      { term: "Fiscal policy:",                     def: "Government uses taxation and spending to influence economic activity. Expansionary (deficit spending) stimulates; contractionary (surplus) cools the economy." },
    ],
    example: {
      label: "Worked Example — Price Elasticity of Demand",
      text:
`A firm raises its price from £10 to £12 (+20%).
Quantity demanded falls from 1,000 to 800 units (−20%).

PED = % ΔQd / % ΔP = −20% / +20% = −1.0

PED = −1 is unit elastic: total revenue unchanged.
  Before: £10 × 1,000 = £10,000
  After:  £12 × 800   = £9,600

Note: PED is typically negative (law of demand).
The sign is often ignored and stated as |PED| = 1.0.`,
    },
    resources: [
      { label: "Khan Academy — Microeconomics",      url: "https://www.khanacademy.org/economics-finance-domain/microeconomics" },
      { label: "Khan Academy — Macroeconomics",      url: "https://www.khanacademy.org/economics-finance-domain/macroeconomics" },
      { label: "Bank of England — Monetary Policy",  url: "https://www.bankofengland.co.uk/monetary-policy" },
    ],
    qa: [
      { q: "What shifts the demand curve versus moving along it?",
        a: "A price change causes movement along the demand curve. Shifts of the curve are caused by changes in: consumer income, prices of substitutes/complements, tastes and preferences, advertising, population size, or expectations of future prices." },
      { q: "Explain deadweight loss in a monopoly market.",
        a: "A monopolist restricts output below the competitive level and charges a price above marginal cost. This creates a deadweight loss — a triangle of welfare lost to society that benefits neither producer nor consumer. It represents allocative inefficiency: units that would benefit consumers more than they cost to produce are not being made." },
      { q: "What is the multiplier effect in fiscal policy?",
        a: "When government spending increases by £1, national income rises by more than £1 because recipients spend a fraction of their additional income, which becomes income for others, who spend again. Multiplier = 1 / (1 − MPC) where MPC is the marginal propensity to consume. A higher MPC means a larger multiplier." },
      { q: "What are the causes and consequences of inflation?",
        a: "Demand-pull inflation: excess demand (too much money chasing too few goods). Cost-push inflation: rising input costs (energy, wages) passed on as higher prices. Consequences: erodes purchasing power, distorts investment, creates menu costs, redistributes wealth from creditors to debtors, harms international competitiveness." },
      { q: "How do exchange rates affect a firm's competitiveness?",
        a: "A stronger domestic currency makes exports more expensive in foreign markets (reducing competitiveness) and imports cheaper (squeezing domestic producers). A weaker currency does the opposite — exports become more price-competitive but import costs rise, potentially fuelling cost-push inflation. The net effect depends on PED for exports and imports (Marshall-Lerner condition)." },
    ],
  },
};
