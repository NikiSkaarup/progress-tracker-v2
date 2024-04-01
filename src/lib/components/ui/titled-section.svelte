<script>
	import { cn } from '$lib/utils';
	/** @type {ClassProp & ChildrenProp & {id: string; title?: Children}} */
	let { id, class: className, children, title } = $props();
</script>

<section class={cn('flex flex-col gap-2 py-8', className)}>
	{#if title}
		<h2 {id} class="scroll-m-24 text-2xl">
			<a href="#{id}">
				{@render title()}
			</a>
		</h2>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</section>
