<script>
	import Link from '$lib/components/ui/link.svelte';
	import List from '$lib/components/ui/list.svelte';
	import PageHeading from '$lib/components/ui/page-heading.svelte';
	import TitledSection from '$lib/components/ui/titled-section.svelte';
</script>

<article class="content grid">
	<PageHeading>
		{#snippet title()}
			Now
		{/snippet}
		<p class="text-balance text-center">
			This is a <Link href="https://nownownow.com/about">/now</Link> page with a list of things
			I'm currently doing.
		</p>
	</PageHeading>
	<TitledSection id="working-on" class="breakout content bg-card grid">
		{#snippet title()}
			What I'm working on
		{/snippet}
		<List>
			<li>
				Filling out the <Link href="/about">/about</Link> page.
			</li>
			<li>
				Filling out the <Link href="/ideas">/ideas</Link> page.
			</li>
			<li>
				Filling out the <Link href="/now">/now</Link> page.
			</li>
			<li>
				Filling out the <Link href="/uses">/uses</Link> page.
			</li>
			<li class="max-w-prose">
				Stop testing this site in production. which requires setting up a second environment
				which is based on the development branch and switch the live site to be based on
				master.
			</li>
		</List>
	</TitledSection>
	<TitledSection id="reading" class="ultrawide content bg-card/40 grid">
		{#snippet title()}
			What I'm reading
		{/snippet}

		<p class="max-w-prose">
			I read mostly fantasy and science fiction, if that isn't your cup of tea, you can ignore
			this section.
		</p>
		<p class="max-w-prose">
			Since I go through somewhere between 130-170 books every year, so it will be more of a
			books that stuck around than a currently reading.
		</p>
	</TitledSection>
	<TitledSection id="inspiration" class="breakout content bg-card grid">
		{#snippet title()}
			Inspiration
		{/snippet}
		<List>
			<li><Link href="https://nownownow.com/about">What is a /now page</Link></li>
		</List>
	</TitledSection>
</article>
