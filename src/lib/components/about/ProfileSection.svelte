<script lang="ts">
	import type { ProfileEntry } from '#lib/data/profile.ts';

	interface Props {
		title: string;
		entries: ProfileEntry[];
		/** Emphasise the detail line (used for job titles). */
		strongDetail?: boolean;
	}

	let { title, entries, strongDetail = false }: Props = $props();
</script>

<section>
	<h2>{title}</h2>
	{#each entries as entry (entry.title)}
		<h3>{entry.title}</h3>
		<p>
			{#if strongDetail}<strong>{entry.detail}</strong>{:else}{entry.detail}{/if}
			{#if entry.description}<br />{entry.description}{/if}
		</p>
	{/each}
</section>

<style>
	section {
		margin-bottom: var(--space-4);
	}
</style>
