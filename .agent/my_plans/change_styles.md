You are a senior frontend engineer working on an EXISTING React + Tailwind TODO application.

IMPORTANT CONTEXT

- The UI is already implemented and working.
- The main page is called Today
- Do NOT redesign the app.
- Do NOT change the sidebar navigation structure.
- Your task is to UPDATE and EXTEND the existing UI to support new task features.

---

## TECH CONSTRAINTS (STRICT)

- React (JavaScript only)
- Tailwind CSS (utility classes only)
- lucide-react icons only
- Functional components + hooks
- UI only (no backend, no Supabase calls)
- Clean, readable, maintainable code.

---

## SIDEBAR (DO NOT CHANGE)

Current sidebar items:

- Today
- Completed
- Notes
- Settings

Do NOT add filters or controls to the sidebar.
Sidebar is navigation ONLY.

---

## TASK FEATURES TO SUPPORT IN UI

### Task properties to represent

This is mainly the TodoItem.jsx in src/components/todo/TodoItem.jsx

- title
- description (optional)
- priority (High / Medium / Low)
- scheduled_for (Today / Tomorrow)
- is_completed
- completed_on (datetime, shown only if completed)
- postpone_count (number of times moved to next day)

---

## FILTERING UI (TASK VIEW ONLY)

### Where to place filters

- Place filters BELOW the "Today's Tasks" heading
- Align filters to the RIGHT side

### Filters required

1. Status filter:
   - All
   - Active
   - Completed

2. Priority filter:
   - All
   - High
   - Medium
   - Low

### UI rules

- Use dropdowns or pill-style toggles
- No modals
- No advanced filter panels
- Filters affect ONLY the current task list
- Default state:
  - Status = Active
  - Priority = All

---

## ADD TASK INPUT (EXTEND EXISTING UI)

This is mainly in the Today.jsx in src/components/pages/Today.jsx

### Current behavior

- Single input field with "+" button

### Update it using progressive disclosure

#### Default (collapsed)

- Single-line input:
  "Add a new task..."
- Press Enter OR click on + icon → creates task
- Defaults:
  - Priority = Medium
  - Scheduled for = Tomorrow

#### Expanded state (on focus or "+" click)

Show additional controls BELOW the input:

- Priority selector:
  - High
  - Medium
  - Low

- Schedule selector:
  - Today
  - Tomorrow (default)

- "Add description" toggle:
  - Expands a textarea for task description
  - Optional

Do NOT overload the UI
Keep fast task entry as the primary flow

---

## TASK ITEM UI (ENHANCE, DO NOT REDESIGN)

### Base layout stays the same

Add the following details cleanly:

#### Priority indicator

- Show a small colored dot or subtle marker
- Colors:
  - High → red
  - Medium → amber
  - Low → green
- Do NOT use large badges

#### Description

- Show below title if present
- Muted text
- Truncated if long

---

### Completed task behavior

When a task is completed:

- Checkbox is filled
- Title is strikethrough + muted
- Card background has very subtle green tint
- Show completion timestamp:
  Format example:
  "Completed • 12 Sep 2025, 10:42 AM"
- Timestamp should be:
  - Small
  - Muted
  - Shown at bottom-right of task card

---

### Procrastination indicator

If `postpone_count > 0`:

- Show text:
  "Postponed X×"
- Muted style
- Not alarming (no red)
- Place near priority indicator or metadata row

---

## 4️⃣ WHAT NOT TO ADD

❌ No calendar view  
❌ No drag & drop  
❌ No analytics  
❌ No task tags  
❌ No complex animations  
❌ No sidebar filters  

Keep the app focused on **daily execution**.

---

## OUTPUT REQUIREMENTS

- Update existing components only
- Clearly indicate which files are modified
- Output full updated component code
- No setup instructions
- No explanations unless absolutely necessary

---

## FINAL GOAL

Enhance the current task UI to support:

- Priority
- Scheduling (Today / Tomorrow)
- Filtering
- Descriptions
- Completion metadata
- Procrastination tracking

All while keeping the interface calm, minimal, and fast to use.
