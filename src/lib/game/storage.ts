const STORAGE_KEY = 'arcade:2048';
const VERSION = 1;

export interface SavedTile {
	value: number;
	row: number;
	col: number;
}

export interface SavedGame {
	best: number;
	game: {
		tiles: SavedTile[];
		score: number;
		seed: string;
		rngState: number;
		moveCount: number;
	} | null;
}

const isCount = (value: unknown): value is number =>
	typeof value === 'number' && Number.isInteger(value) && value >= 0;

const isTile = (value: unknown, size: number): value is SavedTile => {
	if (typeof value !== 'object' || value === null) return false;
	const tile = value as Record<string, unknown>;
	return (
		isCount(tile.value) &&
		tile.value >= 2 &&
		(tile.value & (tile.value - 1)) === 0 &&
		isCount(tile.row) &&
		tile.row < size &&
		isCount(tile.col) &&
		tile.col < size
	);
};

function parseGame(value: unknown, size: number): SavedGame['game'] {
	if (typeof value !== 'object' || value === null) return null;
	const game = value as Record<string, unknown>;
	if (
		!Array.isArray(game.tiles) ||
		!game.tiles.every((tile) => isTile(tile, size)) ||
		!isCount(game.score) ||
		typeof game.seed !== 'string' ||
		!isCount(game.rngState) ||
		!isCount(game.moveCount)
	) {
		return null;
	}
	const cells = new Set(game.tiles.map((tile) => `${tile.row},${tile.col}`));
	if (cells.size !== game.tiles.length) return null;
	return {
		tiles: game.tiles,
		score: game.score,
		seed: game.seed,
		rngState: game.rngState,
		moveCount: game.moveCount
	};
}

/** Reads the saved game. Returns null when storage is unavailable or the data is invalid. */
export function loadSavedGame(size = 4): SavedGame | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const data = JSON.parse(raw) as Record<string, unknown>;
		if (data.version !== VERSION) return null;
		return { best: isCount(data.best) ? data.best : 0, game: parseGame(data.game, size) };
	} catch {
		return null;
	}
}

export function saveGame(saved: SavedGame): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, ...saved }));
	} catch {
		// Storage can be full or blocked (private browsing); the game still works without it.
	}
}
