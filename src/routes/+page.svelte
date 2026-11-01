<script lang="ts">
	import GameCard from '#lib/components/home/GameCard.svelte';
	import Hero from '#lib/components/home/Hero.svelte';
	import { games } from '#lib/data/site.ts';
	import { game } from '#lib/game/game2048.svelte.ts';
	import { onMount } from 'svelte';

	onMount(() => game.restoreBest());
</script>

<svelte:head>
	<title>Welcome | The Arcade</title>
</svelte:head>

<Hero />

<section aria-labelledby="collection-title">
	<p class="eyebrow">The collection</p>
	<h2 id="collection-title">Two games now. Room for four.</h2>
	<ul class="game-list">
		{#each games as slot, index (slot.title)}
			<GameCard game={slot} {index}>
				{#if slot.href === '/2048' && game.best > 0}
					<p class="best">Your best: <strong>{game.best}</strong></p>
				{/if}
			</GameCard>
		{/each}
	</ul>
</section>

<style>
	.game-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-top: 1px solid var(--line);
	}

	.best {
		margin: var(--space-1) 0 0;
		font-size: var(--text-small);
	}

	@media (max-width: 900px) {
		.game-list {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 380px) {
		.game-list {
			grid-template-columns: 1fr;
		}
	}
</style>
