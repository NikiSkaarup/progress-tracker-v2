<script>
	import '$lib/../app.css';
	import Header from '$lib/components/ui/header.svelte';
	import Head from '$lib/components/ui/head.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as Bookmarks from '$lib/components/sheets/bookmarks';

	/** @type {{children?: import('svelte').Snippet;}} */
	let { children } = $props();
</script>

<ModeWatcher />
<Toaster duration={2000} closeButton={true} richColors={true} />

<Head />

<Header />

<main id="main-content">
	{#if children}
		{@render children()}
	{/if}
</main>

<Bookmarks.Create />
<Bookmarks.Edit />
