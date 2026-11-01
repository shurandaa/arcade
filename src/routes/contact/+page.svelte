<script lang="ts">
	import { resolve } from '$app/paths';
	import ContactList from '#lib/components/contact/ContactList.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import { contacts } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Contact | The Arcade</title>
</svelte:head>

<PageIntro eyebrow="Stay in touch" title="Let’s connect.">
	For professional inquiries, reach me by email or find my work on GitHub and LinkedIn.
</PageIntro>

<section aria-labelledby="contact-title">
	<h2 id="contact-title">Contact directory</h2>
	<ContactList {contacts} />
	<p>
		You can also <a href={resolve('/about')}>read about my work</a>, play
		<a href={resolve('/2048')}>2048</a>, or try <a href={resolve('/crossword')}>the crossword</a>.
	</p>
</section>
