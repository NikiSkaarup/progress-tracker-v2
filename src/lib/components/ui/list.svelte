<script>
	import { cn } from '$lib/utils';
	/** @type {{class?: string | undefined | null; children: import('svelte').Snippet}} */
	let { class: className, children } = $props();
</script>

<ul class={cn('flex list-inside list-disc flex-col gap-2', className)}>
	{@render children()}
</ul>
