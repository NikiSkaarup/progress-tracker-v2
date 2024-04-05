<script>
import getBookmarkCreate from '$lib/components/sheets/bookmarks/create-store.svelte';
import { Button } from '$lib/components/ui/button';
import Plus from 'lucide-svelte/icons/plus';
import Avatar from './avatar.svelte';
const create = getBookmarkCreate();
</script>

<header
	class="content bg-card text-card-foreground sticky top-0 z-20 grid py-2 font-mono drop-shadow sm:px-2"
>
	<a
		href="#main-content"
		class="bg-accent text-accent-foreground absolute top-0 left-0 z-50 rounded-b-sm pt-0.5 px-1 text-xs text-gray-100 not-focus:sr-only"
	>
		Skip to main content
	</a>
	<div class="grid grid-cols-3">
		<div class="flex items-center justify-start gap-2 md:gap-4">
			<a href="/" class="text-center"> Progress Tracker </a>
		</div>

		<div class="flex items-center justify-center">
			<!-- <a href="/" class="text-center"> Progress Tracker </a> -->
		</div>

		<div class="flex items-center justify-end gap-2 md:gap-4">
			<Button variant="ghost" size="icon" onclick={create.open}>
				<Plus />
			</Button>
			<Avatar id="avatar" class="h-9" />
		</div>
	</div>
</header>
