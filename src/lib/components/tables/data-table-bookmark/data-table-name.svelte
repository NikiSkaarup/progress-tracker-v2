<script>
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';

	/** @type {string} */
	export let name;
	/** @type {string} */
	export let href;
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="link"
			{href}
			target="_blank"
			referrerpolicy="no-referrer"
		>
			<span class="inline-block max-w-prose overflow-hidden text-ellipsis text-nowrap">
				{name}
			</span>
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>{name}</p>
	</Tooltip.Content>
</Tooltip.Root>
