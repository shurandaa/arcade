export interface NavItem {
	href: '/' | '/2048' | '/crossword' | '/about' | '/contact';
	label: string;
}

export const navItems: NavItem[] = [
	{ href: '/', label: 'Home' },
	{ href: '/2048', label: '2048' },
	{ href: '/crossword', label: 'Crossword' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' }
];

export interface GameSlot {
	title: string;
	description: string;
	href?: NavItem['href'];
	linkLabel?: string;
}

export const games: GameSlot[] = [
	{
		title: 'Mini crossword',
		description: 'Five-letter answers. A small word-square twist.',
		href: '/crossword',
		linkLabel: 'Open crossword'
	},
	{
		title: '2048',
		description: 'Slide, merge, and chase the 2048 tile. Seeded games can be replayed exactly.',
		href: '/2048',
		linkLabel: 'Play 2048'
	},
	{ title: 'On the horizon', description: 'Another idea can find a home here.' },
	{ title: 'Room to grow', description: 'The final slot is waiting for its game.' }
];

export const contacts = [
	{ label: 'Email', text: 'shuranz330@gmail.com', href: 'mailto:shuranz330@gmail.com' },
	{ label: 'GitHub', text: 'github.com/shurandaa', href: 'https://github.com/shurandaa' },
	{
		label: 'LinkedIn',
		text: 'LinkedIn profile',
		href: 'https://www.linkedin.com/in/shuran-zhao-990030379/'
	}
];
