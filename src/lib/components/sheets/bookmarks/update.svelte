<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Sheet from '$lib/components/ui/sheet';
	import { getExternalPromise } from '$lib/externalPromise';
	import { toast } from 'svelte-sonner';
	import getUpdateStore from './update-store.svelte';

	const store = getUpdateStore();

	/** @type {Enchancement} */
	function enhancement() {
		const { promise, resolve, reject } = getExternalPromise();

		toast.promise(promise, {
			loading: 'Updating bookmark...',
			success: 'bookmark updated',
			error: 'failed to update bookmark'
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
			store.open(store.bookmark);
		}
	}}
>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Update bookmark</Sheet.Title>
			<Sheet.Description>Make changes to your bookmark</Sheet.Description>
		</Sheet.Header>
		<form
			id="update-bookmark-form"
			action="/?/bookmarks/update"
			method="post"
			class="grid gap-4 py-4"
			use:enhance={enhancement}
		>
			<input name="id" type="hidden" value={store.bookmark.id} />
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="href" class="text-right">Href</Label>
				<Input
					id="href"
					name="href"
					placeholder="https://example.com"
					class="col-span-3"
					bind:value={store.bookmark.href}
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input
					id="name"
					name="name"
					placeholder="Example"
					class="col-span-3"
					bind:value={store.bookmark.name}
				/>
			</div>
			TODO: Add tags
		</form>
		<Sheet.Footer>
			<Button type="submit" form="update-bookmark-form">Save changes</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
