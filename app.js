const STORAGE_KEY = "fermeOSStateEnglish";

const initialState = {
  observations: [],
  tasks: [],
  qualityChecks: [],
  posts: []
};

const demoState = {
  observations: [
    {
      id: crypto.randomUUID(),
      parcel: "C4",
      crop: "Broccoli",
      issue: "Stress or disease",
      severity: "Urgent",
      notes: "A few plants died. Check establishment quality and visible symptoms.",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      parcel: "D6",
      crop: "Zucchini",
      issue: "Pest",
      severity: "Urgent",
      notes: "Cucumber beetle presence. Plan a double-dose clay treatment.",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      parcel: "Tunnel",
      crop: "Tomato",
      issue: "Monitoring",
      severity: "Low",
      notes: "Plants look very healthy. Remove lower leaves, prune suckers, and install support strings.",
      createdAt: new Date().toISOString()
    }
  ],
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Patch holes in the watermelon cover",
      assignee: "Jonathan",
      priority: "Priority 1",
      status: "To do",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: "Harvest a small amount of garlic when 3 leaves are yellow",
      assignee: "Field team",
      priority: "Priority 1",
      status: "In progress",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: "Weed the cabbage beds",
      assignee: "Vegetable team",
      priority: "Priority 2",
      status: "To do",
      createdAt: new Date().toISOString()
    }
  ],
  qualityChecks: [
    {
      id: crypto.randomUUID(),
      crop: "Lettuce",
      category: "Sellable",
      quantity: 24,
      notes: "The lettuce looks very good.",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      crop: "Tomato",
      category: "Sellable",
      quantity: 34,
      notes: "No problems observed.",
      createdAt: new Date().toISOString()
    }
  ],
  posts: [
    {
      id: crypto.randomUUID(),
      author: "Jonathan",
      message: "Watermelons are well protected. No cucumber beetles or tarnished plant bugs were observed.",
      createdAt: new Date().toISOString()
    }
  ]
};

let state = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return { ...initialState };
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Unable to read local data", error);
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function setView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active-view", view.id === viewId);
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === viewId);
  });
}

function emptyMessage(text) {
  return `<li class="empty">${text}</li>`;
}

function renderDashboard() {
  const urgentObservations = state.observations.filter((item) => item.severity === "Urgent");
  const openTasks = state.tasks.filter((task) => task.status !== "Done");

  document.getElementById("urgentCount").textContent = urgentObservations.length;
  document.getElementById("todoCount").textContent = openTasks.length;
  document.getElementById("qualityCount").textContent = state.qualityChecks.length;
  document.getElementById("postCount").textContent = state.posts.length;

  const priorities = state.tasks
    .filter((task) => task.priority === "Priority 1" && task.status !== "Done")
    .slice(0, 5);

  document.getElementById("priorityList").innerHTML = priorities.length
    ? priorities.map((task) => `<li class="item"><strong>${task.title}</strong>${task.assignee} - ${task.status}<small>${task.priority}</small></li>`).join("")
    : emptyMessage("No Priority 1 task right now.");

  const recent = [...state.observations]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  document.getElementById("recentObservations").innerHTML = recent.length
    ? recent.map((obs) => `<li class="item"><strong>${obs.parcel} - ${obs.crop}</strong>${obs.issue} · ${obs.severity}<small>${obs.notes}</small></li>`).join("")
    : emptyMessage("No observation recorded yet.");
}

function renderObservations() {
  const list = document.getElementById("observationList");
  list.innerHTML = state.observations.length
    ? state.observations.map((obs) => `
      <li class="item">
        <strong>${obs.parcel} - ${obs.crop}</strong>
        ${obs.issue} · <span>${obs.severity}</span>
        <small>${obs.notes}</small>
        <small>${formatDate(obs.createdAt)}</small>
      </li>
    `).join("")
    : emptyMessage("No observation recorded yet.");
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = state.tasks.length
    ? state.tasks.map((task) => `
      <li class="item">
        <strong>${task.title}</strong>
        Assignee: ${task.assignee}
        <small>${task.priority} · ${task.status}</small>
        <div class="item-actions">
          <button class="mini-btn" onclick="updateTaskStatus('${task.id}', 'In progress')">In progress</button>
          <button class="mini-btn" onclick="updateTaskStatus('${task.id}', 'Done')">Done</button>
        </div>
      </li>
    `).join("")
    : emptyMessage("No task created yet.");
}

function renderQuality() {
  const list = document.getElementById("qualityList");
  list.innerHTML = state.qualityChecks.length
    ? state.qualityChecks.map((check) => `
      <li class="item">
        <strong>${check.crop} - ${check.category}</strong>
        Quantity: ${check.quantity}
        <small>${check.notes || "No notes"}</small>
        <small>${formatDate(check.createdAt)}</small>
      </li>
    `).join("")
    : emptyMessage("No quality check recorded yet.");
}

function renderPosts() {
  const list = document.getElementById("postList");
  list.innerHTML = state.posts.length
    ? state.posts.map((post) => `
      <li class="item">
        <strong>${post.author}</strong>
        ${post.message}
        <small>${formatDate(post.createdAt)}</small>
      </li>
    `).join("")
    : emptyMessage("No team message yet.");
}

function renderAll() {
  renderDashboard();
  renderObservations();
  renderTasks();
  renderQuality();
  renderPosts();
}

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function handleFormSubmit(formId, collectionName, transformer) {
  document.getElementById(formId).addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = formToObject(form);
    state[collectionName].unshift({
      id: crypto.randomUUID(),
      ...transformer(data),
      createdAt: new Date().toISOString()
    });
    form.reset();
    saveState();
    renderAll();
  });
}

function updateTaskStatus(id, status) {
  state.tasks = state.tasks.map((task) => task.id === id ? { ...task, status } : task);
  saveState();
  renderAll();
}

window.updateTaskStatus = updateTaskStatus;

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setView(tab.dataset.view));
});

handleFormSubmit("observationForm", "observations", (data) => data);
handleFormSubmit("taskForm", "tasks", (data) => data);
handleFormSubmit("qualityForm", "qualityChecks", (data) => ({
  ...data,
  quantity: Number(data.quantity)
}));
handleFormSubmit("postForm", "posts", (data) => data);

document.getElementById("seedDemoBtn").addEventListener("click", () => {
  state = JSON.parse(JSON.stringify(demoState));
  saveState();
  renderAll();
});

renderAll();
