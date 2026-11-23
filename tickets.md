# Portfolio V2 — Implementation Tickets

Tickets are ordered by priority and dependency. Complete each ticket before starting tickets that depend on it.

**Already done:** shadcn components installed (`scroll-area`, `skeleton`, `separator`, plus original set).

### Progress

| Status | Range | Phase | Notes |
|---|---|---|---|
| 🔄 Partial | PORT-001–019 | Phase 1–4 — Setup, Layout, Shared, Homepage, Terminal core | Complete except PORT-003 (`.env.example` does not currently exist in repo) |
| ✅ Complete | PORT-044–046 | Phase 4b — Snake game | — |
| ✅ Complete | PORT-050–055 | Phase 4c — Game system overhaul (in-terminal + pixel + audio) | — |
| ✅ Complete | PORT-020–024 | Phase 5 — API routes | — |
| ✅ Complete | PORT-026–031 | Phase 6 — MDX setup & content | Placeholder TODO comments remain in experience & project MDX files |
| 🔄 Partial | PORT-032–040 | Phase 7 — Content pages | PORT-032–033, 035–036, 038–040 complete; PORT-034 & PORT-037 detail pages open (cards currently expand inline / link out directly) |
| 🔄 Partial | PORT-041–043 | Phase 8 — Polish | PORT-041–042 complete; PORT-043 (375px responsive polish pass) open |
| 🔄 Partial | PORT-047–049 | Phase 9 — Terminal creativity | PORT-047 & PORT-049 complete; PORT-048 partial (`help --all`, `date --utc` done; `skills --verbose`, `neofetch --no-logo` open) |

### Remaining Codebase TODOs

- **MDX placeholder content:** `{/* TODO: CHANGE PLACEHOLDER CONTENT ABOVE */}` in `content/experience/amazon.mdx`, `content/experience/global-schoolwear.mdx`, `content/experience/xorbix.mdx`, `content/projects/personal-portfolio.mdx`, `content/projects/ponovo.mdx`, and `content/projects/shelfwise.mdx`.

---

## Phase 4b: Snake Game

Build the canvas game overlay infrastructure and get snake playable before moving to API routes.

---

### PORT-044 · Feature · Game infrastructure

**Summary:** `GameContext` + `GameOverlay` — the shell all canvas games render inside.

**Technical Notes:**
- Create `src/types/games.ts`:
  ```typescript
  export type GameId = 'snake' | 'platformer'
  export interface GameModule {
    start(canvas: HTMLCanvasElement, onExit: (score?: number) => void): () => void
    // returns cleanup fn
  }
  ```
- Create `src/contexts/game-context.tsx` (`'use client'`):
  - State: `activeGame: GameId | null`
  - Context value: `{ activeGame, launchGame(id: GameId): void, exitGame(): void }`
  - Export `GameProvider` and `useGame` hook
- Create `src/components/games/game-overlay.tsx` (`'use client'`):
  - Reads `activeGame` from context; renders nothing when `null`
  - When non-null: `fixed inset-0 z-50 bg-background flex flex-col`
  - Title bar: same macOS chrome as terminal (dots + `"<gameId> — Press Escape to exit"`)
  - `<canvas ref={canvasRef} className="flex-1 w-full block" />`
  - `useEffect` on `activeGame`: dynamically import `src/lib/games/<gameId>.ts`, call `start(canvas, handleExit)`; return cleanup
  - `handleExit(score?)`: append score line to terminal (via a callback), call `exitGame()`
  - Global `Escape` keydown listener → `exitGame()`
- Wrap `TerminalSection` in `<GameProvider>`, add `<GameOverlay />` as a sibling to `<TerminalWidget />`

**Files to create:**
- `src/types/games.ts`
- `src/contexts/game-context.tsx`
- `src/components/games/game-overlay.tsx`

**Files to modify:**
- `src/components/home/terminal-section.tsx`

**Acceptance Criteria:**
- `launchGame('snake')` makes fullscreen overlay appear
- `Escape` / `exitGame()` closes it cleanly
- No TypeScript errors

**Dependencies:** PORT-019

---

### PORT-045 · Feature · Snake game module

**Summary:** Self-contained canvas snake — no React, pure `requestAnimationFrame`.

**Technical Notes:**
- Create `src/lib/games/snake.ts` exporting `{ start }` matching `GameModule`
- Grid: 24 cols × 16 rows; cell size = `canvas.width / 24`
- Loop: `requestAnimationFrame`; logic ticks every 120ms (diff timestamps)
- State: `snake: {x,y}[]` (head-first), `dir: {dx,dy}`, `food: {x,y}`, `score`, `alive: boolean`
- Rendering (canvas 2D):
  - Background: read `--background` from `getComputedStyle(document.documentElement)`
  - Snake: `--primary` color; head slightly brighter via `globalAlpha`
  - Food: warm accent (e.g. `oklch(0.7 0.2 30)` or read `--destructive`)
  - Score: top-right, small, `--muted-foreground`
- Input: `document.addEventListener('keydown')` — arrows + WASD update `dir`; `q` → `onExit(score)`
- Collision: wall or self → draw "GAME OVER" overlay on canvas, pause loop, call `onExit(score)` after 1.5s
- Cleanup fn: `cancelAnimationFrame` + `removeEventListener`

**Files to create:**
- `src/lib/games/snake.ts`

**Acceptance Criteria:**
- Snake moves, grows on food, dies on wall/self
- Score increments per food eaten
- `onExit(score)` fires on death or `q`
- Cleanup leaves no leaks

**Dependencies:** PORT-044

---

### PORT-046 · Feature · Wire snake to terminal

**Summary:** `games` command launches games from the terminal; score reported back after exit.

**Technical Notes:**
- Create `src/lib/terminal/game-commands.ts`:
  - Export `makeGamesCommand(launchGame, onScore): CommandDef` — factory pattern
  - No args → list: `  snake        Classic snake on a canvas overlay`
  - `args[0] === 'snake'` → `launchGame('snake')`, return output `"Launching snake... (Escape or q to exit)"`
  - Unknown → `"Unknown game. Type 'games' to see available games."`
- Export `registerCommand(name: string, def: CommandDef)` from `commands.ts` — adds to `COMMANDS` at runtime
- In `terminal-widget.tsx`: on mount (`useEffect`), call `registerCommand('games', makeGamesCommand(launchGame, appendScoreLine))`
- `appendScoreLine(gameId, score)` appends a system line: `"[snake] Game over — score: 12"`
- Disable terminal `<input>` while `activeGame !== null` (read from `useGame()` context)

**Files to create:**
- `src/lib/terminal/game-commands.ts`

**Files to modify:**
- `src/lib/terminal/commands.ts` — add `registerCommand()` export
- `src/components/terminal/terminal-widget.tsx` — mount-time registration, disable input during game

**Acceptance Criteria:**
- `games` lists snake
- `games snake` opens overlay
- Score line appears in terminal stream after game exits
- Input disabled while overlay is open

**Dependencies:** PORT-044, PORT-045

---

## Phase 4c: Game System Overhaul

Move game canvas inside the terminal card; per-game config bundles; audio framework; pause overlay.

---

### PORT-050 · Refactor · Type system update

**Summary:** Add `GameControls`, `GameConfig` (with `bg: string`); update `GameModule`.

**Files modified:** `src/types/games.ts`

**Status:** ✅ Complete

---

### PORT-051 · Feature · Universal audio framework

**Summary:** `playSound(name, isMuted)` plays `/sounds/{name}.mp3`; ignores errors gracefully.

**Files created:** `src/lib/games/audio.ts`

**Status:** ✅ Complete

---

### PORT-052 · Refactor · In-terminal `GamePanel` + registry update

**Summary:** `GamePanel` hosts canvas inside terminal card; `loadGame` returns `mod.config`.

**Files created:** `src/components/games/game-panel.tsx`
**Files modified:** `src/lib/games/registry.ts`, `src/components/terminal/terminal-widget.tsx`
**Files deleted:** `src/components/games/game-overlay.tsx`

**Status:** ✅ Complete

---

### PORT-053 · Feature · Context expansion

**Summary:** Add `isMuted`, `isPaused`, `activeConfig`, `toggleMute`, `setIsPaused`, `setActiveConfig` to `GameContext`.

**Files modified:** `src/contexts/game-context.tsx`

**Status:** ✅ Complete

---

### PORT-054 · Refactor · Snake per-game config

**Summary:** Local `PALETTE`; `GameControls` return; `isMuted` param; pause support; pixelated rendering; `playSound` calls; export `config: GameConfig`.

**Files modified:** `src/lib/games/snake.ts`

**Status:** ✅ Complete

---

### PORT-055 · Feature · Universal `PauseOverlay` + title bar game mode

**Summary:** `PauseOverlay` with mute toggle + controls list; title bar shows active game label with Esc/Q hints.

**Files created:** `src/components/games/pause-overlay.tsx`
**Files modified:** `src/components/terminal/chrome/terminal-title-bar.tsx`, `src/components/home/terminal-section.tsx`

**Status:** ✅ Complete

---

## Phase 5: API Routes

Can be built in parallel with or immediately after Phase 4. The terminal commands call these routes.

---

### PORT-020 · Feature · Spotify now-playing route

**Summary:** Returns the currently playing or most recently played Spotify track.

**Technical Notes:**
- Create `src/app/api/terminal/nowplaying/route.ts`
- Auth flow each request:
  1. POST `https://accounts.spotify.com/api/token` with `grant_type=refresh_token` + Basic Auth header (base64 `clientId:clientSecret`)
  2. Use `access_token` to GET `https://api.spotify.com/v1/me/player/currently-playing`
  3. If 204 (nothing playing), fall back to `https://api.spotify.com/v1/me/player/recently-played?limit=1`
- Response: `{ track: string, artist: string, nowPlaying: boolean }`
- Return 503 with safe error message if env vars are missing
- Env vars: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`

**Files to create:**
- `src/app/api/terminal/nowplaying/route.ts`

**Acceptance Criteria:**
- Returns `{ track, artist, nowPlaying }` with valid credentials
- Returns clean error JSON if credentials missing (no crash, no key exposure)

**Dependencies:** PORT-003

---

### PORT-021 · Feature · Weather route

**Summary:** Returns current weather for Madison, WI.

**Technical Notes:**
- Create `src/app/api/terminal/weather/route.ts`
- Fetch: `https://api.openweathermap.org/data/2.5/weather?q=Madison,WI,US&appid=${KEY}&units=imperial`
- Response: `{ city: string, temp: number, feelsLike: number, description: string, humidity: number }`
- Env var: `OPENWEATHER_API_KEY`

**Files to create:**
- `src/app/api/terminal/weather/route.ts`

**Dependencies:** PORT-003

---

### PORT-022 · Feature · Joke route

**Summary:** Returns a random programming joke.

**Technical Notes:**
- Create `src/app/api/terminal/joke/route.ts`
- Fetch: `https://v2.jokeapi.dev/joke/Programming?safe-mode` with `cache: 'no-store'`
- Handle both `type: 'single'` and `type: 'twopart'`
- Response: `{ type: 'single', joke: string } | { type: 'twopart', setup: string, delivery: string }`

**Files to create:**
- `src/app/api/terminal/joke/route.ts`

**Dependencies:** none

---

### PORT-023 · Feature · Crypto price route

**Summary:** Returns current price and 24h change for a crypto ticker.

**Technical Notes:**
- Create `src/app/api/terminal/price/route.ts`
- Query param: `?ticker=btc`
- Server-side ticker → CoinGecko ID map:
  ```typescript
  const TICKER_MAP: Record<string, string> = {
    btc: 'bitcoin', eth: 'ethereum', sol: 'solana',
    doge: 'dogecoin', ada: 'cardano', xrp: 'ripple', bnb: 'binancecoin',
  }
  ```
- Fetch: `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`
- Response: `{ ticker: string, price: number, change24h: number }`
- Return 400 for unknown tickers

**Files to create:**
- `src/app/api/terminal/price/route.ts`

**Dependencies:** none

---

### PORT-024 · Feature · Dictionary definition route

**Summary:** Returns the definition of a word.

**Technical Notes:**
- Create `src/app/api/terminal/define/route.ts`
- Query param: `?word=ephemeral`
- Fetch: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
- Parse first entry, first meaning, first definition
- Response: `{ word: string, phonetic?: string, partOfSpeech: string, definition: string }`
- Return 404 with message if word not found

**Files to create:**
- `src/app/api/terminal/define/route.ts`

**Dependencies:** none

---

## Phase 6: MDX Setup

Configure MDX support, then add content and content-driven pages.

---

### PORT-026 · Setup · Configure Next.js for MDX

**Summary:** Update `next.config.ts` to support MDX pages and content files.

**Technical Notes:**
- Read `node_modules/next/dist/docs/01-app/02-guides/mdx.md` before writing any config — Next.js 16 may have an updated `createMDX` API
- Add `pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']`
- Wrap config with `createMDX()` from `@next/mdx`
- Plugins:
  - remark: `remark-gfm`
  - rehype: `rehype-slug`, `rehype-pretty-code` (`theme: 'github-dark'`), `rehype-autolink-headings`
- Keep `reactCompiler: true`

**Files to modify:**
- `next.config.ts`

**Files to create:**
- `mdx-components.tsx` at project root — start with a minimal export, flesh out in PORT-028

**Acceptance Criteria:**
- `npm run dev` starts without errors after change
- A test `.mdx` file in `src/app/` resolves as a page without errors

**Dependencies:** PORT-001

---

### PORT-027 · Feature · Build MDX content utilities

**Summary:** Server-side functions for reading and parsing MDX frontmatter.

**Technical Notes:**
- Create `src/lib/mdx.ts`
- Two functions:
  1. `getAllContent(type: 'experience' | 'projects' | 'blog')` — `fs.readdirSync` on `/content/[type]/`, parse frontmatter with `gray-matter`, return typed sorted array (filter `published: false`)
  2. `getContentBySlug(type, slug)` — returns frontmatter for one slug
- Sorting: experience/projects by `order` asc; blog by `date` desc
- Create `src/types/mdx.ts` with frontmatter interfaces:
  ```typescript
  export interface ExperienceFrontmatter {
    slug: string; company: string; role: string;
    dateStart: string; dateEnd: string; location: string;
    website?: string; tech: string[]; published: boolean;
    summary: string; order: number;
  }
  export interface ProjectFrontmatter {
    slug: string; title: string; tagline: string;
    dateStart: string; dateEnd: string;
    status: 'active' | 'archived' | 'hackathon';
    featured: boolean; githubUrl?: string; liveUrl?: string;
    tech: string[]; summary: string; order: number;
  }
  export interface BlogFrontmatter {
    slug: string; title: string; description?: string;
    date: string; published: boolean; readingTime?: string; tags?: string[];
  }
  ```

**Files to create:**
- `src/lib/mdx.ts`
- `src/types/mdx.ts`

**Acceptance Criteria:**
- `getAllContent('experience')` returns all 3 entries sorted by `order`
- Unpublished items are excluded from results

**Dependencies:** PORT-026

---

### PORT-028 · Feature · Flesh out `mdx-components.tsx`

**Summary:** Custom styled element mappings for consistent MDX typography.

**Technical Notes:**
- Update `mdx-components.tsx` at project root
- Element mappings:
- For typography, use the following shadcn components: https://ui.shadcn.com/docs/components/radix/typography.md
- Create `src/components/mdx/callout.tsx` — `<Callout type="info|warn|tip">` usable in MDX

**Files to modify:**
- `mdx-components.tsx`

**Files to create:**
- `src/components/mdx/callout.tsx`

**Acceptance Criteria:**
- Blog post renders with correct typography
- Code blocks are syntax-highlighted

**Dependencies:** PORT-026

---

### PORT-029 · Content · Write experience MDX files

**Summary:** Create MDX files for all three work experiences.

**Files to create:**
- `content/experience/amazon.mdx`
- `content/experience/global-schoolwear.mdx`
- `content/experience/xorbix.mdx`

**Required frontmatter fields:** `slug`, `company`, `role`, `dateStart`, `dateEnd`, `location`, `website`, `tech`, `published`, `summary`, `order`

**MDX body structure (each file):**
- Intro paragraph (1-2 sentences)
- `## What I Built` — 3-4 bullet points from old portfolio
- `## Impact` — quantified outcomes where available
- `## Technologies` — brief prose about the stack

**Source data:**
- Amazon (order: 1): Systems Dev Eng Intern, AWS Photos Operations, May 2025–Present. Migrated load testing from CloudFormation to CDK. Enabled direct Law Enforcement Response tool access (cut 300+ tickets). PoC for SQS queue batching.
- Global Schoolwear (order: 2): SWE, Nov 2024–Apr 2025. Built ThreadMatch with COO. Automated order distribution, +80% throughput.
- Xorbix (order: 3): SWE Intern, Jan 2024–Aug 2024. FNOL form, Quality Control form, Sensia Tech EMR, Time Tracking Portal modernization.

**Acceptance Criteria:**
- `getAllContent('experience')` returns all three, sorted correctly

**Dependencies:** PORT-027

---

### PORT-030 · Content · Write project MDX files

**Summary:** Create MDX files for all three projects.

**Files to create:**
- `content/projects/ponovo.mdx`
- `content/projects/shelfwise.mdx`
- `content/projects/personal-portfolio.mdx`

**MDX body structure:**
- Intro paragraph
- `## The Problem`
- `## What I Built`
- `## Tech Stack` (brief rationale for choices, not just a list)
- `## Status / Outcome`

**Source data:**
- Ponovo (order: 1, active): Job application tracking, ponovo.app, Next.js/Drizzle/React Query/Clerk
- Shelfwise (order: 2, hackathon): Madhacks Fall 2024, grocery management, Next.js/FastAPI/Prisma/OpenAI
- Personal Portfolio (order: 3, active): This site, vishrut.tech

**Acceptance Criteria:**
- `getAllContent('projects')` returns all three sorted by `order`

**Dependencies:** PORT-027

---

### PORT-031 · Content · Migrate blog post

**Summary:** Migrate the existing blog post from the old portfolio with updated frontmatter.

**Source:** `/Users/vishrutagrawal/repos/personal-portfolio/content/blog/nextjs-data-fetching-mutations.mdx`

**File to create:**
- `content/blog/nextjs-data-fetching-mutations.mdx`

**Notes:**
- Copy body content, update frontmatter to match new schema
- Remove any Velite-specific fields
- Remove any Aceternity/MagicUI component imports from body

**Acceptance Criteria:**
- `getAllContent('blog')` returns this post
- Body renders without import errors

**Dependencies:** PORT-027

---

## Phase 7: Content Pages

---

### PORT-032 · Feature · Build `ExperienceCard` component

**Summary:** Card for displaying a work experience summary on the `/experience` index.

**Technical Notes:**
- Create `src/components/cards/experience-card.tsx`
- Built on shadcn `Card`
- Layout:
  - Top row: company name (Geist Sans `font-semibold`) + date range (Geist Mono `text-xs text-muted-foreground tracking-wide`) — `justify-between`
  - Role title (`text-sm text-muted-foreground`)
  - Summary paragraph (`text-sm`, 1-2 lines)
  - TechBadge row (flex-wrap)
  - `"View details →"` link to `/experience/[slug]`
- Props: `ExperienceFrontmatter`

**Files to create:**
- `src/components/cards/experience-card.tsx`

**Dependencies:** PORT-010, PORT-027

---

### PORT-033 · Feature · Build Experience index page (`/experience`)

**Summary:** Lists all work experiences.

**Technical Notes:**
- Create `src/app/experience/page.tsx` as Server Component
- `getAllContent('experience')`, render `SectionHeader` + vertical list of `ExperienceCard`
- Metadata: `title: 'Experience'`

**Files to create:**
- `src/app/experience/page.tsx`

**Dependencies:** PORT-009, PORT-029, PORT-032

---

### PORT-034 · Feature · Build Experience detail page (`/experience/[slug]`)

**Status:** ⬜ Open (experience cards currently expand inline / link out directly rather than routing to `/experience/[slug]`)

**Summary:** Full experience detail page driven by MDX.

**Technical Notes:**
- Create `src/app/experience/[slug]/page.tsx`
- `generateStaticParams` from `getAllContent('experience')`
- `generateMetadata`: `{ title: frontmatter.company }`
- Page structure:
  1. Back link: `← Experience` → `/experience`
  2. Detail header (inline): company name, role, date range + location (Geist Mono), website link, TechBadge row
  3. MDX body via dynamic import: `const { default: Post } = await import(\`@/content/experience/\${slug}.mdx\`)`
  4. Render `<Post />` in `max-w-2xl` container
- Add `loading.tsx` with `Skeleton`

**Files to create:**
- `src/app/experience/[slug]/page.tsx`
- `src/app/experience/[slug]/loading.tsx`

**Dependencies:** PORT-027, PORT-028, PORT-029, PORT-033

---

### PORT-035 · Feature · Build `ProjectCard` component

**Summary:** Card for a project on the `/projects` index.

**Technical Notes:**
- Create `src/components/cards/project-card.tsx`
- Layout:
  - Title (Geist Sans `font-semibold`) + optional `Badge` for `status === 'hackathon'`
  - Tagline (`text-sm text-muted-foreground`)
  - Summary (`text-sm`)
  - Date range (Geist Mono `text-xs`)
  - TechBadge row
  - Bottom: GitHub icon link + live site icon link + `"View details →"` text link
- Props: `ProjectFrontmatter`

**Files to create:**
- `src/components/cards/project-card.tsx`

**Dependencies:** PORT-010, PORT-027

---

### PORT-036 · Feature · Build Projects index page (`/projects`)

**Technical Notes:**
- `src/app/projects/page.tsx`
- `getAllContent('projects')`, `SectionHeader number="02" title="Projects"`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`
- Metadata: `title: 'Projects'`

**Files to create:**
- `src/app/projects/page.tsx`

**Dependencies:** PORT-009, PORT-030, PORT-035

---

### PORT-037 · Feature · Build Project detail page (`/projects/[slug]`)

**Status:** ⬜ Open (project cards currently expand inline / link out directly rather than routing to `/projects/[slug]`)

**Technical Notes:**
- `src/app/projects/[slug]/page.tsx`
- `generateStaticParams` from `getAllContent('projects')`
- `generateMetadata`: `{ title: frontmatter.title }`
- Structure: back link, detail header (title, tagline, status, GitHub/live Buttons, TechBadges), MDX body
- Add `loading.tsx`

**Files to create:**
- `src/app/projects/[slug]/page.tsx`
- `src/app/projects/[slug]/loading.tsx`

**Dependencies:** PORT-027, PORT-028, PORT-030, PORT-036

---

### PORT-038 · Feature · Build `BlogCard` component

**Technical Notes:**
- `src/components/cards/blog-card.tsx`
- Date (Geist Mono `text-xs`) + reading time, title, description, tags as `Badge variant="secondary"`, `"Read more →"` link
- Props: `BlogFrontmatter`

**Files to create:**
- `src/components/cards/blog-card.tsx`

**Dependencies:** PORT-027

---

### PORT-039 · Feature · Build Blog index page (`/blog`)

**Technical Notes:**
- `src/app/blog/page.tsx`
- `getAllContent('blog')`, `SectionHeader number="03" title="Writing"`
- Vertical list of `BlogCard`; friendly empty state if no posts
- Metadata: `title: 'Blog'`

**Files to create:**
- `src/app/blog/page.tsx`

**Dependencies:** PORT-009, PORT-031, PORT-038

---

### PORT-040 · Feature · Build Blog post page (`/blog/[slug]`)

**Technical Notes:**
- `src/app/blog/[slug]/page.tsx`
- `generateStaticParams` from `getAllContent('blog')`
- `generateMetadata`: `{ title: frontmatter.title, description: frontmatter.description }`
- Structure:
  1. Back link: `← Writing` → `/blog`
  2. Post header: title (Geist Sans `text-3xl font-bold`), date + reading time (Geist Mono), tags as `Badge`
  3. `Separator`
  4. MDX body in `max-w-2xl`
  5. `ReadingProgress` bar (`src/components/detail/reading-progress.tsx`) — `'use client'`, `position: fixed; top: 0`, thin `h-0.5`, `bg-primary`, width computed from `window.scrollY`
- Add `loading.tsx`

**Files to create:**
- `src/app/blog/[slug]/page.tsx`
- `src/app/blog/[slug]/loading.tsx`
- `src/components/detail/reading-progress.tsx`

**Dependencies:** PORT-027, PORT-028, PORT-031, PORT-039

---

## Phase 8: Polish

---

### PORT-041 · Feature · Add SEO files

**Technical Notes:**
- `src/app/robots.ts` — allow all, sitemap URL
- `src/app/sitemap.ts` — all static routes + dynamic slugs from `getAllContent`
- `src/lib/metadata.ts` — `siteMetadata` base object for reuse

**Files to create:**
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/lib/metadata.ts`

**Dependencies:** PORT-027, PORT-034, PORT-037, PORT-040

---

### PORT-042 · Feature · Build 404 page

**Technical Notes:**
- `src/app/not-found.tsx`
- Centered layout, static terminal-style `<pre>` block (not the interactive widget):
  ```
  bash: [path]: command not found
  ```
- `"← Back to home"` `Button`

**Files to create:**
- `src/app/not-found.tsx`

**Dependencies:** PORT-008

---

### PORT-043 · Feature · Responsive polish pass

**Checklist:**
- [ ] Header: nav links hidden on mobile (375px)
- [ ] Homepage: hero text scales cleanly
- [ ] Terminal: full width, no horizontal overflow
- [ ] Projects grid: 1-col mobile, 2-col md+
- [ ] Experience/Blog lists: adequate mobile padding
- [ ] Detail pages: `max-w-2xl` with correct horizontal padding
- [ ] No horizontal scroll at 375px on any page

**Dependencies:** All page tickets

---

## Phase 9: Terminal Creativity

Polish the terminal's personality — randomized responses, command flags, and more easter eggs.

---

### PORT-047 · Feature · Randomized easter egg responses

**Summary:** `sudo`, `exit`/`quit`, `rm`, `hello` pick from a response pool each time instead of returning the same line.

**Technical Notes:**
- Create `src/lib/terminal/response-pools.ts`:
  ```typescript
  export const POOLS = {
    sudo: [
      "Nice try.",
      "Access denied.",
      "sudo: you are not in the sudoers file. This incident will be reported.",
      "Error 418: I'm a teapot.",
      "lol no.",
    ],
    exit: [
      "There is no escape.",
      "You can check out any time you like, but you can never leave.",
      "exit 0 — just kidding.",
      "This terminal does not support that operation.",
      "Nice try.",
    ],
    rm: [
      "rm: /: Permission denied",
      "nice try, but no",
      "I wouldn't do that if I were you.",
      "Error: root filesystem is read-only",
    ],
    hello: [
      "hey 👋", "what's up?", "oh hi there", "hello, friend", "greetings, visitor", "yo",
    ],
  }
  export function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  ```
- Update handlers in `static-commands.ts` to use `pick(POOLS.x)`

**Files to create:** `src/lib/terminal/response-pools.ts`
**Files to modify:** `src/lib/terminal/static-commands.ts`
**Dependencies:** PORT-016

---

### PORT-048 · Feature · Command flags

**Status:** 🔄 Partial (`help --all` and `date --utc` are implemented; `skills --verbose` and `neofetch --no-logo` are not implemented)

**Summary:** `--` flag support on select commands.

**Technical Notes:**
- Parse flags in each handler: `const flags = new Set(args.filter(a => a.startsWith('--')))`
- Flags:
  - `skills --verbose` — adds `→ /experience` and `→ /projects` links as output lines
  - `neofetch --no-logo` — skips the ASCII box, outputs key-value pairs only
  - `help --all` — includes commands with `hiddenFromHelp: true`
  - `date --utc` — `new Date().toUTCString()` instead of local

**Files to modify:** `src/lib/terminal/static-commands.ts`
**Dependencies:** PORT-016

---

### PORT-049 · Feature · More easter egg commands

**Summary:** A handful of fun hidden commands, discoverable via `help --all`.

| Command | Output |
|---|---|
| `matrix` | 10 lines of random character strings, rapid-fire via async delays |
| `coffee` | ASCII coffee cup + `"Brewing... ☕"` |
| `hack` | 8 fake "hacking" lines (random hex, filenames) → `"Access granted. Welcome."` |
| `uname` | `Linux vishrut.tech 6.1.0 #1 SMP x86_64 GNU/Linux` |
| `ping vishrut.tech` | 4 simulated ping lines with random ms values → `"4 packets transmitted, 4 received"` |

All `hiddenFromHelp: true`. Visible only via `help --all`.

**Files to modify:**
- `src/lib/terminal/static-commands.ts`
- `src/lib/terminal/commands.ts`

**Dependencies:** PORT-047

---

## Ticket Summary

| ID | Status | Phase | Summary |
|---|---|---|---|
| PORT-001 | ✅ | 1 · Setup | Install npm dependencies |
| PORT-002 | ✅ | 1 · Setup | JetBrains Mono font |
| PORT-003 | ⬜ | 1 · Setup | `.env.example` template (file does not currently exist in repo) |
| PORT-004 | ✅ | 1 · Layout | next-themes setup |
| PORT-005 | ✅ | 1 · Layout | ThemeToggle component |
| PORT-006 | ✅ | 1 · Layout | Site header |
| PORT-007 | ✅ | 1 · Layout | Site footer |
| PORT-008 | ✅ | 1 · Layout | Wire root layout |
| PORT-009 | ✅ | 2 · Shared | SectionHeader component |
| PORT-010 | ✅ | 2 · Shared | TechBadge component |
| PORT-011 | ✅ | 3 · Homepage | Hero section |
| PORT-012 | ✅ | 3 · Homepage | Terminal section wrapper |
| PORT-013 | ✅ | 3 · Homepage | Assemble homepage |
| PORT-014 | ✅ | 4 · Terminal | Terminal types |
| PORT-015 | ✅ | 4 · Terminal | use-terminal hook |
| PORT-016 | ✅ | 4 · Terminal | Sync command registry |
| PORT-017 | ✅ | 4 · Terminal | Async command handlers (stubs) |
| PORT-018 | ✅ | 4 · Terminal | Terminal UI components |
| PORT-019 | ✅ | 4 · Terminal | Wire terminal to homepage |
| PORT-044 | ✅ | 4b · Games | Game infrastructure (context + overlay) |
| PORT-045 | ✅ | 4b · Games | Snake game module |
| PORT-046 | ✅ | 4b · Games | Wire snake to terminal |
| PORT-050 | ✅ | 4c · Games | Type system update (GameControls, GameConfig) |
| PORT-051 | ✅ | 4c · Games | Universal audio framework |
| PORT-052 | ✅ | 4c · Games | In-terminal GamePanel + registry update |
| PORT-053 | ✅ | 4c · Games | Context expansion (isMuted, isPaused, activeConfig) |
| PORT-054 | ✅ | 4c · Games | Snake per-game config (palette, sounds, controls) |
| PORT-055 | ✅ | 4c · Games | Universal PauseOverlay + title bar game mode |
| PORT-020 | ✅ | 5 · API | Spotify now-playing route |
| PORT-021 | ✅ | 5 · API | Weather route |
| PORT-022 | ✅ | 5 · API | Joke route |
| PORT-023 | ✅ | 5 · API | Crypto price route |
| PORT-024 | ✅ | 5 · API | Dictionary route |
| PORT-026 | ✅ | 6 · MDX | Configure Next.js for MDX |
| PORT-027 | ✅ | 6 · MDX | MDX content utilities |
| PORT-028 | ✅ | 6 · MDX | mdx-components styles |
| PORT-029 | ✅ | 6 · Content | Experience MDX files (placeholder TODOs remain) |
| PORT-030 | ✅ | 6 · Content | Project MDX files (placeholder TODOs remain) |
| PORT-031 | ✅ | 6 · Content | Migrate blog post |
| PORT-032 | ✅ | 7 · Pages | ExperienceCard component |
| PORT-033 | ✅ | 7 · Pages | Experience index page |
| PORT-034 | ⬜ | 7 · Pages | Experience detail page (cards currently expand inline / link out directly) |
| PORT-035 | ✅ | 7 · Pages | ProjectCard component |
| PORT-036 | ✅ | 7 · Pages | Projects index page |
| PORT-037 | ⬜ | 7 · Pages | Project detail page (cards currently expand inline / link out directly) |
| PORT-038 | ✅ | 7 · Pages | BlogCard component |
| PORT-039 | ✅ | 7 · Pages | Blog index page |
| PORT-040 | ✅ | 7 · Pages | Blog post page |
| PORT-041 | ✅ | 8 · Polish | SEO files |
| PORT-042 | ✅ | 8 · Polish | 404 page |
| PORT-043 | ⬜ | 8 · Polish | Responsive polish pass (verify 375px checklist) |
| PORT-047 | ✅ | 9 · Creativity | Randomized easter egg responses |
| PORT-048 | 🔄 | 9 · Creativity | Command flags (`help --all`, `date --utc` done; `skills --verbose`, `neofetch --no-logo` open) |
| PORT-049 | ✅ | 9 · Creativity | More easter egg commands |
