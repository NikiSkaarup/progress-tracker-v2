<script>
	import Link from '$lib/components/ui/link.svelte';
	import List from '$lib/components/ui/list.svelte';
	import PageHeading from '$lib/components/ui/page-heading.svelte';
	import TitledSection from '$lib/components/ui/titled-section.svelte';

	const pages = [
		{ name: 'About', href: '/about' },
		{ name: 'Ideas', href: '/ideas' },
		{ name: 'Now', href: '/now' },
		{ name: 'Uses', href: '/uses' }
	];
</script>

<article class="content grid">
	<PageHeading>
		{#snippet title()}
			Typing..
		{/snippet}
		<!-- <p class="text-balance text-center">...typing</p> -->
	</PageHeading>
	<TitledSection id="pages" class="breakout content bg-card text-card-foreground grid">
		{#snippet title()}
			Pages
		{/snippet}
		<List class="flex flex-row gap-2">
			{#each pages as page}
				<li><Link href={page.href}>{page.name}</Link></li>
			{/each}
		</List>
	</TitledSection>
</article>
