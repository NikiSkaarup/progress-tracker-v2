<script>
	import { cn } from '$lib/utils.ts';

	/** @type {ChildrenProp & import('svelte/elements').HTMLAttributes<HTMLDivElement>} */
	let { class: className, children, ...everythingElse } = $props();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cn('breakout content grid', className)}
	{...everythingElse}
	on:click
	on:focusin
	on:focusout
	on:mouseenter
	on:mouseleave
>
	{#if children}
		{@render children()}
	{/if}
</div>
