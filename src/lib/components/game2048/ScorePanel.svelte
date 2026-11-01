<script lang="ts">
	interface Props {
		score: number;
		best: number;
		/** Points from the latest move; shown briefly next to the score. */
		gain: number;
		/** Increments on every move, so the same gain twice in a row still animates. */
		moveCount: number;
		onnewgame: () => void;
	}

	let { score, best, gain, moveCount, onnewgame }: Props = $props();
</script>

<div class="panel">
	<dl>
		<div class="stat">
			<dt>Score</dt>
			<dd>
				{score}
				{#key moveCount}
					{#if gain > 0}
						<span class="gain" aria-hidden="true">+{gain}</span>
					{/if}
				{/key}
			</dd>
		</div>
		<div class="stat">
			<dt>Best</dt>
			<dd>{best}</dd>
		</div>
	</dl>
	<button type="button" class="button" onclick={onnewgame}>New game</button>
</div>

<style>
	.panel {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: space-between;
		gap: var(--space-2);
		margin-bottom: var(--space-3);
	}

	dl {
		display: flex;
		gap: var(--space-1);
		margin: 0;
	}

	.stat {
		min-width: 6.5rem;
		padding: var(--space-1) var(--space-2);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius);
	}

	dt {
		font-size: var(--text-small);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}

	dd {
		position: relative;
		margin: 0;
		font-size: var(--text-heading);
		font-weight: 750;
		font-variant-numeric: tabular-nums;
		line-height: 1.3;
	}

	.gain {
		position: absolute;
		top: 0;
		left: 100%;
		margin-left: 0.25rem;
		color: var(--accent);
		font-size: var(--text-body);
		animation: rise 700ms ease-out forwards;
	}

	@keyframes rise {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(-1rem);
		}
	}
</style>
