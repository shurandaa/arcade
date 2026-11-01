<script lang="ts">
	import '../app.css';
	import { asset } from '$app/paths';
	import SiteFooter from '#lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={asset('mark.svg')} />
	<meta
		name="description"
		content="A small personal arcade with 2048, a hand-crafted mini crossword, and room for more games."
	/>
</svelte:head>

<SiteHeader />
<main id="main" tabindex="-1">
	{@render children()}
</main>
<SiteFooter />
