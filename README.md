# Task API — my first CRUD API

A small REST API that manages a to-do list: create, read, update, and delete tasks.
Built with **Node.js + Express**, documented with **Swagger UI**, data lives **in memory**
(no database yet — that's next week).

Built for FlyRank Internship · Backend Track · Week 2 · Assignment A1.

## What this is

Four CRUD operations over one resource (`tasks`), plus a couple of small extras
(filtering, search, pagination, stats, and a reset endpoint for demos).

## How to run it

Requires [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm start
```

The server starts on **http://localhost:3000**. Visit it in your browser or run:

```bash
curl -i http://localhost:3000/
```

## Endpoints

| Method | Path          | Description                          | Success | Errors        |
|--------|---------------|---------------------------------------|---------|---------------|
| GET    | `/`           | API info                              | 200     | —             |
| GET    | `/health`     | Health check                          | 200     | —             |
| GET    | `/tasks`      | List all tasks (supports `?done=`, `?search=`, `?limit=`, `?offset=`) | 200 | — |
| GET    | `/tasks/:id`  | Get one task                          | 200     | 404           |
| POST   | `/tasks`      | Create a task — body: `{ "title": "..." }` | 201 | 400        |
| PUT    | `/tasks/:id`  | Update a task's `title` and/or `done` | 200     | 400, 404      |
| DELETE | `/tasks/:id`  | Delete a task                         | 204     | 404           |
| GET    | `/stats`      | `{ total, done, open }` counts        | 200     | —             |
| POST   | `/reset`      | Restore the 3 seed tasks              | 200     | —             |

## Try it — curl

```bash
# List tasks
curl -i http://localhost:3000/tasks

# Get one task
curl -i http://localhost:3000/tasks/1

# Get a task that doesn't exist -> 404
curl -i http://localhost:3000/tasks/99

# Create a task
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'

# Mark it done
curl -i -X PUT http://localhost:3000/tasks/4 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'

# Delete it
curl -i -X DELETE http://localhost:3000/tasks/4
```

### Sample output

```
$ curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'

HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"id":4,"title":"Buy milk","done":false}
```

## Try it — Swagger UI

Interactive docs live at **http://localhost:3000/docs**. Every endpoint is listed with a
"Try it out" button — you can run the full CRUD cycle (create, list, update, delete)
without touching the terminal.

_Add your Swagger UI screenshot here after running the server locally:_

`![Swagger UI screenshot](docs/swagger-screenshot.png)`

## The mortality experiment

Create a few tasks, then restart the server (`Ctrl+C`, then `npm start` again) and run
`GET /tasks`. You'll see only the original 3 seed tasks — everything you added is gone.

That's because `tasks` is just a JavaScript array living in the process's memory. When the
process dies, so does the array. There's no database writing anything to disk. This is
the exact problem Week 3 solves.

## Project structure

```
.
├── server.js       # Express app: all routes
├── openapi.json    # OpenAPI spec powering Swagger UI at /docs
├── package.json
└── README.md
```

## Notes on validation & status codes

- `POST /tasks` and `PUT /tasks/:id` reject a missing/empty `title` with `400`.
- Any request for an unknown task id returns `404` with `{ "error": "Task N not found" }`.
- `DELETE` returns `204` with an empty body on success — no content, nothing to say.
- The server never trusts client input without checking it first.
