<script lang="ts">
	interface Props {
		/** Seed of the game in progress. */
		seed: string;
		onstart: (seed: string) => void;
	}

	let { seed, onstart }: Props = $props();

	let draft = $state('');

	function submit(event: SubmitEvent) {
		event.preventDefault();
		onstart(draft);
	}
</script>

<section aria-labelledby="seed-title">
	<h2 id="seed-title">Replay a game</h2>
	<p>
		Every game has a seed. The same seed and the same moves always produce the same tiles, so you
		can share a seed and race a friend on an identical game.
	</p>
	<p class="current">Current seed: <code>{seed || '—'}</code></p>
	<form onsubmit={submit}>
		<label for="seed-input">Seed</label>
		<div class="row">
			<input
				id="seed-input"
				bind:value={draft}
				placeholder="e.g. friday-race"
				autocomplete="off"
				spellcheck="false"
				maxlength="40"
			/>
			<button type="submit" class="button secondary">Start seeded game</button>
		</div>
		<p class="hint">Leave it empty to start with a random seed.</p>
	</form>
</section>

<style>
	section {
		margin-top: var(--space-4);
		padding-top: var(--space-3);
		border-top: 1px solid var(--line);
	}

	.current code {
		padding: 0.1rem 0.4rem;
		background: var(--surface);
		border-radius: var(--radius);
		font-size: var(--text-body);
	}

	label {
		display: block;
		font-weight: 650;
		margin-bottom: 0.25rem;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
	}

	input {
		flex: 1 1 10rem;
		min-width: 0;
		min-height: 48px;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--muted);
		border-radius: var(--radius);
		background: var(--paper);
		color: var(--ink);
		font: inherit;
	}

	.hint {
		margin: var(--space-1) 0 0;
		color: var(--muted);
		font-size: var(--text-small);
	}
</style>
