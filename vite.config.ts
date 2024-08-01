import { sveltekit } from '@sveltejs/kit/vite';
import { svelteInspector } from '@sveltejs/vite-plugin-svelte-inspector';
import tailwindcss from '@tailwindcss/vite';
import { ConsolePlugin } from 'sveltekit-plugin-console';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), svelteInspector(), ConsolePlugin()],
});
