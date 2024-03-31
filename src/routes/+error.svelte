<script>
	import { page } from '$app/stores';
</script>

<article>
	<header
		class="mx-auto w-full space-y-4 py-8 px-4 [contain-intrinsic-size:auto_65ch_auto_300px] [content-visibility:auto] xl:max-w-7xl"
	>
		<h1 class="mx-auto max-w-prose hyphens-auto break-words text-center text-3xl">
			{$page.status}
		</h1>
		<p class="mx-auto max-w-prose hyphens-auto break-words text-center">
			{#if $page.error === undefined}
				whoops
			{:else if typeof $page.error === 'string'}
				{$page.error}
			{:else if $page.error?.message !== undefined}
				{$page.error.message}
			{:else}
				whoops
			{/if}
		</p>
	</header>
</article>
