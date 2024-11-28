<script lang="ts">
	import GetMotivationalContent from '$lib/assets/get_motivational_content.png';
	import GetScienceInsights from '$lib/assets/get_science_insights.png';
	import TrackStreak from '$lib/assets/track_your_streak.png';

	interface ScreenPreview {
		titleBlack1: string;
		titleGreen: string;
		titleBlack2: string;
		image: string;
		description: string;
	}

	const screens: ScreenPreview[] = [
		{
			titleBlack1: '',
			titleGreen: 'Track',
			titleBlack2: 'your quitting streak',
			image: TrackStreak,
			description:
				'Quit your caffeine addiction, start tracking your streak and get insights how much money, caffeine & other things you saved!'
		},
		{
			titleBlack1: 'Get the',
			titleGreen: 'latest science',
			titleBlack2: 'insights',
			image: GetScienceInsights,
			description:
				'Find out why some people can handle caffeine just fine and others suffer from anxiety, insomnia & other problems.'
		},
		{
			titleBlack1: '',
			titleGreen: 'Motivational content',
			titleBlack2: 'to stay strong',
			image: GetMotivationalContent,
			description:
				'Get support when you are craving caffeine the most! You will receive reports from other caffeine quitters at times when you normally got your caffeine fix.'
		}
	];
</script>

{#snippet preview(p: ScreenPreview, i: number)}
	<!-- Desktop version -->
	<div class="mx-auto hidden flex-row gap-20 lg:flex" class:flex-row-reverse={i % 2 === 1}>
		<img src={p.image} alt="Preview" class="max-w-[500px] rounded-[35px]" />
		<div class="m-auto flex max-w-md flex-col gap-8">
			<!-- Headline -->
			<div class="gap-2 text-center">
				<h2 class="leading-tight lg:text-left lg:text-5xl">
					<span>{p.titleBlack1}</span> <span class="text-secondary-500">{p.titleGreen}</span>
					<span>{p.titleBlack2}</span>
				</h2>
			</div>
			<h3
				class="mb-8 text-center text-base font-normal text-text-400 lg:mb-0 lg:text-left lg:text-xl"
			>
				{p.description}
			</h3>
		</div>
	</div>

	<!-- Mobile version -->
	<div class="mx-auto flex flex-col gap-8 lg:hidden lg:flex-row lg:gap-20">
		<div class="m-auto flex max-w-md flex-col gap-2">
			<div class="gap-2 text-center">
				<!-- Headline -->
				<h2 class="leading-tight lg:text-left lg:text-5xl">
					<span>{p.titleBlack1}</span> <span class="text-secondary-500">{p.titleGreen}</span>
					<span>{p.titleBlack2}</span>
				</h2>
			</div>
			<img src={p.image} alt="Preview" class="rounded-[35px]" />
			<h3
				class="mb-8 text-center text-base font-normal text-text-400 lg:mb-0 lg:text-left lg:text-xl"
			>
				{p.description}
			</h3>
		</div>
	</div>
{/snippet}

<section id="features" class="px-6 pb-12 pt-8 lg:py-32">
	<h3 class="mb-8 text-center font-normal text-text-300 lg:pb-12">
		We created an App to help you quit...
	</h3>

	<div class="flex flex-col gap-5 lg:gap-24">
		{#each screens as s, i}
			{@render preview(s, i)}
		{/each}
	</div>
</section>
