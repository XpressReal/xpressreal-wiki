// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'XpressReal SBC Wiki',
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Introduction', slug: 'guides/introduction' },
						{ label: 'Getting started', slug: 'guides/getting-started' },
						{ label: 'Passive PoE Support', slug: 'guides/passive-poe' },
						{ label: 'Setup openFyde/FydeOS', slug: 'guides/openfyde-fydeos' },
						{ label: 'Other systems', slug: 'guides/other-systems' },
						{ label: 'Building openFyde', slug: 'guides/building-openfyde' },
						{ label: 'Building custom Linux', slug: 'guides/building-yocto' },
						{ label: 'Unbrick the XpressReal T3', slug: 'guides/unbrick' },
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
						{ label: 'Setup Home Assistant OS', slug: 'recipes/haos'},
					],
				},
			],
			customCss: [
				'/src/styles/custom.css',
			]
		}),
	],
});
