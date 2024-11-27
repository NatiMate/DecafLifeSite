<script lang="ts">
	import { onMount } from 'svelte';

	export let beforeImage;
	export let afterImage;
	export let alt;
	export let position = 0;

	let container: HTMLDivElement;
	let isInitialAnimation = true;

	onMount(() => {
		setTimeout(() => {
			position = 100;

			setTimeout(() => {
				position = 10;
				isInitialAnimation = false;
			}, 2000);
		}, 800);
	});

	function handleMouseMove(event: MouseEvent) {
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const x = event.clientX - rect.left;
		position = (x / rect.width) * 100;

		position = Math.min(Math.max(position, 0), 100);
	}
</script>

<div
	class="relative h-full w-full overflow-hidden rounded-lg"
	bind:this={container}
	on:mousemove={handleMouseMove}
	on:touchmove|preventDefault={(e) => {
		const touch = e.touches[0];
		handleMouseMove({ clientX: touch.clientX } as MouseEvent);
	}}
	role="slider"
	tabindex="0"
	aria-label="Image comparison slider"
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={position}
>
	<!-- Before image (full width, stationary) -->
	<img src={beforeImage} {alt} class="h-full w-full object-cover" />

	<!-- After image (clipped) -->
	<div
		class="absolute left-0 top-0 h-full w-full overflow-hidden"
		class:transition-all={isInitialAnimation}
		class:duration-[2000ms]={isInitialAnimation}
		class:ease-in-out={isInitialAnimation}
		style="clip-path: inset(0 {100 - position}% 0 0)"
	>
		<img src={afterImage} {alt} class="h-full w-full object-cover" />
	</div>

	<!-- Slider handle -->
	<div
		class="absolute bottom-0 top-0"
		class:transition-all={isInitialAnimation}
		class:duration-[2000ms]={isInitialAnimation}
		class:ease-in-out={isInitialAnimation}
		style="left: {position}%"
	>
		<div class="relative h-full w-1 bg-white">
			<div class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg">
					<svg class="h-4 w-4" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</div>
