# vishrut.tech

Personal portfolio and blog for Vishrut Agrawal, featuring an interactive terminal widget, experience timeline, projects showcase, and MDX-powered writing.

## Tech Stack

- **Framework:** Next.js 16 (App Router) & React 19
- **Styling:** Tailwind CSS v4
- **Content:** MDX (`@next/mdx`, `gray-matter`, `rehype-pretty-code`, `shiki`)
- **Animation:** Motion

## Local Development

Install dependencies and start the development server with `pnpm`:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- `pnpm dev` — Start the Next.js development server
- `pnpm build` — Build the production bundle
- `pnpm start` — Start the production server
- `pnpm lint` — Run ESLint
- `pnpm prettify` — Format the repository with Prettier

## Environment Variables

Optional environment variables in `.env.local` enable live data in the terminal API routes:

| Variable | Purpose |
| --- | --- |
| `OPENWEATHER_API_KEY` | Weather lookup via `/api/terminal/weather` |
| `SPOTIFY_CLIENT_ID` | Spotify OAuth client ID for `/api/terminal/nowplaying` |
| `SPOTIFY_CLIENT_SECRET` | Spotify OAuth client secret for `/api/terminal/nowplaying` |
| `SPOTIFY_REFRESH_TOKEN` | Spotify refresh token for `/api/terminal/nowplaying` |

## Content Layout

MDX content lives under `content/`:

```text
content/
├── blog/         # Blog posts rendered at /blog/[slug]
├── experience/   # Work experience entries rendered on /experience
└── projects/     # Project entries rendered on /projects
```
