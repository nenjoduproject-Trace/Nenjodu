# Frontend deployment

## Vercel

Configure the Vercel project to deploy the frontend directory:

- **Root Directory:** `App`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

`vercel.json` sets the build command/output directory and rewrites frontend routes to `index.html`, so refreshing a React Router route continues to serve the SPA.

Set `VITE_API_URL` in the Vercel project's Production environment (and Preview if used) to the Render API base URL, including `/api`, for example the service URL followed by `/api`. This variable is embedded at build time, so redeploy after changing it. The frontend displays independently of the API, but API-backed features report a configuration error if this variable is missing.

For local development, create `.env` from `.env.example` and set `VITE_API_URL` to the local API base URL.

The backend remains a separate Render service in `Api`; its build and start instructions are in `../Api/README.md`.
