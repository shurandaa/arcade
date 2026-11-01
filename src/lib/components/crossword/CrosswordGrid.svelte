<script lang="ts">
	import { GRID_SIZE, type CrosswordCell } from '#lib/data/crossword.ts';

	interface Props {
		cells: CrosswordCell[];
		/** `play` renders inputs; `solution` renders the answer letters. */
		mode: 'play' | 'solution';
	}

	let { cells, mode }: Props = $props();

	const cellId = (cell: CrosswordCell) => `cell-${cell.row + 1}-${cell.col + 1}`;
	const describe = (cell: CrosswordCell) =>
		`Row ${cell.row + 1}, column ${cell.col + 1}; ${cell.across} Across, ${cell.down} Down`;
</script>

<div class="grid" class:solution={mode === 'solution'} style:--size={GRID_SIZE}>
	{#each cells as cell (`${cell.row}-${cell.col}`)}
		{#if cell.letter === null}
			<div class="blocked" aria-hidden="true"></div>
		{:else}
			<div class="cell">
				{#if cell.number}
					<span class="number" aria-hidden="true">{cell.number}</span>
				{/if}
				{#if mode === 'play'}
					<label class="visually-hidden" for={cellId(cell)}>{describe(cell)}</label>
					<input
						id={cellId(cell)}
						name={cellId(cell)}
						type="text"
						maxlength="1"
						autocomplete="off"
						autocapitalize="characters"
						spellcheck="false"
					/>
				{:else}
					<span class="letter">{cell.letter}</span>
				{/if}
			</div>
		{/if}
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), minmax(44px, 1fr));
		gap: 2px;
		background: var(--ink);
		border: 2px solid var(--ink);
		width: 100%;
		max-width: 380px;
	}

	.cell {
		position: relative;
		aspect-ratio: 1;
		min-width: 44px;
		min-height: 44px;
		background: var(--paper);
	}

	.blocked {
		background: var(--ink);
		aspect-ratio: 1;
	}

	.number {
		position: absolute;
		top: 1px;
		left: 4px;
		font-size: 0.75rem;
		line-height: 1.2;
		pointer-events: none;
	}

	input {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 44px;
		padding: 10px 0 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		color: var(--ink);
		text-align: center;
		font: 600 1.5rem/1 var(--font-body);
		text-transform: uppercase;
	}

	.cell:focus-within {
		background: var(--accent-light);
	}

	input:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: -3px;
	}

	.letter {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding-top: 10px;
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
