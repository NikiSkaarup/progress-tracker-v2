<script>
	import '$lib/../app.css';
	import Dialogs from '$lib/components/dialogs/dialogs.svelte';
	import Sheets from '$lib/components/sheets/sheets.svelte';
	import Head from '$lib/components/ui/head.svelte';
	import Header from '$lib/components/ui/header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	// import { ModeWatcher } from 'mode-watcher';

	/** @type {{children?: import('svelte').Snippet;}} */
	let { children } = $props();
</script>

<!-- <ModeWatcher /> -->
<Toaster class="dark" duration={2000} closeButton={true} richColors={true} />

<Head />

<Header />

<main id="main-content">
	{#if children}
		{@render children()}
	{/if}
</main>

<Dialogs />
<Sheets />
