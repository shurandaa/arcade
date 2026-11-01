<script lang="ts">
	import type { Clue } from '#lib/data/crossword.ts';

	interface Props {
		title: string;
		clues: Clue[];
		/** Show the answer instead of the clue text. */
		answers?: string[];
	}

	let { title, clues, answers }: Props = $props();
</script>

<section>
	<h2>{title}</h2>
	<ol>
		{#each clues as clue, i (clue.number)}
			<li value={clue.number}>
				{#if answers}
					{answers[i]}
				{:else}
					{clue.text} <span class="length">(5)</span>
				{/if}
			</li>
		{/each}
	</ol>
</section>

<style>
	ol {
		margin: 0;
		padding-left: var(--space-3);
	}

	li {
		padding-left: 0.25rem;
		margin-bottom: var(--space-3);
	}

	li::marker {
		color: var(--accent);
		font-weight: 700;
	}

	.length {
		color: var(--muted);
		white-space: nowrap;
	}
</style>
