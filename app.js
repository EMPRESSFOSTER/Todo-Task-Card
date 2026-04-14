/**
 * Todo Task Card — app.js
 * Comprehensive logic for edit mode, status/priority syncing,
 * expand/collapse, and dynamic granular time management.
 */

/* ── State Management ──────────────────────────────── */
let taskData = {
  title: "Launch Design System",
  description: "Finalise all design tokens, component specs, and export the Figma kit. Co-ordinate with engineering to publish the npm package and update the internal documentation site with usage examples.",
  priority: "High",
  status: "In Progress",
  dueDate: new Date("2026-05-01T18:00:00Z"),
};

/* ── Element References ────────────────────────────── */
const card = document.querySelector('[data-testid="test-todo-card"]');
const viewContent = document.getElementById('todo-view-content');
const editForm = document.getElementById('todo-edit-form');

// View mode elements
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const titleDisplay = document.getElementById('card-title');
const descriptionDisplay = document.getElementById('card-description');
const priorityBadge = document.getElementById('todo-priority-badge');
const statusBadge = document.getElementById('todo-status-badge');
const statusControl = document.querySelector('[data-testid="test-todo-status-control"]');
const dueDateDisplay = document.getElementById('due-date-display');
const timeRemaining = document.getElementById('time-remaining-text');
const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');
const expandToggle = document.getElementById('expand-toggle');
const collapsibleSection = document.getElementById('todo-collapsible-section');

// Edit mode elements
const editTitleInput = document.getElementById('edit-title');
const editDescInput = document.getElementById('edit-description');
const editPrioritySelect = document.getElementById('edit-priority');
const editDueDateInput = document.getElementById('edit-due-date');
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector('[data-testid="test-todo-delete-button"]');
const cancelBtn = document.querySelector('[data-testid="test-todo-cancel-button"]');

/* ── Initialization ───────────────────────────────── */
function init() {
  updateView();
  setupEventListeners();
  startClock();
}

function setupEventListeners() {
  // Checkbox toggle
  checkbox.addEventListener('change', () => {
    taskData.status = checkbox.checked ? "Done" : "Pending";
    updateView();
  });

  // Status dropdown toggle
  statusControl.addEventListener('change', (e) => {
    taskData.status = e.target.value;
    updateView();
  });

  // Expand/Collapse logic
  expandToggle.addEventListener('click', toggleExpand);

  // Edit Mode toggle
  editBtn.addEventListener('click', () => enterEditMode());
  cancelBtn.addEventListener('click', () => exitEditMode(false));
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveChanges();
  });

  // Delete
  deleteBtn.addEventListener('click', handleDelete);

  // Keyboard accessibility for label checkbox
  document.querySelector('label[for="todo-complete"]').addEventListener('keydown', (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    }
  });
}

/* ── View Updates ──────────────────────────────────── */
function updateView() {
  // 1. Update Title & Description
  titleDisplay.textContent = taskData.title;
  descriptionDisplay.textContent = taskData.description;

  // 2. Sync Status Control & Checkbox
  statusControl.value = taskData.status;
  checkbox.checked = taskData.status === "Done";
  
  // 3. Update Badges
  statusBadge.textContent = getStatusIcon(taskData.status) + " " + taskData.status;
  priorityBadge.textContent = getPriorityIcon(taskData.priority) + " " + taskData.priority;
  
  // 4. Priority Styles (for left indicator)
  card.classList.remove('priority--high', 'priority--medium', 'priority--low');
  card.classList.add(`priority--${taskData.priority.toLowerCase()}`);
  
  // 5. Status Styles
  card.classList.remove('status--done', 'status--in-progress', 'status--pending');
  card.classList.add(`status--${taskData.status.toLowerCase().replace(' ', '-')}`);

  // 6. Time handling
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  dueDateDisplay.textContent = `Due ${taskData.dueDate.toLocaleDateString(undefined, options)}`;
  dueDateDisplay.setAttribute('datetime', taskData.dueDate.toISOString());
  
  // 7. Auto-collapse check (if description is long)
  if (taskData.description.length > 120) {
    expandToggle.classList.remove('hidden');
  } else {
    expandToggle.classList.add('hidden');
    collapsibleSection.classList.remove('collapsed');
  }

  refreshTimeRemaining();
}

function getStatusIcon(status) {
  const icons = { "Pending": "⏳", "In Progress": "⚙️", "Done": "✅" };
  return icons[status] || "";
}

function getPriorityIcon(priority) {
  const icons = { "High": "🔴", "Medium": "🟠", "Low": "🟢" };
  return icons[priority] || "";
}

/* ── Time Management ───────────────────────────────── */
function refreshTimeRemaining() {
  if (taskData.status === "Done") {
    timeRemaining.textContent = "Completed";
    timeRemaining.className = "time-remaining tr--now";
    overdueIndicator.classList.add('hidden');
    return;
  }

  const now = new Date();
  const diffMs = taskData.dueDate - now;
  const isOverdue = diffMs < 0;
  const absDiff = Math.abs(diffMs);

  // Indicators
  if (isOverdue) {
    overdueIndicator.classList.remove('hidden');
    timeRemaining.className = "time-remaining tr--overdue";
  } else {
    overdueIndicator.classList.add('hidden');
    timeRemaining.className = diffMs < (1000 * 60 * 60 * 24) ? "time-remaining tr--soon" : "time-remaining tr--ok";
  }

  // Calculate granular units
  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timeStr = "";
  if (days > 0) {
    timeStr = `Due in ${days} day${days !== 1 ? "s" : ""}`;
    if (isOverdue) timeStr = `Overdue by ${days} day${days !== 1 ? "s" : ""}`;
  } else if (hours > 0) {
    timeStr = `Due in ${hours} hour${hours !== 1 ? "s" : ""}`;
    if (isOverdue) timeStr = `Overdue by ${hours} hour${hours !== 1 ? "s" : ""}`;
  } else {
    timeStr = `Due in ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    if (isOverdue) timeStr = `Overdue by ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  timeRemaining.textContent = timeStr;
}

function startClock() {
  setInterval(refreshTimeRemaining, 30_000);
}

/* ── Behavior ──────────────────────────────────────── */
function toggleExpand() {
  const isExpanded = collapsibleSection.classList.contains('expanded');
  if (isExpanded) {
    collapsibleSection.classList.replace('expanded', 'collapsed');
    expandToggle.textContent = "Show more";
    expandToggle.setAttribute('aria-expanded', 'false');
  } else {
    collapsibleSection.classList.replace('collapsed', 'expanded');
    expandToggle.textContent = "Show less";
    expandToggle.setAttribute('aria-expanded', 'true');
  }
}

function enterEditMode() {
  // Populate form
  editTitleInput.value = taskData.title;
  editDescInput.value = taskData.description;
  editPrioritySelect.value = taskData.priority;
  
  // Format date for datetime-local
  const tzOffset = taskData.dueDate.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(taskData.dueDate.getTime() - tzOffset)).toISOString().slice(0, 16);
  editDueDateInput.value = localISOTime;

  // Swap views
  viewContent.classList.add('hidden');
  editForm.classList.remove('hidden');
  
  // Focus management
  editTitleInput.focus();
  trapFocus(editForm);
}

function exitEditMode(saved = false) {
  viewContent.classList.remove('hidden');
  editForm.classList.add('hidden');
  
  // Return focus
  editBtn.focus();
}

function saveChanges() {
  taskData.title = editTitleInput.value;
  taskData.description = editDescInput.value;
  taskData.priority = editPrioritySelect.value;
  if (editDueDateInput.value) {
    taskData.dueDate = new Date(editDueDateInput.value);
  }
  
  updateView();
  exitEditMode(true);
}

function handleDelete() {
  if (confirm("Delete this task?")) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    setTimeout(() => card.remove(), 300);
  }
}

/* ── Accessibility: Focus Trapping ─────────────────── */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
}

// Run init
init();

