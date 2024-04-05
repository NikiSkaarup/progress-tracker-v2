<script>
import { cn } from '$lib/utils';
/** @type {ClassProp & {
 * id: string;
 * begin: string;
 * dur?: string | number;
 * repeatCount?: string | number;
 * seed?: string | number;
 * scale?: string | number;
 * seeds?: string;
 * scales?: string;
 * baseFrequency?: string;
 * }} */
let {
	id,
	begin,
	dur = 0.8,
	repeatCount = 1,
	seed = 0,
	scale = 0,
	seeds = '0;200;0',
	scales = '0;20;0',
	baseFrequency = '0.7,0.8',
	class: className,
} = $props();
</script>

<svg
	class={cn(
		'pointer-events-none absolute -top-full -left-full h-0 w-0 overflow-hidden opacity-0',
		className
	)}
>
	<defs>
		<filter {id}>
			<feTurbulence type="fractalNoise" {baseFrequency} {seed}>
				<animate attributeName="seed" values={seeds} {dur} {repeatCount} {begin} />
			</feTurbulence>
			<feDisplacementMap in="SourceGraphic" in2="warp" {scale}>
				<animate attributeName="scale" values={scales} {dur} {repeatCount} {begin} />
			</feDisplacementMap>
		</filter>
	</defs>
</svg>
