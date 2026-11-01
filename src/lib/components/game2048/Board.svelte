<script lang="ts">
	import type { Board, Direction } from '@shurandaa/arcade-core';
	import type { Tile as TileState } from '#lib/game/game2048.svelte.ts';
	import { swipe } from '#lib/game/input.ts';
	import type { Snippet } from 'svelte';
	import Tile from './Tile.svelte';

	interface Props {
		tiles: TileState[];
		board: Board;
		onmove: (direction: Direction) => void;
		/** Overlay shown on top of the board, such as the game-over message. */
		overlay?: Snippet;
	}

	let { tiles, board, onmove, overlay }: Props = $props();

	let size = $derived(board.length);
</script>

<div class="board" style:--size={size} {@attach swipe(onmove)}>
	{#each { length: size * size }, index (index)}
		<div class="cell" aria-hidden="true"></div>
	{/each}

	{#each tiles as tile (tile.id)}
		<Tile {tile} />
	{/each}

	{@render overlay?.()}
</div>

<!-- The board above is visual only; screen readers get the same grid as a table. -->
<table class="visually-hidden">
	<caption>Current board, row by row. Empty means no tile.</caption>
	<tbody>
		{#each board as row, r (r)}
			<tr>
				<th scope="row">Row {r + 1}</th>
				{#each row as value, c (c)}
					<td>{value === 0 ? 'empty' : value}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.board {
		--gap: clamp(6px, 2vw, 12px);
		--cell: calc((100% - (var(--size) + 1) * var(--gap)) / var(--size));
		position: relative;
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		gap: var(--gap);
		padding: var(--gap);
		width: 100%;
		aspect-ratio: 1;
		container-type: inline-size;
		background: var(--line);
		border: 1px solid var(--line);
		border-radius: calc(var(--radius) * 2);
		/* Let swipes move tiles instead of scrolling the page. */
		touch-action: none;
		user-select: none;
	}

	.cell {
		background: var(--surface);
		border-radius: var(--radius);
	}
</style>
