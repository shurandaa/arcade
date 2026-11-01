<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { navItems } from '#lib/data/site.ts';

	// Route ids ('/', '/2048', ...) don't include the base path, so they match nav items directly.
	let currentRoute = $derived(page.route.id);
</script>

<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
	<nav class="navigation" aria-label="Main navigation">
		<a class="brand" href={resolve('/')}>
			<img src={asset('mark.svg')} width="32" height="32" alt="" />
			<span>The Arcade <small>Shuran Zhao’s corner</small></span>
		</a>
		<ul>
			{#each navItems as item (item.href)}
				<li>
					<a
						href={resolve(item.href)}
						aria-current={item.href === currentRoute ? 'page' : undefined}>{item.label}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.skip-link {
		position: fixed;
		top: -6rem;
		left: 1rem;
		padding: 1rem;
		background: var(--paper);
		z-index: 5;
	}

	.skip-link:focus {
		top: 0.5rem;
	}

	.site-header {
		position: sticky;
		top: 0;
		z-index: 2;
		background: var(--paper);
		border-bottom: 1px solid var(--line);
	}

	.navigation {
		max-width: var(--page-width);
		margin: auto;
		padding: var(--space-2) var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--ink);
		font-weight: 750;
		text-decoration: none;
		min-height: var(--target-size);
	}

	.brand small {
		display: block;
		color: var(--muted);
		font-size: 0.75rem;
		font-weight: 400;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
		gap: var(--space-1);
	}

	li a {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: var(--target-size);
		padding: 0.5rem 0.85rem;
		border-radius: var(--radius);
		text-decoration: none;
		color: var(--ink);
	}

	li a:hover {
		background: var(--surface);
	}

	a[aria-current='page'] {
		background: var(--accent-light);
		color: var(--accent);
		font-weight: 700;
	}

	@media (max-width: 700px) {
		.navigation {
			padding: var(--space-1) var(--space-2);
			flex-direction: column;
			align-items: flex-start;
			gap: 0;
		}

		ul {
			width: 100%;
			gap: 0;
		}

		li {
			flex: 1;
		}

		li a {
			padding: 0.5rem 0.25rem;
			font-size: var(--text-small);
		}
	}

	@media (max-height: 500px) {
		.site-header {
			position: static;
		}
	}
</style>
