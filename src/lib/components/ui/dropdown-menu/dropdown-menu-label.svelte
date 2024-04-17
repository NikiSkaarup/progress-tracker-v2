<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	type $$Props = DropdownMenuPrimitive.LabelProps & {
		inset?: boolean;
	};

	let className: $$Props['class'] = undefined;
	export let inset: $$Props['inset'] = undefined;
	export { className as class };
</script>

<DropdownMenuPrimitive.Label
	class={cn('py-1.5 px-2 text-sm font-semibold', inset && 'pl-8', className)}
	{...$$restProps}
>
	<slot />
</DropdownMenuPrimitive.Label>
