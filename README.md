# The Arcade

Shuran Zhao's small personal arcade, built with SvelteKit and Svelte 5. It includes:

- **2048** (`/2048`): keyboard, swipe, and on-screen controls, animated tiles, saved progress, and seeded games you can replay.
- **Mini crossword** (`/crossword`): the Project 1 word square, migrated to Svelte components.
- **Home**, **About**, and **Contact** pages migrated from Project 1.

The 2048 rules come from the separately published package [`@shurandaa/arcade-core`](https://www.npmjs.com/package/@shurandaa/arcade-core) ([repository](https://github.com/shurandaa/arcade-core)). This app handles rendering, input, animation, and saving.

## Run locally

```sh
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests for the game state
npm run check      # svelte-check / TypeScript
npm run build      # static site in build/
```

## Project layout

```
src/
  app.css                     design tokens (color, type, spacing, tile colors) and base styles
  routes/                     one folder per page; +layout.svelte holds the header and footer
  lib/
    components/
      layout/                 SiteHeader, SiteFooter, PageIntro
      home/ about/ contact/   page sections
      crossword/              CrosswordGrid, ClueList
      game2048/               Game2048, Board, Tile, ScorePanel, GameStatus, MobileControls, SeedForm
    game/
      game2048.svelte.ts      shared game state ($state / $derived), built on arcade-core
      storage.ts              localStorage save and restore, with validation
      input.ts                arrow-key mapping and the swipe attachment
    data/                     site content: nav, games, profile, crossword clues
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`. It type-checks, tests, builds with `adapter-static`, and publishes `build/` to GitHub Pages. The workflow sets `BASE_PATH` to `/<repo-name>`, so the site works at `https://<user>.github.io/<repo>/`.
