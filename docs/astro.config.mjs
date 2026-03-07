// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Rythra Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Ekretos/Rythra' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Rythra',
					items: [
						{ label: 'Getting Started', slug: 'rythra/getting-started' },
						{ label: 'Player Control', slug: 'rythra/player' },
						{ label: 'Event Handling', slug: 'rythra/events' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
