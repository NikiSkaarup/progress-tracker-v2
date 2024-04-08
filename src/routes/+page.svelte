<script>
	import DataTable from '$lib/components/tables/data-table-bookmark/data-table.svelte';
	import * as Card from '$lib/components/ui/card';
	import { writable } from 'svelte/store';

	let { data } = $props();

	let bookmarks = writable(data.bookmarks);

	$effect(() => {
		bookmarks.set(data.bookmarks);
	});
</script>

<article class="content grid pt-8 pb-24">
	<!-- <PageHeading>
		{#snippet title()}
			Progress Tracker
		{/snippet}
	</PageHeading> -->

	<Card.Root>
		<Card.Header>
			<Card.Title>Bookmarks</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-2">
			<DataTable data={bookmarks} />
		</Card.Content>
	</Card.Root>
</article>
