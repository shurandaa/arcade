# Project 2 writeup

## What went into the package, and what stayed in the app?

`@shurandaa/arcade-core` holds everything that a 2048 game needs regardless of how it is displayed: sliding and merging (`move`, `slide`), placing new tiles (`spawn`, `spawnTile`), detecting invalid moves and the end of the game (`canMove`, `hasMoves`), and, since 1.1.0, a seeded random number generator. The package has no Svelte, DOM, or browser dependency and is tested in Node with Vitest. The app keeps everything about presentation and persistence: tile identity for keyed rendering, animation, keyboard/touch input, the score display, localStorage, and the seed form.

The boundary I was least sure about was scoring and tile movement. The assignment dropped `score()` from the required exports, but the UI still needs to know how many points a move earned and where each tile went in order to animate it. Recomputing that in the app would duplicate the merge rules, so the package exposes `slide()`, which returns the new board plus `score`, `changed`, and a list of `{ from, to, merged }` moves; `move()` and `canMove()` are thin wrappers around it. Tile ids stayed in the app, because ids are a rendering concern and the package's boards stay plain number arrays.

## Pros and cons of migrating Project 1 to Svelte

Benefits: the navigation is now written once in `SiteHeader` instead of copied into every HTML file with different relative paths, and the current page is highlighted automatically. The crossword grid is generated from the five answer words, so the play grid and the solution grid can't drift apart, and the clue lists are one `ClueList` component used four times. Component-scoped styles replaced one large shared stylesheet, while the design tokens stayed global in `app.css`.

Costs: the site now needs a build step, Node, and JavaScript to hydrate; the static HTML is still prerendered, so content pages work without JS, but 2048 does not. The crossword deliberately kept the native `<details>` reveal from Project 1, since it already worked without scripts. Deployment also became more involved (a GitHub Actions workflow and a base path for GitHub Pages).

## Keeping the library and the app compatible

The package follows semantic versioning and records every release in its CHANGELOG; 1.1.0 only added exports, so the app's `^1.1.0` range picks up compatible fixes but never a breaking 2.0.0. The package ships TypeScript declarations, so `npm run check` in the app fails if an export changes shape. The package has its own test suite (move/merge edge cases, immutability, spawn, seed reproducibility), and the app has tests for its game-state class that exercise the package through real calls. During development I used a local link to the package; the deployed site installs the published version from the npm registry via `package-lock.json`.

## Learning Svelte

- SvelteKit 3 differs from many tutorials: config lives in `vite.config.ts`, `$lib` became the `#lib` subpath import (with file extensions), and links use `resolve()` from `$app/paths`.
- Choosing `$derived` instead of `$effect`: `board`, `won`, and `over` are all derived from the tile list, so there is nothing to keep in sync.
- Making merged tiles visibly slide into each other: the two source tiles are kept for one extra move as "consumed" tiles underneath the new merged tile.

## With more time

Some side work, for example, an undo button, a daily seed shared by everyone, a high-score history, auto-advancing focus and answer checking in the crossword, or Playwright end-to-end tests in CI.

## Hours spent

4 hours.

## Assumptions

- New tiles are 2 with 90% probability and 4 with 10%; `spawn` on a full board returns an unchanged copy rather than throwing.
- Malformed boards or unknown directions throw a `TypeError` from the package.
- Merges resolve from the edge tiles move toward: `[2, 2, 2, 0]` moved right becomes `[0, 0, 2, 4]`.
- Winning shows a message but never blocks play; the game ends only when `hasMoves` is false.
- The best score updates live during a game, and it is saved together with the current board in localStorage.
- Every game uses a seed (random unless you enter one), so any game can be replayed by entering its seed again.
- On-screen arrow buttons appear on narrow screens and touch devices; swiping works everywhere.

## AI usage disclosure

Used AI to come up with the design work and debug when blocked.
