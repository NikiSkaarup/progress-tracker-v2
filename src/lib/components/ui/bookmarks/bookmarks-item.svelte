<script>
	import Bookmark from 'lucide-svelte/icons/bookmark';
	import BookmarkCheck from 'lucide-svelte/icons/bookmark-check';
	import BookmarkX from 'lucide-svelte/icons/bookmark-x';
	import PenLine from 'lucide-svelte/icons/pen-line';
	import Link2 from 'lucide-svelte/icons/link-2';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import tempToast from '$lib/tempToast';
	import { cn } from '$lib/utils';
	import getEditStore from '$lib/components/sheets/bookmarks/edit-store.svelte';

	/** @type {ClassProp & {bookmark: PTBookmark; i: number}} */
	let { class: className, bookmark, i } = $props();

	const edit = getEditStore();
</script>

<div
	class={cn(
		'breakout content text-card-foreground grid py-1',
		i % 2 == 0 ? 'bg-card/40' : 'bg-card',
		className
	)}
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<a
				href={bookmark.href}
				target="_blank"
				referrerpolicy="no-referrer"
				class={buttonVariants({ variant: 'ghost', size: 'icon' })}
			>
				<Link2 />
			</a>

			<Button variant="ghost" size="icon" onclick={() => edit.open(bookmark)}>
				<PenLine />
			</Button>

			{#if bookmark.finished}
				<Button
					variant="ghost"
					size="icon"
					onclick={tempToast('open bookmark check dialog')}
				>
					<BookmarkCheck />
				</Button>
			{:else if bookmark.started}
				<Button
					variant="ghost"
					size="icon"
					onclick={tempToast('open bookmark check dialog')}
				>
					<Bookmark />
				</Button>
			{:else}
				<Button
					variant="ghost"
					size="icon"
					onclick={tempToast('open bookmark check dialog')}
				>
					<BookmarkX />
				</Button>
			{/if}

			<span>
				{bookmark.title}
			</span>
		</div>
		<div class="flex items-center gap-1">
			{#each bookmark.tags as tag}
				<Badge variant={tag.variant}>{tag.name}</Badge>
			{/each}

			<Button
				variant="ghost"
				size="icon"
				onclick={tempToast('open alert dialog with delete confirmation')}
			>
				<Trash2 />
			</Button>
		</div>
	</div>
</div>
