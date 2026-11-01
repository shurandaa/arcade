<script lang="ts">
	import { resolve } from '$app/paths';
	import type { GameSlot } from '#lib/data/site.ts';
	import type { Snippet } from 'svelte';

	interface Props {
		game: GameSlot;
		index: number;
		/** Extra content under the description, such as a best score. */
		children?: Snippet;
	}

	let { game, index, children }: Props = $props();

	let ready = $derived(game.href !== undefined);
	let label = $derived(String(index + 1).padStart(2, '0'));
</script>

<li class:ready>
	<span class="slot">{label} / {ready ? 'Ready to play' : 'Future game'}</span>
	<h3>{game.title}</h3>
	<p>{game.description}</p>
	{@render children?.()}
	{#if game.href}
		<a href={resolve(game.href)}>{game.linkLabel}</a>
	{/if}
</li>

<style>
	li {
		padding: var(--space-3) var(--space-2);
		border-bottom: 1px solid var(--line);
	}

	li.ready {
		background: linear-gradient(var(--accent-light), transparent 70%);
	}

	.slot {
		color: var(--muted);
		font-size: var(--text-small);
		font-variant-numeric: tabular-nums;
	}

	h3 {
		margin-top: var(--space-2);
	}

	p {
		color: var(--muted);
		font-size: var(--text-small);
		margin-bottom: 0;
	}

	a {
		display: inline-flex;
		align-items: center;
		min-height: var(--target-size);
	}
</style>
