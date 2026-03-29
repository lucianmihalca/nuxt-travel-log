# Travel Log

> **Work in progress** — This project is under active development. Features and documentation will continue to evolve.

A full-stack web application to track your travel experiences. Log the places you've visited or plan to visit, record trip details, and attach images to each journey.

---

## Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Framework  | [Nuxt 4](https://nuxt.com) + Vue 3                        |
| Language   | TypeScript                                                |
| Styling    | Tailwind CSS v4 + DaisyUI                                 |
| Auth       | [Better Auth](https://www.better-auth.com) (GitHub OAuth) |
| Database   | [Turso](https://turso.tech) (LibSQL / SQLite-compatible)  |
| ORM        | [Drizzle ORM](https://orm.drizzle.team)                   |
| Validation | Zod + Vee-Validate                                        |
| State      | Pinia                                                     |
| i18n       | @nuxtjs/i18n (English / Spanish)                          |

---

## Features

- **Location tracking** — Add and manage places you've traveled to or plan to visit
- **Trip logs** — Record visit dates and descriptions per location
- **Image attachments** — Attach images to trip log entries
- **GitHub OAuth** — Sign in with your GitHub account
- **Persistent preferences** — Sidebar state synced to both cookie and database
- **Internationalization** — English and Spanish support
- **Light / Dark mode** — Theme toggle with DaisyUI

---

## Prerequisites

- [Node.js](https://nodejs.org) >= 20
- [pnpm](https://pnpm.io)
- [Turso CLI](https://docs.turso.tech/cli/introduction) (for local database)
- A GitHub OAuth App ([create one here](https://github.com/settings/developers))

---

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env` file at the project root:

```env
# App
NODE_ENV=development
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000

# GitHub OAuth
AUTH_GITHUB_CLIENT_ID=your-github-client-id
AUTH_GITHUB_CLIENT_SECRET=your-github-client-secret

# Turso Database
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

> In development, `TURSO_AUTH_TOKEN` is optional when using a local Turso instance.

### 3. Set up the database

```bash
pnpm dev:db               # Start the local Turso database
pnpm drizzle-kit migrate  # Apply migrations to the database
```

### 4. Start the development server

```bash
pnpm dev
```

This runs the Nuxt server and the local Turso database concurrently. Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

```bash
pnpm dev            # Start dev server + local Turso database
pnpm dev:db         # Start local Turso database only
pnpm build          # Build for production
pnpm preview        # Preview the production build locally
pnpm lint           # Lint the entire project
pnpm lint:fix       # Auto-fix lint issues
```

### Database (Drizzle Kit)

```bash
pnpm drizzle-kit generate  # Generate migrations from schema changes
pnpm drizzle-kit migrate   # Apply pending migrations
pnpm drizzle-kit studio    # Open Drizzle Studio (visual DB browser)
```

---

## Project Structure

```
nuxt-travel-log/
├── app/
│   ├── components/       # Reusable Vue components
│   ├── composables/      # Vue composables (e.g. user preferences)
│   ├── layouts/          # Page layouts
│   ├── pages/            # File-based routing
│   │   └── dashboard/    # Authenticated dashboard pages
│   └── stores/           # Pinia stores (auth, etc.)
├── lib/
│   ├── auth.ts           # Better Auth configuration
│   ├── db/
│   │   ├── schema/       # Drizzle table definitions
│   │   ├── migrations/   # Auto-generated SQL migrations
│   │   └── queries/      # Database query functions
│   ├── env.ts            # Environment variable validation (Zod)
│   └── zod-schemas.ts    # Shared Zod schemas
├── server/
│   ├── api/              # API route handlers
│   └── middleware/       # Server middleware (auth context)
├── i18n/
│   └── locales/          # en.json, es.json
├── nuxt.config.ts
└── drizzle.config.ts
```

---

## Database Schema

| Table                | Description                                       |
| -------------------- | ------------------------------------------------- |
| `user`               | User accounts (includes `sidebarOpen` preference) |
| `session`            | Auth sessions                                     |
| `account`            | OAuth account links (GitHub)                      |
| `location`           | Places tracked by the user                        |
| `location_log`       | Individual trip entries per location              |
| `location_log_image` | Images attached to trip logs                      |

---

## Roadmap

> This section will be updated as the project progresses.

- [x] GitHub OAuth authentication
- [x] Location management (add, list)
- [x] User preferences persistence
- [x] i18n (English / Spanish)
- [ ] Location log entries (trip details)
- [ ] Image upload and management
- [ ] Map view for locations
- [ ] Location editing and deletion
- [ ] Public profile / shareable logs

---

## Contributing

This is a personal project in active development. Contributions are not expected at this stage, but feedback is welcome via [issues](https://github.com/lucianmihalca/nuxt-travel-log/issues).

---

## License

Private — all rights reserved.
