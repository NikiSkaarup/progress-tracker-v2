<script>
	import { enhance } from '$app/forms';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { getExternalPromise } from '$lib/externalPromise';
	import { toast } from 'svelte-sonner';
	import getDeleteStore from './delete-store.svelte';

	const store = getDeleteStore();

	/** @type {Enchancement} */
	function enhancement() {
		const { promise, resolve, reject } = getExternalPromise();

		toast.promise(promise, {
			loading: 'Deleting bookmark...',
			success: 'bookmark deleted',
			error: 'failed to delete bookmark'
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

<AlertDialog.Root
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
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account and remove
				your data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form action="/?/bookmarks/delete" method="post" use:enhance={enhancement}>
				<input name="id" type="hidden" value={store.bookmark.id} />
				<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
