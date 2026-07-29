# Ted Saunders — Website (deploy bundle)

Static site. No build step — the pages compile in the browser. Just host these files as-is.

## Pages
- `index.html` — Homepage  (served at `/`)
- `About.html` — About
- `Portfolio.html` — Portfolio
- `portfolio/literature.html` — Portfolio category: Literature & Philosophy (nested; more category pages will live under `portfolio/`)
- `work-with-ted.html` — Work With Ted
- `contact.html` — Contact
- `404.html` — Not-found page (Vercel serves this automatically on unknown routes)

## Deploy to Vercel — pick one

### A) Vercel CLI (fastest)
1. Install once:  `npm i -g vercel`
2. From inside this folder:  `vercel deploy --prod`
3. Follow the prompts (log into your account, pick the scope/team, accept defaults — Framework: **Other**, no build command, output dir = this folder).

### B) Git + Vercel (recommended for ongoing edits)
1. Put this folder in a Git repo and push to GitHub/GitLab/Bitbucket.
2. In Vercel → **Add New → Project → Import** that repo.
3. Framework Preset: **Other**. Build Command: *(none)*. Output Directory: `./`.
4. Deploy. Every future push auto-deploys.

No environment variables or server config are required.
