<script>
	import SearchSection from '$lib/components/sections/search-section.svelte';
	import * as Bookmarks from '$lib/components/ui/bookmarks';
	import PageHeading from '$lib/components/ui/page-heading.svelte';

	let { data, form } = $props();
	let bookmarks = $state(data.bookmarks);

	$effect(() => {
		if (Array.isArray(form?.bookmarks)) {
			bookmarks = form.bookmarks;
		}
	});
</script>

<article class="content grid pb-24">
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
