import { sveltekit } from '@sveltejs/kit/vite';
import { svelteInspector } from '@sveltejs/vite-plugin-svelte-inspector';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), svelteInspector()],
	build: {
		modulePreload: {
			polyfill: false,
		},
		cssMinify: 'lightningcss',
	},
});
