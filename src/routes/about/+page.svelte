<script lang="ts">
	import ProfileSection from '#lib/components/about/ProfileSection.svelte';
	import ProjectNotebook from '#lib/components/about/ProjectNotebook.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import { education, experience } from '#lib/data/profile.ts';
</script>

<svelte:head>
	<title>About | The Arcade</title>
</svelte:head>

<PageIntro eyebrow="Behind the arcade" title="A place for curious minds.">
	I’m Shuran Zhao, a computer science graduate student at Northeastern University. My work spans
	software engineering, applied AI, and tools for developers.
</PageIntro>

<div class="layout">
	<div>
		<ProfileSection title="Experience" entries={experience} strongDetail />
		<ProfileSection title="Education" entries={education} />
		<section>
			<h2>Technical focus</h2>
			<p>
				Java, Python, Kotlin, Go, TypeScript, and SQL; backend services with Spring Boot and
				FastAPI; frontend interfaces with React and Svelte; and cloud systems on AWS and GCP.
			</p>
		</section>
		<section>
			<h2>Selected project</h2>
			<h3>Dashgrid</h3>
			<p>
				An ordering system using Spring Boot, PostgreSQL, React, Docker, and AWS, with JWT
				authentication, asynchronous inventory updates, and Redis caching.
			</p>
		</section>
	</div>
	<ProjectNotebook />
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr 1.3fr;
		gap: var(--space-5);
	}

	section {
		margin-bottom: var(--space-4);
	}

	@media (max-width: 700px) {
		.layout {
			grid-template-columns: 1fr;
			gap: var(--space-4);
		}
	}
</style>
