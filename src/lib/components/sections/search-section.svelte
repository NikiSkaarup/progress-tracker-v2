<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { getExternalPromise } from '$lib/external-promise';
	import queryParam from '$lib/query-param';
	import Search from 'lucide-svelte/icons/search';
	import { toast } from 'svelte-sonner';

	/** @typedef {import('$lib/server/db/schema.js').SelectBookmarkWithTags} SelectBookmarkWithTags */
	/** @type {{bookmarks: Array<SelectBookmarkWithTags>}} */
	let { bookmarks = $bindable() } = $props();

	/** @type {HTMLFormElement} */
	let form;

	/** @type {Timer | undefined}*/
	let timeout;
</script>

<Card.Root class="breakout content grid rounded-none">
	<Card.Header class="p-0 py-6">
		<Card.Title>Search</Card.Title>
	</Card.Header>
	<Card.Content class="p-0 pb-6">
		<form
			bind:this={form}
			action="/?/search{queryParam($page)}"
			method="post"
			class="flex flex-col gap-2"
			use:enhance={({ formData }) => {
				const { promise, resolve, reject } = getExternalPromise();

				toast.promise(promise, {
					loading: 'Searching...',
					success: 'Search complete',
					error: 'Search failed'
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
						/** @type {{bookmarks: Array<SelectBookmarkWithTags>}} */
						const data = /** @type {any} */ (result.data);
						if (!Array.isArray(data.bookmarks)) {
							reject();
							return;
						}

						bookmarks = data.bookmarks;

						const q = formData.get('search');

						if (q !== null) {
							$page.url.searchParams.set('q', q.toString());
						} else {
							$page.url.searchParams.delete('q');
						}
						goto($page.url, {
							replaceState: true,
							keepFocus: true,
							invalidateAll: false
						});
					} else {
						reject();
					}
				};
			}}
		>
			<Label class="sr-only" for="search">Search</Label>
			<div class="flex items-center gap-2">
				<Input
					class="bg-accent text-accent-foreground"
					id="search"
					name="search"
					type="search"
					value={$page.url.searchParams.get('q') ?? ''}
					oninput={() => {
						clearTimeout(timeout);
						timeout = setTimeout(() => form.requestSubmit(), 200);
					}}
				/>
				<Button type="submit" variant="ghost" size="icon">
					<Search />
				</Button>
			</div>
		</form>
	</Card.Content>
</Card.Root>
