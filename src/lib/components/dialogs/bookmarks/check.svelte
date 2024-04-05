<script>
import { enhance } from '$app/forms';
import { Button } from '$lib/components/ui/button';
import * as Dialog from '$lib/components/ui/dialog';
import { getExternalPromise } from '$lib/externalPromise';
import Bookmark from 'lucide-svelte/icons/bookmark';
import BookmarkCheck from 'lucide-svelte/icons/bookmark-check';
import BookmarkX from 'lucide-svelte/icons/bookmark-x';
import { toast } from 'svelte-sonner';
import getCheckStore from './check-store.svelte';

const store = getCheckStore();

/** @type {Enchancement} */
function enhancement() {
	const { promise, resolve, reject } = getExternalPromise();

	toast.promise(promise, {
		loading: 'Setting bookmark...',
		success: 'bookmark set',
		error: 'failed to set bookmark',
	});

	return async ({ result, update }) => {
		if (result.type === 'error') {
			reject();
		} else if (result.type === 'failure') {
			reject();
		} else if (result.type === 'redirect') {
			resolve();
			update();
		} else if (result.type === 'success') {
			resolve();
			store.close();
			update();
		} else {
			reject();
		}
	};
}
</script>

<Dialog.Root
	open={store.isOpen}
	closeOnEscape={true}
	closeOnOutsideClick={true}
	onOpenChange={(event) => {
		if (!event.valueOf()) {
			store.close();
		} else {
			store.open(store.bookmark);
		}
	}}
>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer class="flex gap-1">
			<form action="/?/bookmarks/check" method="post" use:enhance={enhancement}>
				<input type="hidden" name="id" value={store.bookmark.id} />
				<input type="hidden" name="started" value={store.bookmark.started} />
				<input type="hidden" name="finished" value={store.bookmark.finished} />
				<Button type="submit" size="icon">
					<Bookmark />
				</Button>
			</form>
			<form action="/?/bookmarks/check" method="post" use:enhance={enhancement}>
				<input type="hidden" name="id" value={store.bookmark.id} />
				<input type="hidden" name="started" value={store.bookmark.started} />
				<input type="hidden" name="finished" value={store.bookmark.finished} />
				<Button type="submit" size="icon">
					<BookmarkCheck />
				</Button>
			</form>
			<form action="/?/bookmarks/check" method="post" use:enhance={enhancement}>
				<input type="hidden" name="id" value={store.bookmark.id} />
				<input type="hidden" name="started" value={false} />
				<input type="hidden" name="finished" value={false} />
				<Button type="submit" size="icon">
					<BookmarkX />
				</Button>
			</form>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
