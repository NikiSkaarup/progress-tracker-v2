<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Sheet from '$lib/components/ui/sheet';
	import { getExternalPromise } from '$lib/external-promise.js';
	import queryParam from '$lib/query-param.js';
	import { toast } from 'svelte-sonner';
	import getBookmarkCreate from './create-store.svelte.js';

	const store = getBookmarkCreate();

	/** @type {Enchancement} */
	function enhancement() {
		const { promise, resolve, reject } = getExternalPromise();

		toast.promise(promise, {
			loading: 'Adding new bookmark...',
			success: 'Bookmark added',
			error: 'failed to add bookmark'
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

<Sheet.Root
	open={store.isOpen}
	closeOnEscape={true}
	closeOnOutsideClick={true}
	onOpenChange={(event) => {
		if (!event.valueOf()) {
			store.close();
		} else {
			store.open();
		}
	}}
>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Create bookmark</Sheet.Title>
			<Sheet.Description>Add new bookmark to your collection</Sheet.Description>
		</Sheet.Header>
		<form
			id="create-bookmark-form"
			action="/?/bookmarks/create{queryParam($page)}"
			method="post"
			class="grid gap-4 py-4"
			use:enhance={enhancement}
		>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="href" class="text-right">Href</Label>
				<Input id="href" name="href" placeholder="https://example.com" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" name="name" placeholder="Example" class="col-span-3" />
			</div>
			TODO: Add tags
		</form>
		<Sheet.Footer>
			<Button type="submit" form="create-bookmark-form">Save changes</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
