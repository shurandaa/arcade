import type { Direction } from '@shurandaa/arcade-core';
import type { Attachment } from 'svelte/attachments';

const KEY_DIRECTIONS: Record<string, Direction> = {
	ArrowUp: 'up',
	ArrowDown: 'down',
	ArrowLeft: 'left',
	ArrowRight: 'right'
};

/**
 * Maps an arrow key press to a direction. Returns null when the key should
 * keep its normal meaning: other keys, modified keys, or typing in a form field.
 */
export function directionFromKey(event: KeyboardEvent): Direction | null {
	if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return null;
	const target = event.target as HTMLElement | null;
	if (target?.closest('input, textarea, select, [contenteditable="true"]')) return null;
	return KEY_DIRECTIONS[event.key] ?? null;
}

/** Minimum distance, in CSS pixels, for a drag to count as a swipe. */
const SWIPE_THRESHOLD = 30;

/** Attachment that reports touch or pointer swipes on an element as directions. */
export function swipe(onswipe: (direction: Direction) => void): Attachment<HTMLElement> {
	return (node) => {
		let start: { x: number; y: number; id: number } | null = null;

		const down = (event: PointerEvent) => {
			if (!event.isPrimary) return;
			start = { x: event.clientX, y: event.clientY, id: event.pointerId };
		};

		const up = (event: PointerEvent) => {
			if (!start || event.pointerId !== start.id) return;
			const dx = event.clientX - start.x;
			const dy = event.clientY - start.y;
			start = null;
			if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_THRESHOLD) return;
			if (Math.abs(dx) > Math.abs(dy)) onswipe(dx > 0 ? 'right' : 'left');
			else onswipe(dy > 0 ? 'down' : 'up');
		};

		const cancel = () => {
			start = null;
		};

		node.addEventListener('pointerdown', down);
		node.addEventListener('pointerup', up);
		node.addEventListener('pointercancel', cancel);
		return () => {
			node.removeEventListener('pointerdown', down);
			node.removeEventListener('pointerup', up);
			node.removeEventListener('pointercancel', cancel);
		};
	};
}
