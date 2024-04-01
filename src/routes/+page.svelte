<script>
	import PageHeading from '$lib/components/ui/page-heading.svelte';
	import TitledSection from '$lib/components/ui/titled-section.svelte';
	import SearchSection from '$lib/components/sections/search-section.svelte';
	import * as Bookmarks from '$lib/components/ui/bookmarks';

	let { data } = $props();
	let bookmarks = $state(data.bookmarks);
</script>

<article class="content grid">
	<PageHeading>
		{#snippet title()}
			Progress Tracker
		{/snippet}
	</PageHeading>

	<SearchSection bind:bookmarks />

	<Bookmarks.Root>
		{#each bookmarks as bookmark, i (bookmark.id)}
			<Bookmarks.Item {bookmark} {i}></Bookmarks.Item>
		{/each}
	</Bookmarks.Root>
</article>
