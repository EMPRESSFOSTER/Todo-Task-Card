/**
 * Todo Task Card — app.js
 * Handles: time-remaining calculation, checkbox toggle, edit/delete actions
 */

/* ── Configuration ───────────────────────────────── */
// Fixed due date: May 1, 2026 at 18:00 UTC
let DUE_DATE = new Date("2026-05-01T18:00:00Z");

/* ── Element references ──────────────────────────── */
const card          = document.querySelector('[data-testid="test-todo-card"]');
const checkbox      = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const statusBadge   = document.querySelector('[data-testid="test-todo-status"]');
const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');
const editBtn       = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn     = document.querySelector('[data-testid="test-todo-delete-button"]');

/* ── Editable Elements ───────────────────────────── */
const cardTitle       = document.getElementById('card-title');
const cardDescription = document.getElementById('card-description');
const dueDateDisplay  = document.getElementById('due-date-display');
const editDateInput   = document.getElementById('edit-date-input');

/* ── Time remaining ──────────────────────────────── */
function getTimeRemainingText(due) {
  const now        = Date.now();
  const diffMs     = due.getTime() - now;
  const diffSec    = Math.round(diffMs / 1000);
  const diffMin    = Math.round(diffSec / 60);
  const diffHours  = Math.round(diffMin / 60);
  const diffDays   = Math.round(diffHours / 24);

  if (Math.abs(diffMin) <= 1) {
    return { text: "Due now!", cls: "tr--now" };
  }

  if (diffMs < 0) {
    // Overdue
    const absHours = Math.abs(diffHours);
    const absDays  = Math.abs(diffDays);
    if (absHours < 24) {
      return {
        text: `Overdue by ${absHours} hour${absHours !== 1 ? "s" : ""}`,
        cls: "tr--overdue",
      };
    }
    return {
      text: `Overdue by ${absDays} day${absDays !== 1 ? "s" : ""}`,
      cls: "tr--overdue",
    };
  }

  // Future
  if (diffHours < 24) {
    if (diffHours <= 1) {
      return { text: `Due in ${diffMin} minute${diffMin !== 1 ? "s" : ""}`, cls: "tr--soon" };
    }
    return { text: `Due in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`, cls: "tr--soon" };
  }
  if (diffDays === 1) {
    return { text: "Due tomorrow", cls: "tr--soon" };
  }
  if (diffDays <= 7) {
    return { text: `Due in ${diffDays} days`, cls: "tr--soon" };
  }
  return { text: `Due in ${diffDays} days`, cls: "tr--ok" };
}

function updateTimeRemaining() {
  const { text, cls } = getTimeRemainingText(DUE_DATE);
  timeRemaining.textContent = text;
  // Remove old state classes, add current one
  timeRemaining.className = `time-remaining ${cls}`;
}

/* Run immediately, then refresh every 60 s */
updateTimeRemaining();
setInterval(updateTimeRemaining, 60_000);

/* ── Checkbox toggle ─────────────────────────────── */
const STATUS_LABELS = {
  pending:    { text: "⏳ Pending",     label: "Status: Pending" },
  inProgress: { text: "⚙️ In Progress", label: "Status: In Progress" },
  done:       { text: "✅ Done",         label: "Status: Done" },
};

// Starting status (matches HTML)
let currentStatus = "inProgress";

function applyCompletedState(completed) {
  if (completed) {
    card.classList.add("is-complete");
    statusBadge.textContent = STATUS_LABELS.done.text;
    statusBadge.setAttribute("aria-label", STATUS_LABELS.done.label);
  } else {
    card.classList.remove("is-complete");
    statusBadge.textContent = STATUS_LABELS[currentStatus].text;
    statusBadge.setAttribute("aria-label", STATUS_LABELS[currentStatus].label);
  }
}

checkbox.addEventListener("change", () => {
  applyCompletedState(checkbox.checked);
});

// Support keyboard toggle via Space / Enter on the label
document.querySelector('label[for="todo-complete"]').addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  }
});

/* ── Edit button ─────────────────────────────────── */
let isEditing = false;
const originalEditHtml = editBtn.innerHTML;

editBtn.addEventListener("click", () => {
  if (!isEditing) {
    isEditing = true;
    editBtn.innerHTML = '💾 Save';
    
    // Enable editing on title and description
    cardTitle.setAttribute('contenteditable', 'true');
    cardDescription.setAttribute('contenteditable', 'true');
    
    // Swap date display for picker format YYYY-MM-DDTHH:mm
    dueDateDisplay.classList.add('hidden');
    editDateInput.classList.remove('hidden');
    
    const tzOffset = DUE_DATE.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(DUE_DATE.getTime() - tzOffset)).toISOString().slice(0, 16);
    editDateInput.value = localISOTime;

    cardTitle.focus();
  } else {
    isEditing = false;
    editBtn.innerHTML = originalEditHtml;
    
    // Disable editing
    cardTitle.removeAttribute('contenteditable');
    cardDescription.removeAttribute('contenteditable');
    
    // Swap back to text display
    dueDateDisplay.classList.remove('hidden');
    editDateInput.classList.add('hidden');
    
    if (editDateInput.value) {
      DUE_DATE = new Date(editDateInput.value);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      dueDateDisplay.textContent = `Due ${DUE_DATE.toLocaleDateString(undefined, options)}`;
      dueDateDisplay.setAttribute('datetime', DUE_DATE.toISOString());
      updateTimeRemaining();
    }
  }
});

/* ── Delete button ───────────────────────────────── */
deleteBtn.addEventListener("click", () => {
  const confirmed = window.confirm("Delete this task? This cannot be undone.");
  if (confirmed) {
    card.style.transition = "opacity 300ms ease, transform 300ms ease";
    card.style.opacity = "0";
    card.style.transform = "scale(0.96)";
    setTimeout(() => {
      card.remove();
    }, 320);
  }
});
