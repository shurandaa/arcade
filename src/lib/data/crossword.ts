/** The five answers form a word square: row n and column n spell the same word. */
export const answers = ['HEART', 'EMBER', 'ABUSE', 'RESIN', 'TREND'];

export interface Clue {
	number: number;
	text: string;
}

export const acrossClues: Clue[] = [
	{ number: 1, text: 'Organ that keeps your blood moving' },
	{ number: 6, text: 'A glowing piece left after a fire' },
	{ number: 7, text: 'Mistreatment of a person or thing' },
	{ number: 8, text: 'Sticky substance produced by some trees' },
	{ number: 9, text: 'A general direction of change' }
];

export const downClues: Clue[] = [
	{ number: 1, text: 'What a Valentine shape represents' },
	{ number: 2, text: 'A coal that still glows' },
	{ number: 3, text: 'To use something in a harmful way' },
	{ number: 4, text: 'Tree secretion used in varnish' },
	{ number: 5, text: 'A style gaining popularity' }
];

/** Grid width including the blocked border column and row. */
export const GRID_SIZE = 6;

export interface CrosswordCell {
	row: number;
	col: number;
	/** `null` for blocked squares. */
	letter: string | null;
	/** Clue number printed in the corner, if this square starts an answer. */
	number?: number;
	across?: number;
	down?: number;
}

/**
 * Builds the 6 × 6 grid: answers fill the top-left 5 × 5 and the last row and
 * column are blocked. Clue numbers follow standard crossword order.
 */
export function buildGrid(): CrosswordCell[] {
	const size = answers.length;
	const cells: CrosswordCell[] = [];
	let next = 1;
	const acrossStart: number[] = [];
	const downStart: number[] = [];

	for (let row = 0; row < GRID_SIZE; row++) {
		for (let col = 0; col < GRID_SIZE; col++) {
			if (row >= size || col >= size) {
				cells.push({ row, col, letter: null });
				continue;
			}
			const startsAcross = col === 0;
			const startsDown = row === 0;
			const number = startsAcross || startsDown ? next++ : undefined;
			if (startsAcross) acrossStart[row] = number!;
			if (startsDown) downStart[col] = number!;
			cells.push({
				row,
				col,
				letter: answers[row][col],
				number,
				across: acrossStart[row],
				down: downStart[col]
			});
		}
	}
	return cells;
}
