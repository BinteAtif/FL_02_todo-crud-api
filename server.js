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

// GET /tasks - list tasks, optionally filtered/searched/paginated via query params
//   ?done=true|false   only tasks with that done value
//   ?search=milk       only tasks whose title contains this text (case-insensitive)
//   ?limit=2&offset=2  a page of results (real APIs never return "everything" at once)
app.get("/tasks", (req, res) => {
  let result = tasks;

  if (req.query.done !== undefined) {
    const wantDone = req.query.done === "true";
    result = result.filter((t) => t.done === wantDone);
  }

  if (req.query.search) {
    const term = req.query.search.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(term));
  }

  if (req.query.limit !== undefined || req.query.offset !== undefined) {
    const offset = Number(req.query.offset) || 0;
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : result.length;
    result = result.slice(offset, offset + limit);
  }

  res.json(result);
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

// --- Update ------------------------------------------------------------

// PUT /tasks/:id - replace title and/or done. Body: { "title": "...", "done": true }
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  const { title, done } = req.body || {};

  const titleProvided = title !== undefined;
  const doneProvided = done !== undefined;

  if (!titleProvided && !doneProvided) {
    return res.status(400).json({ error: "provide at least title or done to update" });
  }
  if (titleProvided && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  if (doneProvided && typeof done !== "boolean") {
    return res.status(400).json({ error: "done must be true or false" });
  }

  if (titleProvided) task.title = title.trim();
  if (doneProvided) task.done = done;

  res.json(task);
});

// --- Delete ------------------------------------------------------------

// DELETE /tasks/:id - remove a task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

// --- Extras ------------------------------------------------------------

// GET /stats - the server computing something instead of just storing it
app.get("/stats", (req, res) => {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  res.json({ total, done, open: total - done });
});

// POST /reset - restore the 3 seed tasks (handy for demos)
app.post("/reset", (req, res) => {
  tasks = [
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Walk the dog", done: true },
    { id: 3, title: "Write README", done: false },
  ];
  nextId = 4;
  res.json({ status: "reset", tasks });
});

app.listen(PORT, () => {
  console.log(`Task API listening on http://localhost:${PORT}`);
});
