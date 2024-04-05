<script>
import portrait from '$lib/../images/portrait-greyscale_48x48.png';
import { cn } from '$lib/utils';
import Noise from './noise.svelte';
/** @type {ClassProp & {id: string;}} */
let { id, class: className } = $props();
let noiseId = $derived(id + '-noise');
</script>

<Noise id={noiseId} begin="{id}.mouseenter" />
<div {id} class={cn('aspect-square rounded-full contain-strict', className)}>
	<img
		loading="eager"
		class="aspect-square h-full object-cover"
		src={portrait}
		alt="nws"
		style="filter: url(#{noiseId});"
	/>
</div>
