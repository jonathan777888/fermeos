const STORAGE_KEY = "fermeOSState";

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
      crop: "Brocoli",
      issue: "Stress ou maladie",
      severity: "Urgent",
      notes: "Quelques plants morts. Vérifier l'implantation et les symptômes.",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      parcel: "D6",
      crop: "Courgette",
      issue: "Ravageur",
      severity: "Urgent",
      notes: "Présence de chrysomèle. Prévoir argile double dose.",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      parcel: "Tunnel",
      crop: "Tomate",
      issue: "Suivi",
      severity: "Faible",
      notes: "Plants très beaux, zéro problème. Effeuiller, drageonner et mettre les cordes.",
      createdAt: new Date().toISOString()
    }
  ],
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Reboucher les trous de couverture des melons",
      assignee: "Jonathan",
      priority: "Priorité 1",
      status: "À faire",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: "Récolter un peu d'ail quand 3 feuilles sont jaunes",
      assignee: "Équipe champ",
      priority: "Priorité 1",
      status: "En cours",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      title: "Désherbage dans les choux",
      assignee: "Équipe légumes",
      priority: "Priorité 2",
      status: "À faire",
      createdAt: new Date().toISOString()
    }
  ],
  qualityChecks: [
    {
      id: crypto.randomUUID(),
      crop: "Laitue",
      category: "Vendable",
      quantity: 24,
      notes: "Les laitues vont très bien.",
      createdAt: new Date().toISOString()
    },
    {
      id: crypto.randomUUID(),
      crop: "Tomate",
      category: "Vendable",
      quantity: 34,
      notes: "Zéro problème observé.",
      createdAt: new Date().toISOString()
    }
  ],
  posts: [
    {
      id: crypto.randomUUID(),
      author: "Jonathan",
      message: "Les melons d'eau sont bien protégés. Pas de chrysomèle ni punaise terne observées.",
      createdAt: new Date().toISOString()
    }
  ]
};

let state = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialState;
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Impossible de lire les données locales", error);
    return initialState;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-CA", {
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
  const todoTasks = state.tasks.filter((task) => task.status !== "Terminé");

  document.getElementById("urgentCount").textContent = urgentObservations.length;
  document.getElementById("todoCount").textContent = todoTasks.length;
  document.getElementById("qualityCount").textContent = state.qualityChecks.length;
  document.getElementById("postCount").textContent = state.posts.length;

  const priorities = state.tasks
    .filter((task) => task.priority === "Priorité 1" && task.status !== "Terminé")
    .slice(0, 5);

  document.getElementById("priorityList").innerHTML = priorities.length
    ? priorities.map((task) => `<li class="item"><strong>${task.title}</strong>${task.assignee} - ${task.status}<small>${task.priority}</small></li>`).join("")
    : emptyMessage("Aucune priorité 1 pour le moment.");

  const recent = [...state.observations]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  document.getElementById("recentObservations").innerHTML = recent.length
    ? recent.map((obs) => `<li class="item"><strong>${obs.parcel} - ${obs.crop}</strong>${obs.issue} · ${obs.severity}<small>${obs.notes}</small></li>`).join("")
    : emptyMessage("Aucune observation enregistrée.");
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
    : emptyMessage("Aucune observation enregistrée.");
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = state.tasks.length
    ? state.tasks.map((task) => `
      <li class="item">
        <strong>${task.title}</strong>
        Responsable: ${task.assignee}
        <small>${task.priority} · ${task.status}</small>
        <div class="item-actions">
          <button class="mini-btn" onclick="updateTaskStatus('${task.id}', 'En cours')">En cours</button>
          <button class="mini-btn" onclick="updateTaskStatus('${task.id}', 'Terminé')">Terminé</button>
        </div>
      </li>
    `).join("")
    : emptyMessage("Aucune tâche créée.");
}

function renderQuality() {
  const list = document.getElementById("qualityList");
  list.innerHTML = state.qualityChecks.length
    ? state.qualityChecks.map((check) => `
      <li class="item">
        <strong>${check.crop} - ${check.category}</strong>
        Quantité: ${check.quantity}
        <small>${check.notes || "Aucune note"}</small>
        <small>${formatDate(check.createdAt)}</small>
      </li>
    `).join("")
    : emptyMessage("Aucun contrôle qualité enregistré.");
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
    : emptyMessage("Aucun message d'équipe.");
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
