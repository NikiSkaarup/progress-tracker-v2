<script>
	import { page } from '$app/stores';

	let title = $derived(
		$page.url.pathname === '/' || $page.data.title.length === 0
			? $page.data.titleBase
			: `${$page.data.titleBase} - ${$page.data.title}`
	);

	/** @type {string}*/
	let description = $derived($page.data.snippet ?? '');
	/** @type {string}*/
	let image = $derived($page.data.image ?? '');
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="twitter:image" content={image} />
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={$page.url.toString()} />
	<link rel="manifest" href="/manifest.json" />
</svelte:head>
