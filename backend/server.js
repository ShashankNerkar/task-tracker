const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Task = require("./models/Taks");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// GET
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get tasks"
        });
    }
});

// POST
app.post("/api/tasks", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create task"
        });
    }
});

// PUT
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task"
        });
    }
});

// PATCH
app.patch("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task"
        });
    }
});

// DELETE
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task"
        });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});