<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		eyebrow: string;
		title: string;
		/** Optional id for the paragraph, so other elements can reference it with aria-describedby. */
		descriptionId?: string;
		children?: Snippet;
	}

	let { eyebrow, title, descriptionId, children }: Props = $props();
</script>

<header>
	<p class="eyebrow">{eyebrow}</p>
	<h1>{title}</h1>
	{#if children}
		<p id={descriptionId}>{@render children()}</p>
	{/if}
</header>

<style>
	header {
		margin-bottom: var(--space-5);
	}

	header p:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 700px) {
		header {
			margin-bottom: var(--space-4);
		}
	}
</style>
