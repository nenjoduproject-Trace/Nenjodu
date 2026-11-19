# API deployment

## Render

Create a Web Service with these settings:

- **Root Directory:** `Api`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

Add these environment variables in Render:

- `DATABASE_URL`: the connection URL supplied by the PostgreSQL provider.
- `NODE_ENV`: `production`.
- `FRONTEND_URL`: the deployed frontend origin, if browser clients call this API.
- `DATABASE_SSL`: optional; defaults to SSL enabled in production. Set it to `false` only if the selected database endpoint does not support SSL.

Render assigns `PORT` automatically. The server binds to `0.0.0.0` and uses that assigned port.

The server starts even if PostgreSQL is temporarily unavailable and retries the initial connection five times. `/health` checks that the HTTP server is responding; `/health/db` checks PostgreSQL and returns HTTP 503 while the database is unavailable. Database-backed API routes likewise return HTTP 503 for connection/configuration availability errors.

For local development, `npm run dev` uses `.env`. The legacy `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` settings remain supported when `DATABASE_URL` is not set.
