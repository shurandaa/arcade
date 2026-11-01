<footer>
	<p>The Arcade · A little space to play.</p>
	<p>Owner: Shuran Zhao</p>
</footer>

<style>
	footer {
		max-width: calc(var(--page-width) - 2 * var(--space-4));
		margin: auto;
		padding: var(--space-3) 0;
		border-top: 1px solid var(--line);
		display: flex;
		justify-content: space-between;
		gap: var(--space-2);
		color: var(--muted);
		font-size: var(--text-small);
	}

	p {
		margin: 0;
	}

	@media (max-width: 1220px) {
		footer {
			margin: 0 var(--space-4);
		}
	}

	@media (max-width: 700px) {
		footer {
			margin: 0 var(--space-2);
			flex-direction: column;
		}
	}
</style>
