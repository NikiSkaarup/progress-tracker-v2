<script>
import { cn } from '$lib/utils';
/** @type {ClassProp & ChildrenProp} */
let { class: className, children } = $props();
</script>

<ul class={cn('flex list-inside list-disc flex-col gap-2', className)}>
	{#if children}
		{@render children()}
	{/if}
</ul>
