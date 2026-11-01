<script lang="ts">
	import type { Tile } from '#lib/game/game2048.svelte.ts';
	import { backOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	interface Props {
		tile: Tile;
	}

	let { tile }: Props = $props();

	/** Matches the slide duration in the CSS below, so new tiles appear once others stop. */
	const SLIDE_MS = 110;

	let colorKey = $derived(tile.value > 2048 ? 'super' : String(tile.value));
	let lightText = $derived(tile.value >= 128 && tile.value <= 1024);
	let digits = $derived(String(tile.value).length);
</script>

<div
	class="tile"
	class:consumed={tile.kind === 'consumed'}
	class:merged={tile.kind === 'merged'}
	style:--row={tile.row}
	style:--col={tile.col}
	aria-hidden="true"
>
	<div
		class="face"
		class:light-text={lightText}
		class:super={tile.value > 2048}
		style:background="var(--tile-{colorKey})"
		style:--digits={digits}
		in:scale={tile.kind === 'merged'
			? { start: 0.7, duration: 180, delay: SLIDE_MS, easing: backOut }
			: { start: 0, duration: 150, delay: SLIDE_MS }}
	>
		{tile.value}
	</div>
</div>

<style>
	.tile {
		position: absolute;
		top: var(--gap);
		left: var(--gap);
		width: var(--cell);
		height: var(--cell);
		z-index: 1;
		transform: translate(
			calc(var(--col) * (100% + var(--gap))),
			calc(var(--row) * (100% + var(--gap)))
		);
		transition: transform 110ms ease-in-out;
	}

	.consumed {
		z-index: 0;
	}

	.merged {
		z-index: 2;
	}

	.face {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		border-radius: var(--radius);
		box-shadow: inset 0 0 0 1px rgb(23 79 64 / 0.2);
		color: var(--ink);
		font-weight: 750;
		font-variant-numeric: tabular-nums;
		/* Shrink long numbers so they always fit; cqi is 1% of the board's width. */
		font-size: clamp(0.9rem, calc(28cqi / max(var(--digits), 2.2)), 3rem);
		line-height: 1;
	}

	.merged .face {
		animation: glow 450ms ease-out 110ms backwards;
	}

	@keyframes glow {
		from {
			box-shadow: 0 0 0 5px var(--highlight);
		}
		to {
			box-shadow: 0 0 0 0 transparent;
		}
	}

	.light-text {
		color: var(--paper);
	}

	.super {
		color: var(--highlight);
	}
</style>
