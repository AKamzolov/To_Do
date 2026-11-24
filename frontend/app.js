const API = "http://127.0.0.1:8000";
const list = document.getElementById("task-list");
const empty = document.getElementById("empty");
const form = document.getElementById("task-form");

async function loadTasks() {
    const res = await fetch(`${API}/tasks/`);
    const tasks = await res.json();
    list.innerHTML = "";
    empty.classList.toggle("hidden", tasks.length > 0);

    tasks.forEach(t => {
        const li = document.createElement("li");
        if (t.completed) li.classList.add("done");

        li.innerHTML = `
            <div class="task-info">
                <div class="title">${t.title}</div>
                ${t.description ? `<div class="desc">${t.description}</div>` : ""}
            </div>
            <div class="actions">
                ${!t.completed ? `<button title="Выполнено" data-action="complete" data-id="${t.id}">✅</button>` : ""}
                <button title="Удалить" data-action="delete" data-id="${t.id}">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    if (!title) return;

    await fetch(`${API}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: description || null }),
    });

    form.reset();
    loadTasks();
});

list.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;

    if (btn.dataset.action === "complete") {
        await fetch(`${API}/tasks/${id}/complete`, { method: "PATCH" });
    } else if (btn.dataset.action === "delete") {
        await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    }
    loadTasks();
});

loadTasks();