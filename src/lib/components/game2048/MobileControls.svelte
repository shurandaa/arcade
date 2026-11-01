<script lang="ts">
	import type { Direction } from '@shurandaa/arcade-core';

	interface Props {
		onmove: (direction: Direction) => void;
		disabled?: boolean;
	}

	let { onmove, disabled = false }: Props = $props();

	const buttons: { direction: Direction; symbol: string }[] = [
		{ direction: 'up', symbol: '↑' },
		{ direction: 'left', symbol: '←' },
		{ direction: 'right', symbol: '→' },
		{ direction: 'down', symbol: '↓' }
	];
</script>

<div class="controls" role="group" aria-label="Move tiles">
	{#each buttons as { direction, symbol } (direction)}
		<button
			type="button"
			class={direction}
			aria-label="Move {direction}"
			{disabled}
			onclick={() => onmove(direction)}
		>
			<span aria-hidden="true">{symbol}</span>
		</button>
	{/each}
</div>

<style>
	/* Phones and tablets only: desktop players use the arrow keys. */
	.controls {
		display: none;
	}

	@media (max-width: 700px), (hover: none) and (pointer: coarse) {
		.controls {
			display: grid;
			grid-template-areas:
				'. up .'
				'left down right';
			grid-template-columns: repeat(3, 64px);
			gap: var(--space-1);
			justify-content: center;
			margin-top: var(--space-3);
		}
	}

	button {
		min-width: 64px;
		min-height: 56px;
		border: 1px solid var(--accent);
		border-radius: var(--radius);
		background: var(--accent-light);
		color: var(--accent);
		font-size: 1.5rem;
		font-weight: 700;
		cursor: pointer;
		touch-action: manipulation;
	}

	button:active {
		background: var(--accent);
		color: var(--paper);
	}

	button:disabled {
		border-color: var(--line);
		background: var(--surface);
		color: var(--muted);
		cursor: not-allowed;
	}

	.up {
		grid-area: up;
	}

	.left {
		grid-area: left;
	}

	.down {
		grid-area: down;
	}

	.right {
		grid-area: right;
	}
</style>
