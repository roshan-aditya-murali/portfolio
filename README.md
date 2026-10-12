# roshan-aditya-murali.github.io

Personal portfolio: React + TypeScript + Vite. IDE-style layout with an interactive terminal (type `help`).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Edit content
Everything lives in `src/data.ts`. Search for `EDIT` to find what still needs your details
(email, LinkedIn, photo, internship titles/dates, B.Tech year, ASOSU start date).

Put these in `public/`:
- `resume.pdf` — export from Overleaf
- `profile.jpg` — square photo, then set `photo: "profile.jpg"` in `src/data.ts`

## Deploy: GitHub Pages (free)
1. Create a public repo named exactly `roshan-aditya-murali.github.io`.
2. Push this folder to `main`:
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/roshan-aditya-murali/roshan-aditya-murali.github.io.git
   git push -u origin main
   ```
3. Repo **Settings → Pages → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push.
   Live at https://roshan-aditya-murali.github.io in ~1–2 minutes.

## Alternative: Vercel (also free)
Import the repo at vercel.com → New Project. It detects Vite automatically; no config needed.
Every push to `main` redeploys, and pull requests get preview URLs.

## Custom domain (optional, ~$10–15/yr)
Buy one (Cloudflare Registrar or Porkbun), then:
- **GitHub Pages:** add `A` records for `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153,
  185.199.111.153 and a `CNAME` for `www` → `roshan-aditya-murali.github.io`. Enter the domain under
  Settings → Pages → Custom domain, then tick **Enforce HTTPS**. Also add a file `public/CNAME`
  containing just your domain so deploys keep it.
- **Vercel:** Project → Settings → Domains → add it and follow the DNS records it shows.
