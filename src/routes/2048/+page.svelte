<script lang="ts">
	import Game2048 from '#lib/components/game2048/Game2048.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
</script>

<svelte:head>
	<title>2048 | The Arcade</title>
</svelte:head>

<div class="layout">
	<div class="intro">
		<PageIntro eyebrow="Game 02 / Slide and merge" title="2048." descriptionId="how-to-play">
			Use the arrow keys to slide every tile. Two tiles with the same number merge into one, and
			their sum is added to your score. Reach the 2048 tile to win, then keep going as long as you
			can still move.
		</PageIntro>
	</div>
	<section class="game" aria-label="2048 game" aria-describedby="how-to-play">
		<Game2048 />
	</section>
	<section aria-labelledby="controls-title" class="controls-help">
		<h2 id="controls-title">Controls</h2>
		<ul>
			<li><strong>Keyboard:</strong> arrow keys move the tiles.</li>
			<li><strong>Touch:</strong> swipe on the board, or use the arrow buttons below it.</li>
			<li>A move that changes nothing does not count, and no new tile appears.</li>
			<li>Your board and best score are saved in this browser.</li>
		</ul>
	</section>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr minmax(0, 30rem);
		grid-template-rows: auto 1fr;
		grid-template-areas:
			'intro game'
			'help game';
		column-gap: var(--space-5);
		align-items: start;
	}

	.intro {
		grid-area: intro;
	}

	.game {
		grid-area: game;
	}

	.controls-help {
		grid-area: help;
	}

	.controls-help ul {
		padding-left: var(--space-3);
		color: var(--muted);
	}

	.controls-help li {
		margin-bottom: var(--space-1);
	}

	@media (max-width: 900px) {
		.layout {
			/* On small screens, put the board before the controls help. */
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: auto;
			grid-template-areas: 'intro' 'game' 'help';
		}

		.controls-help {
			margin-top: var(--space-4);
		}
	}
</style>
