import adapter from '@eslym/svelte-adapter-bun';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			dynamic_origin: true,
			transpileBun: true,
		}),
	},
};

export default config;
