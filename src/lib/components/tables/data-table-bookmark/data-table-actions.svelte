<script>
	import getCheckStore from '$lib/components/dialogs/bookmarks/check-store.svelte';
	import getDeleteStore from '$lib/components/dialogs/bookmarks/delete-store.svelte';
	import getUpdateStore from '$lib/components/sheets/bookmarks/update-store.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Bookmark from 'lucide-svelte/icons/bookmark';
	import BookmarkCheck from 'lucide-svelte/icons/bookmark-check';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Pen from 'lucide-svelte/icons/pen';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	/** @type {number} */
	export let id;
	/** @type {string} */
	export let href;
	/** @type {boolean} */
	export let finished;

	const checkStore = getCheckStore();
	const updateStore = getUpdateStore();
	const deleteStore = getDeleteStore();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item class="gap-1" onclick={() => checkStore.open(id)}>
				{#if finished}
					<BookmarkCheck />
				{:else}
					<Bookmark />
				{/if} Toggle Finished
			</DropdownMenu.Item>
			<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(href)}>
				Copy to clipboard
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="gap-1" onclick={() => updateStore.open(id)}>
			<Pen /> Edit
		</DropdownMenu.Item>
		<DropdownMenu.Item class="gap-1" onclick={() => deleteStore.open(id)}>
			<Trash2 /> Delete
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
