<script lang="ts">
	import type { Direction } from '@shurandaa/arcade-core';
	import { game } from '#lib/game/game2048.svelte.ts';
	import { directionFromKey } from '#lib/game/input.ts';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Board from './Board.svelte';
	import GameStatus from './GameStatus.svelte';
	import MobileControls from './MobileControls.svelte';
	import ScorePanel from './ScorePanel.svelte';
	import SeedForm from './SeedForm.svelte';

	onMount(() => {
		if (!game.restore()) game.newGame();
	});

	function move(direction: Direction) {
		game.move(direction);
	}

	function handleKey(event: KeyboardEvent) {
		const direction = directionFromKey(event);
		if (!direction) return;
		event.preventDefault();
		move(direction);
	}

	function newGame(seed?: string) {
		game.newGame(seed);
	}
</script>

<svelte:window onkeydown={handleKey} />

<div class="game">
	<noscript><p>2048 needs JavaScript. The crossword works without it.</p></noscript>
	<ScorePanel
		score={game.score}
		best={game.best}
		gain={game.lastGain}
		moveCount={game.moveCount}
		onnewgame={() => newGame()}
	/>
	<GameStatus score={game.score} gain={game.lastGain} won={game.won} over={game.over} />

	<Board tiles={game.tiles} board={game.board} onmove={move}>
		{#snippet overlay()}
			{#if game.over}
				<div class="overlay" transition:fade={{ duration: 250 }}>
					<p>No moves left</p>
					<!-- Focus moves here so keyboard players can restart straight away. -->
					<button
						type="button"
						class="button"
						{@attach (button) => button.focus()}
						onclick={() => newGame()}>Try again</button
					>
				</div>
			{/if}
		{/snippet}
	</Board>

	<MobileControls onmove={move} disabled={!game.ready || game.over} />
	<SeedForm seed={game.seed} onstart={newGame} />
</div>

<style>
	.game {
		width: 100%;
		max-width: 30rem;
	}

	.overlay {
		position: absolute;
		inset: 0;
		z-index: 3;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: var(--space-2);
		background: rgb(255 253 248 / 0.85);
		border-radius: inherit;
	}

	.overlay p {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--text-heading);
	}
</style>
