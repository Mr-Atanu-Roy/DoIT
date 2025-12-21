You are a senior frontend engineer and UI/UX designer

You are working inside an EXISTING React + Vite + Tailwind CSS project.
React, Tailwind, and lucide-react are ALREADY INSTALLED AND CONFIGURED.

Your task is to generate ONLY the FRONTEND UI code (components + pages).
Do NOT include any setup steps.

---

## STRICT CONSTRAINTS

- React (JavaScript only, NOT TypeScript)
- Functional components + hooks
- Tailwind CSS utility classes ONLY (no inline styles)
- Use lucide-react for icons ONLY
- No backend logic
- No Supabase integration yet
- No authentication logic (UI only)
- Clean code

---

## REQUIRED FOLDER STRUCTURE

Assume the following folders already exist or can be created:

-src/
 ├── components/
 │    ├── auth/
 │    │    ├── LoginForm.jsx
 │    │    ├── RegisterForm.jsx
 │    │    └── ForgotPasswordForm.jsx
 │    ├── layout/
 │    │    ├── Sidebar.jsx
 │    │    └── Header.jsx
 │    └── todo/
 │         ├── TodoItem.jsx
 │         └── TodoList.jsx
 │
 ├── pages/
 │    ├── Login.jsx
 │    ├── Register.jsx
 │    ├── ForgotPassword.jsx
 │    └── Dashboard.jsx
 │
 ├── css/
 │    └── main.css
 |
 ├── App.jsx
 └── main.jsx

Generate or modify code ONLY for the files listed above.

---

## DESIGN PHILOSOPHY

- Minimal
- Calm
- Light-themed, airy UI
- Productivity-focused
- No visual noise
- Keyboard-friendly forms
- Mobile-first, responsive

---

## COLOR SCHEME (MANDATORY)

Light theme ONLY.

- Generate a calm, modern, light color palette that matches a professional productivity app and add it to tailwind theme.
- Use neutral light backgrounds with sufficient contrast.
- Choose a single primary accent color and a subtle secondary accent if needed.
- Ensure accessibility-friendly contrast for text and inputs.
- Use colors consistently across all pages.

Do NOT use dark theme colors.
Do NOT hardcode a dark mode.
Do NOT ask the user to choose colors.

Use Tailwind utility classes based on the chosen palette.

---

## FONT

- Use Poppins and sans
- No decorative fonts

---

## ICON RULES

- Use ONLY lucide-react icons
- Icons must be subtle and functional
- No decorative icons

---

## PAGE REQUIREMENTS

### LOGIN PAGE

- Centered card UI
- Fields:
  - Email / Phone input
  - Password input with show/hide toggle
- "Forgot password?" link
- Primary "Sign In" button
- Secondary "Register Now" link
- Rounded card with soft shadow
- No sidebar, header and footer
- Fully responsive

---

### FORGOT PASSWORD PAGE

- Centered card
- "Back to Login" link at top-left inside card
- Email / Phone input
- "Send Reset Link" button
- Informational helper text
- No backend logic

---

### REGISTER (CREATE ACCOUNT) PAGE

- Same design language as Login
- Fields:
  - Full Name
  - Email
  - Password
  - Confirm Password
- Primary "Create Account" button
- Link back to Login

---

### DASHBOARD PAGE

- Main TODO dashboard UI

#### Layout

- Left sidebar (navigation panel)
- Main content area

#### Sidebar behavior

- Contains nav items:
  - Dashboard
  - Today
  - Completed
  - Settings
- Toggleable sidebar
- Sidebar CLOSED by default on mobile / small screens
- Sidebar OPEN by default on desktop
- Hamburger menu button using lucide-react

#### Main content

- Header with page title
- Input field to add a task
- Task list below input

#### Task item UI

- Checkbox on left
- Task text
- Delete icon (visible on hover only)

No drag & drop.
No filtering logic.
UI only.

---

## CODE QUALITY RULES

- Components must be reusable
- No inline styles
- No unnecessary abstractions
- Semantic HTML elements
- Clean Tailwind usage

---

## FINAL GOAL

Generate a clean, calm, professional frontend UI that matches the provided login and forgot-password designs and serves as a solid base for later Supabase integration.
