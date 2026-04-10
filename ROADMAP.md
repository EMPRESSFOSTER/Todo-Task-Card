# Project Roadmap

The Todo Task Card is currently in **Stage 0**. This means it is functioning as a standalone HTML/JS block that meets core layout, semantic, and accessibility standards. 

Here are the future stages for expanding and adopting the component.

## Stage 1: Componentization & Porting (Upcoming)
- **Framework Ports**: Refactor the vanilla HTML/CSS/JS code into a reusable component for primary SPA frameworks.
  - Port to a React component (`<TodoCard />`) with Props.
  - Port to a Vue/Svelte component using native slots.
- **Dynamic Content Binding**: Remove the hard-coded mock data (Task Title, Priority, Arrays of Tags) and wire them up to accept JSON payloads.
- **CSS Preprocessors/Tailwind**: Optionally migrate the Vanilla CSS to Tailwind CSS utility classes or SCSS to fit standard dev pipelines.

## Stage 2: Global State & Board Integration
- **Drag-and-Drop Implementation**: Implement the card into a larger Kanban-style board using libraries like `dnd-kit` or `react-beautiful-dnd`.
- **Global Store Connection**: Ensure the component pulls and dispatches standard actions (e.g., Redux, Zustand, Vuex) instead of isolated DOM mutations.
- **Edit/Delete Modals**: Scaffold out full overlay models/popups when tapping the internal "Edit" and "Delete" action buttons.

## Stage 3: Enhancement & Refinement
- **Animation Flourishes**: Improve micro-interactions (e.g., smoothly sliding completed cards to the bottom of lists).
- **Dark/Light Mode**: Expose standard CSS variables globally to support dynamic user theme toggling beyond the default dark mode.
- **Localization (i18n)**: Add language dictionary hooks so "Due Tomorrow" and "In Progress" are dynamically translated depending on user language.
