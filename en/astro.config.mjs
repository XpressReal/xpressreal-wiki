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
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Introduction', slug: 'guides/introduction' },
						{ label: 'Getting started', slug: 'guides/getting-started' },
						{ label: 'Setup openFyde', slug: 'guides/openfyde' },
						{ label: 'Other Systems', slug: 'guides/other-systems' },
						{ label: 'Building openFyde', slug: 'guides/building-openfyde' },
						{ label: 'Building Custom Linux', slug: 'guides/building-yocto' },
						{ label: 'Unbrick the XpressReal', slug: 'guides/unbrick' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Recipes',
					items: [
						{ label: 'Setup FydeSign', slug: 'recipes/fydesign'},
					],
				},
			],
			customCss: [
				'/src/styles/custom.css',
			]
		}),
	],
});
