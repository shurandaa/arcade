export interface ProfileEntry {
	title: string;
	detail: string;
	description?: string;
}

export const experience: ProfileEntry[] = [
	{
		title: 'Amazon AWS',
		detail: 'Software Engineer Intern · Jun–Aug 2026',
		description:
			'Built AI-assisted investigation workflows for deployment failures, integration tests, and canary alarms, along with notification and incident-ticket automation.'
	},
	{
		title: 'Spatioform Lab',
		detail: 'Applied AI Researcher · Jan 2026–present',
		description:
			'Built a Python coding-agent runtime, runtime permission controls, and evaluation and memory systems for evolving agent skills.'
	},
	{
		title: 'Tiandong Technology',
		detail: 'Software Engineer Intern · Feb–Jun 2025',
		description:
			'Developed a multi-agent support platform with retrieval, tool reliability controls, session memory, and evaluation workflows.'
	}
];

export const education: ProfileEntry[] = [
	{
		title: 'Northeastern University',
		detail: 'Master of Science in Computer Science',
		description: 'Sep 2025–Jun 2027 · Expected graduation Jun 2027'
	},
	{
		title: 'Chongqing University',
		detail: 'Bachelor of Engineering in Software Engineering',
		description: 'Sep 2021–Jun 2025'
	},
	{
		title: 'University of California, Irvine',
		detail: 'UCInspire undergraduate summer program',
		description: 'Jun–Aug 2024'
	}
];
