# Todo Task Card Component

A clean, modern, and accessible Todo/Task Card block built with vanilla HTML, CSS, and JS. Designed to be fully testable, highly semantic, and WCAG AA accessible.

## Features

- **Modern UI**: Dark-themed aesthetic with a slight glassmorphism effect and responsive stacking layouts (mobile to desktop).
- **Test-Ready**: Incorporates strict `data-testid` attributes on every essential node for automated E2E testing (e.g. Cypress, Playwright).
- **Accessible & Semantic**: Built using `<article>`, `<time>`, correct ARIA live regions (`aria-live="polite"`), semantic lists, and visually hidden but screen-reader-friendly custom checkboxes.
- **Dynamic Time Remaining**: Live calculation of time remaining before a due date, intelligently updating every 60 seconds (with granular views like "Due now!", "Overdue", etc.).
- **Interactive Checkbox**: Checkbox logic syncs seamlessly with visual styling (strikethroughs text, patches status badges dynamically).

## Getting Started

1. **Viewing the file locally**
   You can easily open `index.html` directly in your browser or run the included node server:
   ```bash
   node server.js
   ```
   Then visit `http://127.0.0.1:3000`.

2. **Project Structure**
   - `index.html` – Structure and semantic layout.
   - `styles.css` – All visual logic, customized styling targets, and responsiveness checks.
   - `app.js` – Interactivity, time calculations, and button action handlers.
   - `server.js` - A lightweight HTTP server script to prevent CORS errors when run locally.

## Acceptance Criteria Handled:
- ✅ All required `data-testid` elements exist and are correctly scoped.
- ✅ Custom aesthetic tags & toggles are all fully keyboard focusable and togglable via `Space` and `Enter`.
- ✅ Complete semantic HTML5 adoption (`<time>`, `<button>`, `<label>`).
- ✅ Fully fluid layout with no horizontal scroll issues on mobile screens down to 320px. 
