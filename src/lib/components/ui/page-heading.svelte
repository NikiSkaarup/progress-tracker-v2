<script>
	import { cn } from '$lib/utils';
	/** @type {{class?: string | undefined | null; children?: import('svelte').Snippet, title: import('svelte').Snippet}} */
	let { class: className, children, title } = $props();
</script>

<header class={cn('flex flex-col gap-2 py-8', className)}>
	<h1 class="text-center text-3xl">
		{@render title()}
	</h1>
	{#if children}
		{@render children()}
	{/if}
</header>
