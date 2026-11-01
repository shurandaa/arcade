<script lang="ts">
	import ClueList from '#lib/components/crossword/ClueList.svelte';
	import CrosswordGrid from '#lib/components/crossword/CrosswordGrid.svelte';
	import PageIntro from '#lib/components/layout/PageIntro.svelte';
	import { acrossClues, answers, buildGrid, downClues } from '#lib/data/crossword.ts';

	const cells = buildGrid();
</script>

<svelte:head>
	<title>Mini crossword | The Arcade</title>
</svelte:head>

<PageIntro
	eyebrow="Game 01 / The word square"
	title="The mini crossword."
	descriptionId="instructions"
>
	Enter one letter in each white square. Tab moves across rows; Shift + Tab moves back. Tap a square
	to edit it. All answers have five letters.
</PageIntro>

<div class="layout">
	<section aria-labelledby="grid-title" aria-describedby="instructions">
		<h2 id="grid-title">Your puzzle</h2>
		<CrosswordGrid {cells} mode="play" />
		<p class="note">
			A small twist: the answers form a word square, so the same five words appear across and down.
			The dark border squares are blocked.
		</p>
	</section>
	<div class="clues">
		<ClueList title="Across" clues={acrossClues} />
		<ClueList title="Down" clues={downClues} />
	</div>
</div>

<!-- Kept from Project 1: the native details element reveals the answers without JavaScript. -->
<details class="solution">
	<summary>Reveal solution</summary>
	<p>Compare letters manually. Opening this section does not change your entries.</p>
	<CrosswordGrid {cells} mode="solution" />
	<div class="answer-lists">
		<ClueList title="Across answers" clues={acrossClues} {answers} />
		<ClueList title="Down answers" clues={downClues} {answers} />
	</div>
</details>

<style>
	.layout {
		display: grid;
		grid-template-columns: minmax(278px, 380px) 1fr;
		gap: var(--space-5);
		align-items: start;
	}

	.clues {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4);
	}

	.note {
		font-size: var(--text-small);
		color: var(--muted);
		margin-top: var(--space-3);
	}

	.solution {
		margin: var(--space-4) 0;
		padding: var(--space-2) 0;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}

	summary {
		min-height: 48px;
		padding: 0.65rem 0.5rem;
		cursor: pointer;
		color: var(--accent);
		font-weight: 700;
	}

	.solution[open] summary {
		margin-bottom: var(--space-2);
	}

	.answer-lists {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-5);
		margin-top: var(--space-3);
	}

	@media (max-width: 900px) {
		.clues {
			grid-template-columns: 1fr;
			gap: var(--space-3);
		}
	}

	@media (max-width: 700px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-4);
		}

		.clues {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--space-3);
		}
	}

	@media (max-width: 380px) {
		.clues {
			grid-template-columns: 1fr;
		}
	}
</style>
