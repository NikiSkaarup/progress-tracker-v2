<script>
	import getCheckStore from '$lib/components/dialogs/bookmarks/check-store.svelte';
	import getDeleteStore from '$lib/components/dialogs/bookmarks/delete-store.svelte';
	import getUpdateStore from '$lib/components/sheets/bookmarks/update-store.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import Bookmark from 'lucide-svelte/icons/bookmark';
	import BookmarkCheck from 'lucide-svelte/icons/bookmark-check';
	import Link2 from 'lucide-svelte/icons/link-2';
	import PenLine from 'lucide-svelte/icons/pen-line';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	/** @type {ClassProp & {bookmark: import('$lib/server/db/schema.js').SelectBookmarkWithTags; i: number}} */
	let { class: className, bookmark, i } = $props();

	const checkStore = getCheckStore();
	const updateStore = getUpdateStore();
	const deleteStore = getDeleteStore();
</script>

<div
	class={cn(
		'breakout content text-card-foreground grid py-1',
		i % 2 == 0 ? 'bg-card/40' : 'bg-card',
		className
	)}
>
	<div class="flex items-center justify-between gap-2">
		<div class="grid grid-cols-[auto_auto_auto_1fr] items-center gap-2">
			<a
				href={bookmark.href}
				target="_blank"
				referrerpolicy="no-referrer"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
			>
				<Link2 />
			</a>

			<Button variant="ghost" size="icon" onclick={() => updateStore.open(bookmark.id)}>
				<PenLine />
			</Button>

			{#if bookmark.finished}
				<Button variant="ghost" size="icon" onclick={() => checkStore.open(bookmark.id)}>
					<BookmarkCheck />
				</Button>
			{:else}
				<Button variant="ghost" size="icon" onclick={() => checkStore.open(bookmark.id)}>
					<Bookmark />
				</Button>
			{/if}

			<span class="inline-flex items-center gap-1">
				{bookmark.name}
			</span>
		</div>
		<div class="flex items-center gap-1.5">
			{#if Array.isArray(bookmark.tags)}
				{#each bookmark.tags as tag (tag.id)}
					<Badge variant={tag.variant}>{tag.name}</Badge>
				{/each}
			{/if}

			<Button variant="ghost" size="icon" onclick={() => deleteStore.open(bookmark.id)}>
				<Trash2 />
			</Button>
		</div>
	</div>
</div>
