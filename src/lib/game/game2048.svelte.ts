import {
	createBoard,
	createSeededRng,
	hasMoves,
	maxTile,
	slide,
	spawnTile,
	type Board,
	type Direction
} from '@shurandaa/arcade-core';
import { loadSavedGame, saveGame, type SavedGame } from './storage';

export const BOARD_SIZE = 4;
export const WIN_VALUE = 2048;

/**
 * How a tile came to be where it is after the latest move:
 * - `spawned`: newly placed by the game
 * - `merged`: created by combining two tiles
 * - `moved`: an existing tile that slid (or stayed)
 * - `consumed`: one of the two tiles that formed a merge; kept for one move so
 *   it can visibly slide into the merged tile, then removed
 */
export type TileKind = 'spawned' | 'merged' | 'moved' | 'consumed';

export interface Tile {
	id: number;
	value: number;
	row: number;
	col: number;
	kind: TileKind;
}

function toBoard(tiles: Tile[]): Board {
	const board = createBoard(BOARD_SIZE) as number[][];
	for (const tile of tiles) {
		if (tile.kind !== 'consumed') board[tile.row][tile.col] = tile.value;
	}
	return board;
}

function randomSeed(): string {
	return Math.random().toString(36).slice(2, 8);
}

/**
 * The state of one 2048 game. Rules live in `@shurandaa/arcade-core`; this
 * class tracks tile identity (for keyed rendering and animation), score, and
 * persistence.
 */
export class Game2048 {
	tiles = $state<Tile[]>([]);
	score = $state(0);
	best = $state(0);
	/** Points earned by the most recent move. */
	lastGain = $state(0);
	moveCount = $state(0);
	/** The seed of the current game; replaying it with the same moves gives the same game. */
	seed = $state('');
	/** False until the game has been restored or started in the browser. */
	ready = $state(false);

	board = $derived(toBoard(this.tiles));
	highestTile = $derived(maxTile(this.board));
	won = $derived(this.highestTile >= WIN_VALUE);
	over = $derived(this.ready && !hasMoves(this.board));

	#rngState = 0;
	#nextId = 1;

	/** Restores the saved game, if there is one. Returns whether a game was restored. */
	restore(): boolean {
		if (this.ready) return true;
		const saved = loadSavedGame();
		if (!saved) return false;

		this.best = saved.best;
		if (!saved.game) return false;

		const { tiles, score, seed, rngState, moveCount } = saved.game;
		this.tiles = tiles.map((tile) => ({ ...tile, id: this.#nextId++, kind: 'moved' }));
		this.score = score;
		this.seed = seed;
		this.moveCount = moveCount;
		this.lastGain = 0;
		this.#rngState = rngState;
		this.ready = true;
		return true;
	}

	/** Loads only the best score, for pages that show it without playing. */
	restoreBest(): void {
		const saved = loadSavedGame();
		if (saved) this.best = Math.max(this.best, saved.best);
	}

	/** Starts a new game. Pass a seed to replay a specific game. */
	newGame(seed?: string): void {
		this.seed = seed?.trim() || randomSeed();
		this.#rngState = createSeededRng(this.seed).state;
		this.tiles = [];
		this.score = 0;
		this.lastGain = 0;
		this.moveCount = 0;
		this.#spawn();
		this.#spawn();
		this.ready = true;
		this.#save();
	}

	/** Slides tiles toward `direction`. Returns false when the move changes nothing. */
	move(direction: Direction): boolean {
		if (!this.ready) return false;

		const result = slide(this.board, direction);
		if (!result.changed) return false;

		const live = this.tiles.filter((tile) => tile.kind !== 'consumed');
		const next: Tile[] = [];
		const created: Tile[] = [];

		for (const { from, to, merged } of result.moves) {
			const tile = live.find((t) => t.row === from.row && t.col === from.col)!;
			next.push({ ...tile, row: to.row, col: to.col, kind: merged ? 'consumed' : 'moved' });

			// Both halves of a merge report the same target; create the merged tile once.
			if (merged && !created.some((t) => t.row === to.row && t.col === to.col)) {
				const value = result.board[to.row][to.col];
				created.push({ id: this.#nextId++, value, row: to.row, col: to.col, kind: 'merged' });
			}
		}
		next.push(...created);

		this.tiles = next;
		this.score += result.score;
		this.best = Math.max(this.best, this.score);
		this.lastGain = result.score;
		this.moveCount++;
		this.#spawn();
		this.#save();
		return true;
	}

	#spawn(): void {
		const rng = createSeededRng(this.seed, this.#rngState);
		const { position, value } = spawnTile(this.board, rng);
		this.#rngState = rng.state;
		if (position && value) {
			this.tiles.push({ id: this.#nextId++, value, ...position, kind: 'spawned' });
		}
	}

	#save(): void {
		const game: SavedGame['game'] = {
			tiles: this.tiles
				.filter((tile) => tile.kind !== 'consumed')
				.map(({ value, row, col }) => ({ value, row, col })),
			score: this.score,
			seed: this.seed,
			rngState: this.#rngState,
			moveCount: this.moveCount
		};
		saveGame({ best: this.best, game });
	}
}

/** One shared game, so its best score is available on every page. */
export const game = new Game2048();
