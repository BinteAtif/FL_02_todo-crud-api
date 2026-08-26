const express = require("express");

const app = express();
const PORT = 3000;

// Parse JSON request bodies (needed for POST/PUT below) into req.body
app.use(express.json());

// --- In-memory "database" -------------------------------------------------
// Real database comes in Week 3. For now this array *is* the data store.
// Restarting the server wipes it back to these 3 seed tasks.
let tasks = [
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Walk the dog", done: true },
  { id: 3, title: "Write README", done: false },
];
let nextId = 4; // next free id to hand out on create

app.get("/", (req, res) => {
  res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- Read ------------------------------------------------------------------

// GET /tasks - list every task
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - get a single task by its id
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  res.json(task);
});

// --- Create ------------------------------------------------------------

// POST /tasks - create a new task. Body: { "title": "Buy milk" }
app.post("/tasks", (req, res) => {
  const { title } = req.body || {};

  // The server never trusts the client: validate before doing anything.
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required and cannot be empty" });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Task API listening on http://localhost:${PORT}`);
});
