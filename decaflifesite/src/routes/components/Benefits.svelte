<script lang="ts">
	const benefitsRow1 = [
		{ emoji: '😶‍🌫', name: 'Better skin' },
		{ emoji: '💃', name: 'More Energy' },
		{ emoji: '😊', name: 'Less Stress' },
		{ emoji: '🛏️', name: 'Better Sleep' },
		{ emoji: '💩', name: 'Improved Digestion' },
		{ emoji: '🤬', name: 'Less Anger' },
		{ emoji: '🧘', name: 'Less Anxiety' },
		{ emoji: '🪂', name: 'No Afternoon Crashes' }
	];

	const benefitsRow2 = [
		{ emoji: '💸', name: 'Saving Money' },
		{ emoji: '🙂', name: 'More Rested' },
		{ emoji: '🪷', name: 'Improved Mindfulness' },
		{ emoji: '🥵', name: 'Less Sweating' },
		{ emoji: '😌', name: 'More Calmness' },
		{ emoji: '🦷', name: 'Whiter Teeth' },
		{ emoji: '💭', name: 'Less Rumination' },
		{ emoji: '☀', name: 'Easier Waking Up' }
	];
</script>

{#snippet benefit(emoji: string, name: string)}
	<div
		class="bg-secondary-50 border-secondary-200 flex items-center gap-1 rounded-lg border px-2 py-1 text-sm lg:text-lg"
	>
		<span>{emoji}</span>
		<span class="text-secondary-500 font-medium">{name}</span>
	</div>
{/snippet}

<section
	class="bg-primary-50 border-primary-100 mx-auto my-12 border-y py-8 lg:my-0 lg:bg-transparent"
>
	<h3 class="text-text-900 text-center font-medium">Reported benefits from caffeine quitters</h3>

	<div class="flex flex-col gap-4 pt-6">
		<div class="relative">
			<div
				class="from-almost-white absolute left-0 top-0 z-10 hidden h-full w-72 bg-gradient-to-r to-transparent lg:block"
			></div>
			<div
				class="from-almost-white absolute right-0 top-0 z-10 hidden h-full w-72 bg-gradient-to-l to-transparent lg:block"
			></div>

			<div class="scroll-container">
				<div class="scrolling-wrapper flex flex-row gap-4">
					{#each benefitsRow1 as { emoji, name }}
						{@render benefit(emoji, name)}
					{/each}
					{#each benefitsRow1 as { emoji, name }}
						{@render benefit(emoji, name)}
					{/each}
				</div>
			</div>
		</div>

		<div class="relative">
			<div
				class="from-almost-white absolute left-0 top-0 z-10 hidden h-full w-72 bg-gradient-to-r to-transparent lg:block"
			></div>
			<div
				class="from-almost-white absolute right-0 top-0 z-10 hidden h-full w-72 bg-gradient-to-l to-transparent lg:block"
			></div>

			<div class="scroll-container">
				<div class="scrolling-wrapper-reverse flex flex-row gap-4">
					{#each benefitsRow2 as { emoji, name }}
						{@render benefit(emoji, name)}
					{/each}
					{#each benefitsRow2 as { emoji, name }}
						{@render benefit(emoji, name)}
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-50% - 1.5rem));
		}
	}

	@keyframes scroll-reverse {
		0% {
			transform: translateX(calc(-50% - 1.5rem));
		}
		100% {
			transform: translateX(0);
		}
	}

	.scroll-container {
		overflow: hidden;
		white-space: nowrap;
		position: relative;
		width: 100%;
	}

	.scrolling-wrapper {
		display: inline-flex;
		animation: scroll 50s linear infinite;
	}

	.scrolling-wrapper-reverse {
		display: inline-flex;
		animation: scroll-reverse 50s linear infinite;
	}

	/* Pause animation on hover */
	.scrolling-wrapper:hover,
	.scrolling-wrapper-reverse:hover {
		animation-play-state: paused;
	}
</style>
