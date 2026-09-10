const API_URL = "https://task-tracker-ci58.onrender.com/api/tasks";

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");


// GET - Load all tasks
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        taskList.innerHTML = "";

        tasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.className = "task";

            taskElement.innerHTML = `
                <div class="task-info">
                    <h3 style="${task.completed ? "text-decoration: line-through;" : ""}">
                        ${task.title}
                    </h3>

                    <p>${task.description || ""}</p>
                </div>

                <div>
                    <button onclick="toggleComplete('${task._id}', ${task.completed})">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>

                    <button onclick="editTask('${task._id}', '${task.title}', '${task.description || ""}')">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteTask('${task._id}')">
                        Delete
                    </button>
                </div>
            `;

            taskList.appendChild(taskElement);
        });

    } catch (error) {
        console.error("Failed to load tasks:", error);
    }
}


// POST - Add task
taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    try {
        await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                description
            })
        });

        taskForm.reset();
        loadTasks();

    } catch (error) {
        console.error("Failed to create task:", error);
    }
});


// PATCH - Complete / Undo
async function toggleComplete(id, currentStatus) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                completed: !currentStatus
            })
        });

        loadTasks();

    } catch (error) {
        console.error("Failed to update task:", error);
    }
}


// PUT - Edit task
async function editTask(id, oldTitle, oldDescription) {

    const newTitle = prompt("Enter new title:", oldTitle);

    if (newTitle === null || newTitle.trim() === "") {
        return;
    }

    const newDescription = prompt(
        "Enter new description:",
        oldDescription
    );

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: newTitle,
                description: newDescription || ""
            })
        });

        loadTasks();

    } catch (error) {
        console.error("Failed to edit task:", error);
    }
}


// DELETE - Delete task
async function deleteTask(id) {

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadTasks();

    } catch (error) {
        console.error("Failed to delete task:", error);
    }
}


// Load tasks when page opens
loadTasks();