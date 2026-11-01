<section>
	<h2>Project notebook</h2>
	<p>A closer look at the design decisions behind this arcade.</p>
	<div class="notes">
		<section>
			<h3>2048</h3>
			<p>
				The rules live in a separate npm package, <code>@shurandaa/arcade-core</code>, with no
				dependency on Svelte or the browser. This site installs the package and only handles
				drawing, input, and saving.
			</p>
			<section>
				<h4>Tiles that remember who they are</h4>
				<p>
					Each tile has an id, so Svelte can slide the same element to its new square instead of
					redrawing the board.
				</p>
			</section>
		</section>
		<section>
			<h3>The mini crossword</h3>
			<p>
				A word square uses the same five answers across and down, giving this small puzzle a
				deliberate symmetry.
			</p>
			<section>
				<h4>Playing without scripts</h4>
				<p>
					Each square is a native text field. Players enter one character at a time and compare
					their work with the solution.
				</p>
				<section>
					<h5>Keyboard navigation</h5>
					<p>Tab moves through the open squares in reading order. Shift + Tab moves backward.</p>
					<section>
						<h6>Checking an answer</h6>
						<p>
							After the final square, Tab reaches “Reveal solution.” Press Enter or Space to open
							it, then read the numbered answer grid and answer lists.
						</p>
					</section>
				</section>
			</section>
		</section>
	</div>
</section>

<style>
	.notes {
		padding-left: var(--space-3);
		border-left: 1px solid var(--line);
	}

	.notes section {
		margin-top: var(--space-3);
	}
</style>
