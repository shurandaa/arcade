<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Props {
		score: number;
		gain: number;
		won: boolean;
		over: boolean;
	}

	let { score, gain, won, over }: Props = $props();

	let scoreMessage = $derived(gain > 0 ? `Plus ${gain}. Score ${score}.` : `Score ${score}.`);
	let outcome = $derived(
		over
			? `Game over. No moves left. Final score ${score}.`
			: won
				? 'You made 2048! Keep going to build a bigger tile.'
				: ''
	);
</script>

<!-- Score changes are announced quietly; the outcome is announced as a status message. -->
<p class="visually-hidden" aria-live="polite">{scoreMessage}</p>

<div role="status" class="status-region">
	{#if outcome}
		<p class="status" class:over transition:fly={{ y: -8, duration: 200 }}>{outcome}</p>
	{/if}
</div>

<style>
	.status-region {
		min-height: 3.25rem;
	}

	.status {
		margin: 0 0 var(--space-2);
		padding: var(--space-1) var(--space-2);
		border-left: 4px solid var(--tile-2048);
		background: var(--surface);
		font-weight: 650;
	}

	.status.over {
		border-left-color: var(--accent);
	}
</style>
