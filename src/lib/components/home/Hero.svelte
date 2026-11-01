<script lang="ts">
	import { asset, resolve } from '$app/paths';
</script>

<section class="hero" aria-labelledby="welcome-title">
	<div>
		<p class="eyebrow">Small games. Good company.</p>
		<h1 id="welcome-title">Make room<br />for a little play.</h1>
		<p class="lead">
			Welcome to The Arcade, Shuran Zhao’s personal collection of small puzzles. Pull up a chair and
			start with a few words, or a few thousand points.
		</p>
		<div class="actions">
			<a class="button" href={resolve('/2048')}>Play 2048</a>
			<a class="button secondary" href={resolve('/crossword')}>Try the mini crossword</a>
		</div>
	</div>
	<div class="art">
		<img src={asset('mark.svg')} width="210" height="210" alt="" />
	</div>
</section>

<style>
	.hero {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		align-items: center;
		gap: var(--space-5);
		padding: var(--space-4) 0 var(--space-5);
	}

	h1 {
		max-width: 12ch;
	}

	.lead {
		font-size: var(--text-lead);
		color: var(--muted);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.art {
		background: var(--accent-light);
		padding: var(--space-5);
		border: 1px solid var(--line);
		border-radius: 50% 50% var(--radius) var(--radius);
	}

	.art img {
		width: 210px;
		margin: auto;
		transform: rotate(-8deg);
	}

	@media (max-width: 700px) {
		.hero {
			grid-template-columns: 1fr;
			gap: var(--space-4);
			padding-top: 0;
		}

		.art {
			max-width: 320px;
			width: 100%;
			padding: var(--space-4);
		}

		.art img {
			width: 140px;
		}
	}
</style>
