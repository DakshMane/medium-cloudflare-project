# 📝 Blog Platform

A full-stack blog platform I built to tinker with serverless infrastructure. The goal was to see how modern edge-first tools fit together in a real project — and learn by actually building something.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Cloudflare Workers |
| ORM | Prisma |
| DB Proxy | Prisma Accelerate |
| Database | Neon DB (Serverless Postgres) |
| Caching | Custom in-memory cache (Map + TTL) |

---

## Why each piece is here

### Cloudflare Workers
Instead of spinning up a Node.js server, the entire backend runs on Cloudflare Workers — V8 isolates with sub-5ms cold starts that deploy globally by default. No server to manage, no scaling to think about, pay per request.

### Neon DB
Serverless Postgres that scales to zero when idle. It's just Postgres under the hood (no new query language), and it supports Git-like branching which makes staging environments surprisingly easy.

### Prisma Accelerate
Here's the catch with Cloudflare Workers: they can't open raw TCP connections, so a standard `postgresql://` connection string won't work in production. Prisma Accelerate sits between the Worker and the database and communicates over HTTP instead of TCP. It also handles connection pooling across serverless invocations and adds edge caching for repeated queries.

### Custom in-memory caching
A module-level `Map` with TTL logic on the frontend — no React Query, no Redux. First visit fetches from the API and stores the result; navigating back serves from cache instantly; after 5 minutes the TTL expires and fresh data is fetched. Simple, and it makes pages feel instant on re-visit.

---

## How it all connects

```
User Request
    │
    ▼
React (Frontend)
    │  API call
    ▼
Cloudflare Workers (Edge Backend)
    │  HTTP (not TCP — Workers limitation)
    ▼
Prisma Accelerate (Connection Pooler + Edge Cache)
    │  Pooled connection
    ▼
Neon DB (Serverless Postgres)
```

Each layer exists to solve a constraint from the one before it:
- Serverless backend → can't hold persistent DB connections → Prisma Accelerate bridges it
- Edge latency on repeated requests → custom cache absorbs it

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) database
- A [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) connection string
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) for Cloudflare Workers

### Installation

```bash
git clone https://github.com/your-username/blog-platform.git
cd blog-platform
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=your_api_key"
```

> Note: Use the Prisma Accelerate connection string, not the raw `postgresql://` URL — direct TCP connections don't work inside Cloudflare Workers.

### Run locally

```bash
# Frontend
npm run dev

# Backend (Workers via Wrangler)
npx wrangler dev
```

### Deploy

```bash
npx wrangler deploy
```

---

## Lessons learned

The biggest takeaway from this project: in a serverless stack, every tool exists to patch a gap left by the previous one. Understanding *why* each piece is there (not just *what* it does) is what makes the architecture click.

If you're exploring a similar stack, the TCP limitation in Cloudflare Workers is the thing most tutorials don't mention — worth knowing before you start.

---

## License

MIT
