// ================================
// Task Manager - Full Script
// ================================

let tasks = [];
let currentFilter = "all";

// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksList = document.getElementById("tasksList");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const pendingTasksEl = document.getElementById("pendingTasks");
const progressFill = document.getElementById("progressFill");
const emptyState = document.getElementById("emptyState");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const themeToggle = document.getElementById("themeToggle");
const toast = document.getElementById("toast");

// ================================
// Initialize
// ================================
window.onload = function () {
    loadTasks();
    renderTasks();
};

// ================================
// Add Task
// ================================
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        showToast("Please enter a task ⚠️");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    saveTasks();
    renderTasks();
    showToast("Task added successfully ✅");
}

// Enter key support
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Button click
addTaskBtn.addEventListener("click", addTask);

// ================================
// Render Tasks
// ================================
function renderTasks() {
    tasksList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
    <div class="task-card-header gradient-${getRandomGradient()}">
        <div class="task-menu">⋮</div>
    </div>

    <div class="task-card-body">
        <div class="task-title-row">
            <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
            <span class="task-title">${task.text}</span>
        </div>

        <div class="task-meta">
            <span>Status: ${task.completed ? "Completed" : "Pending"}</span>
            <button class="delete-btn">Delete</button>
        </div>
    </div>
`;
function getRandomGradient() {
    const gradients = ["one", "two", "three", "four", "five"];
    return gradients[Math.floor(Math.random() * gradients.length)];
}
        // Toggle complete
        li.querySelector(".task-checkbox").addEventListener("change", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Delete with animation
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.style.opacity = "0";
            li.style.transform = "translateX(40px)";
            setTimeout(() => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                renderTasks();
                showToast("Task deleted ❌");
            }, 300);
        });

        tasksList.appendChild(li);
    });

    updateStats();
}

// ================================
// Filters
// ================================
document.querySelectorAll(".filter-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {

        document.querySelectorAll(".filter-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        if (index === 0) currentFilter = "all";
        if (index === 1) currentFilter = "pending";
        if (index === 2) currentFilter = "completed";

        renderTasks();
    });
});

// ================================
// Update Stats + Progress
// ================================
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;

    const progress = total === 0 ? 0 : (completed / total) * 100;
    progressFill.style.width = progress + "%";

    clearCompletedBtn.disabled = completed === 0;
}

// ================================
// Clear Completed
// ================================
clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    showToast("Completed tasks cleared 🧹");
});

// ================================
// Local Storage
// ================================
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

// ================================
// Toast Notification
// ================================
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ================================
// Dark Mode Toggle
// ================================
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});