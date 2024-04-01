<script>
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import getEditStore from './edit-store.svelte.js';
	import { enhance } from '$app/forms';
	import { getExternalPromise } from '$lib/externalPromise.js';
	import { toast } from 'svelte-sonner';

	const store = getEditStore();
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
	{#if !store.bookmark}
		<Sheet.Content side="right">
			<Sheet.Header>
				<Sheet.Title>Failed to open bookmark</Sheet.Title>
				<Sheet.Description>No bookmark selected</Sheet.Description>
			</Sheet.Header>
			<Sheet.Footer>
				<Sheet.Close asChild let:builder>
					<Button builders={[builder]} type="button">Close</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</Sheet.Content>
	{:else}
		<Sheet.Content side="right">
			<Sheet.Header>
				<Sheet.Title>Update bookmark</Sheet.Title>
				<Sheet.Description>Make changes to your bookmark</Sheet.Description>
			</Sheet.Header>
			<form
				action="/?/bookmark-update&id={store.bookmark.id}"
				method="post"
				class="grid gap-4 py-4"
				use:enhance={() => {
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
						} else {
							reject();
						}
					};
				}}
			>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input
						id="name"
						name="name"
						placeholder="Example"
						class="col-span-3"
						bind:value={store.bookmark.title}
					/>
				</div>
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
				TODO: Add tags
			</form>
			<Sheet.Footer>
				<Sheet.Close asChild let:builder>
					<Button builders={[builder]} type="submit">Save changes</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</Sheet.Content>
	{/if}
</Sheet.Root>
