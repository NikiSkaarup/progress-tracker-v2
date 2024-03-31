<script>
	import { cn } from '$lib/utils';
	/** @type {{href: string; class?: string | undefined | null; children: import('svelte').Snippet}} */
	let { href, class: className, children } = $props();
	/** @type {string | null | undefined}*/
	let target = !href.startsWith('/') ? '_blank' : null;
	/** @type {string | null | undefined}*/
	let rel = !href.startsWith('/') ? 'noopener noreferrer' : null;
</script>

<a
	{href}
	{target}
	{rel}
	class={cn(
		'decoration-primary underline underline-offset-4 transition-all hover:decoration-2',
		className
	)}
>
	{@render children()}
</a>
