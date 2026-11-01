import { describe, expect, it } from 'vitest';
import { Game2048, type Tile } from './game2048.svelte.ts';

function setTiles(game: Game2048, values: number[][]) {
	const tiles: Tile[] = [];
	values.forEach((row, r) =>
		row.forEach((value, c) => {
			if (value) tiles.push({ id: tiles.length + 1000, value, row: r, col: c, kind: 'moved' });
		})
	);
	game.tiles = tiles;
}

describe('Game2048', () => {
	it('starts with two tiles', () => {
		const game = new Game2048();
		game.newGame('start');
		expect(game.tiles).toHaveLength(2);
		expect(game.score).toBe(0);
	});

	it('replays the same game from the same seed', () => {
		const play = () => {
			const game = new Game2048();
			game.newGame('replay');
			for (const direction of ['left', 'down', 'right', 'up', 'left'] as const) {
				game.move(direction);
			}
			return game.board;
		};
		expect(play()).toEqual(play());
	});

	it('scores merges and spawns exactly one tile', () => {
		const game = new Game2048();
		game.newGame('score');
		setTiles(game, [
			[2, 2, 4, 4],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]);
		expect(game.move('left')).toBe(true);
		expect(game.score).toBe(12);
		expect(game.lastGain).toBe(12);
		expect(game.board[0].slice(0, 2)).toEqual([4, 8]);
		expect(game.board.flat().filter((v) => v !== 0)).toHaveLength(3);
	});

	it('keeps merged-away tiles for one move so they can animate, with new ids for merged tiles', () => {
		const game = new Game2048();
		game.newGame('ids');
		setTiles(game, [
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]);
		game.move('left');
		expect(game.tiles.filter((t) => t.kind === 'consumed').map((t) => t.id)).toEqual([1000, 1001]);
		const merged = game.tiles.find((t) => t.kind === 'merged')!;
		expect(merged).toMatchObject({ value: 4, row: 0, col: 0 });
		expect(merged.id).not.toBe(1000);
	});

	it('ignores a move that changes nothing', () => {
		const game = new Game2048();
		game.newGame('noop');
		setTiles(game, [
			[2, 4, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]);
		expect(game.move('left')).toBe(false);
		expect(game.tiles).toHaveLength(2);
		expect(game.moveCount).toBe(0);
	});

	it('reports a win at 2048 and keeps playing', () => {
		const game = new Game2048();
		game.newGame('win');
		setTiles(game, [
			[1024, 1024, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]);
		game.move('left');
		expect(game.won).toBe(true);
		expect(game.over).toBe(false);
		expect(game.move('right')).toBe(true);
	});

	it('is over only when no direction can move', () => {
		const game = new Game2048();
		game.newGame('over');
		setTiles(game, [
			[2, 4, 2, 4],
			[4, 2, 4, 2],
			[2, 4, 2, 4],
			[4, 2, 4, 4]
		]);
		expect(game.over).toBe(false);
		setTiles(game, [
			[2, 4, 2, 4],
			[4, 2, 4, 2],
			[2, 4, 2, 4],
			[4, 2, 4, 2]
		]);
		expect(game.over).toBe(true);
	});
});
