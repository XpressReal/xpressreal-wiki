// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'XpressReal Wiki',
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: [
				'/src/styles/custom.css',
			]
		}),
	],
});
