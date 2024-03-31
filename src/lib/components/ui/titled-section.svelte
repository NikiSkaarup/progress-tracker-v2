<script>
	import { cn } from '$lib/utils';
	/** @type {{id: string; class?: string | undefined | null; children?: import('svelte').Snippet; title: import('svelte').Snippet}} */
	let { id, class: className, children, title } = $props();
</script>

<section class={cn('flex flex-col gap-2 py-8', className)}>
	<h2 {id} class="scroll-m-24 text-2xl">
		<a href="#{id}">
			{@render title()}
		</a>
	</h2>
	{#if children}
		{@render children()}
	{/if}
</section>
