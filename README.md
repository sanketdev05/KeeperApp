# KeeperApp

KeeperApp is a full-stack note-taking application inspired by the Google Keep style. The app lets users create, view, update, and delete notes from a polished React frontend, with data stored in a PostgreSQL database through an Express backend.

## Features

- Add new notes with a title and content
- Display all saved notes in a responsive card layout
- Edit existing notes inline
- Delete notes from the UI
- Persist note data in PostgreSQL
- Frontend built with Vite and Material UI

## Tech stack

- Frontend: React, Vite, Material UI, Emotion
- Backend: Node.js, Express
- Database: PostgreSQL with `pg`
- Environment configuration: dotenv

## Project structure

```text
KeeperApp/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── Components/
│   │   │   ├── CreateNotes.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Notes.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── server/
│   ├── sql/
│   │   └── schema.sql
│   ├── .env
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── .gitignore
├── README.md
└── .git
```

## Prerequisites

- Node.js and npm
- PostgreSQL server installed and running
- A PostgreSQL database created for the app

## Database setup

Create a PostgreSQL database and add `server/.env` with your database credentials:

```env
PORT=3001
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

The database schema is included in `server/sql/schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

If needed, you can create the table manually with:

```bash
psql -U <username> -d <database_name> -f ./server/sql/schema.sql
```

## Installation

Install dependencies for both parts of the app:

```bash
cd server
npm install

cd ../client
npm install
```

## Running the app

Start the backend API:

```bash
cd server
node index.js
```

In a separate terminal, start the frontend:

```bash
cd client
npm run dev
```

Then open the local Vite URL displayed in the terminal, usually:

```text
http://localhost:5173
```

The frontend calls the backend at:

```text
http://localhost:3001
```

## Client scripts

From the `client` directory:

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Build the production bundle          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint checks                    |

## Backend notes

The Express server exposes routes to:

- fetch all notes
- create a note
- update a note
- delete a note

The app uses PostgreSQL to store note titles, content, and timestamps.

## Notes

- `server/.env` should remain local and not be committed to version control.
- The app is a simple full-stack project for learning and managing notes with React + Express + PostgreSQL.
