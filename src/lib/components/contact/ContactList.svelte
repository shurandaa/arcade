<script lang="ts">
	interface Contact {
		label: string;
		text: string;
		href: string;
	}

	interface Props {
		contacts: Contact[];
	}

	let { contacts }: Props = $props();
</script>

<ul>
	{#each contacts as contact (contact.label)}
		<li>
			<strong>{contact.label}</strong>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external and mailto links -->
			<a href={contact.href}>{contact.text}</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: var(--space-4) 0;
		padding: 0;
		list-style: none;
		max-width: 720px;
	}

	li {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-2);
		padding: var(--space-3) 0;
		border-top: 1px solid var(--line);
	}

	li:last-child {
		border-bottom: 1px solid var(--line);
	}

	strong::before {
		content: '— ';
	}

	a {
		display: inline-flex;
		align-items: center;
		min-height: var(--target-size);
		overflow-wrap: anywhere;
	}
</style>
