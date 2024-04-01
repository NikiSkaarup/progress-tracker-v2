<script>
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import getBookmarkCreate from './create-store.svelte.js';
	import { enhance } from '$app/forms';
	import { getExternalPromise } from '$lib/externalPromise.js';
	import { toast } from 'svelte-sonner';

	const create = getBookmarkCreate();
</script>

<Sheet.Root
	open={create.isOpen}
	closeOnEscape={true}
	closeOnOutsideClick={true}
	onOpenChange={(event) => {
		if (!event.valueOf()) {
			create.close();
		} else {
			create.open();
		}
	}}
>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Create bookmark</Sheet.Title>
			<Sheet.Description>Add new bookmark to your collection</Sheet.Description>
		</Sheet.Header>
		<form
			action="/?/bookmark-create"
			method="post"
			class="grid gap-4 py-4"
			use:enhance={() => {
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
						create.close();
					} else {
						reject();
					}
				};
			}}
		>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" name="name" placeholder="Example" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="href" class="text-right">Href</Label>
				<Input id="href" name="href" placeholder="https://example.com" class="col-span-3" />
			</div>
			TODO: Add tags
		</form>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit">Save changes</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
