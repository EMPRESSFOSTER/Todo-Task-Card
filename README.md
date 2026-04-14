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

## What Changed (Latest Update)

### UI/UX Improvements
- **Fixed Overlapping Content**: Added comprehensive CSS styling for all card elements to eliminate text/content overlap
- **Proper Spacing & Padding**: Implemented consistent padding and margins throughout the card layout
- **Enhanced Header Layout**: Improved positioning of title, completion checkbox, and status badges with proper flex layout
- **Tag Styling**: Added polished styling for tags and badges with proper spacing and visual hierarchy
- **Button Footer**: Defined clear styling for action buttons in the card footer
- **Due Date Section**: Enhanced visual presentation of the due date information and time-remaining indicators

### Design Decisions

1. **Absolute Position Priority Indicator**: The priority indicator is positioned absolutely on the left edge for a distinct visual marker. Card content now has `padding-left: 2rem` to prevent overlap.

2. **Flexbox Layout**: Used CSS flexbox throughout for flexible, responsive alignment of header elements, tags, and badges without relying on floats or complex positioning.

3. **Color-Coded Priority Badges**: 
   - High: Red (#ff8c8c)
   - Medium: Orange (#ffa94d)
   - Low: Green (#51cf66)
   - Semi-transparent backgrounds for subtle contrast on dark theme

4. **Semantic Tag Display**: Tags are rendered as inline-block elements with consistent borders, rounded corners, and muted typography to differentiate from actionable buttons.

5. **Dark Theme Consistency**: All styling maintains the dark glassmorphic aesthetic with carefully calculated contrast ratios meeting WCAG AA standards.

### Known Limitations

- **Browser Compatibility**: The component uses modern CSS features (CSS variables, flexbox, CSS Grid). Support for older browsers (IE11 and below) is not guaranteed.
- **Time Granularity**: The "time remaining" calculation updates every 60 seconds. For real-time precision, more frequent updates would be needed (with performance trade-offs).
- **Fixed Width on Desktop**: The card may appear too wide on ultra-wide displays (4K+). Custom breakpoints can be added if needed.
- **Print Styling**: Print styles are not optimized. The card may not render ideally when printed to PDF or paper.

### Accessibility Notes

This component follows **WCAG 2.1 AA compliance** standards:

1. **Color Contrast**: All text colors meet a minimum 4.5:1 contrast ratio against their backgrounds for readability.
2. **Semantic HTML**: Uses `<article>`, `<time>`, `<button>`, and `<label>` elements for proper document structure and screen reader interpretation.
3. **Keyboard Navigation**: All interactive elements (checkboxes, buttons, toggles) are fully keyboard accessible via `Tab`, `Enter`, and `Space` keys.
4. **Screen Reader Support**: 
   - Status badges use `aria-live="polite"` regions to announce updates
   - Custom checkboxes are properly labeled with `<label>` elements
   - Time remaining information is available to assistive technologies
5. **Focus Management**: Visible focus indicators on all interactive elements for clear keyboard navigation feedback.
6. **Inclusive Language**: Status labels (e.g., "Due in 21 days", "Overdue") are clear and unambiguous.
7. **Reduced Motion**: Consider adding `prefers-reduced-motion` media queries for users sensitive to animated transitions. 
