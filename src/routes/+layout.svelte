<script>
	import '$lib/../app.css';
	import Header from '$lib/components/ui/header.svelte';
	import Head from '$lib/components/ui/head.svelte';
	import { ModeWatcher } from 'mode-watcher';

	/** @type {{children?: import('svelte').Snippet;}} */
	let { children } = $props();
</script>

<ModeWatcher />
<Head />

<Header />

<main id="main-content">
	{#if children}
		{@render children()}
	{/if}
</main>
