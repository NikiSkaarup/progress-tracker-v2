<script>
	import { cn } from '$lib/utils';
	/** @type {ClassProp & ChildrenProp & {title: Children}} */
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
