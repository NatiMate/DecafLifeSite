<script lang="ts">
	import GetMotivationalContent from '$lib/assets/get_motivational_content.webp';
	import GetScienceInsights from '$lib/assets/get_science_insights.webp';
	import TrackStreak from '$lib/assets/track_your_streak.webp';

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
				'Find out why some people can handle caffeine just fine and others suffer from anxiety, insomnia & other problems.'
		}
	];
</script>

{#snippet preview(p: ScreenPreview)}
	<div class="flex flex-row gap-2 text-center">
		<h2 class="leading-tight">
			<span>{p.titleBlack1}</span> <span class="text-secondary-500">{p.titleGreen}</span>
			<span>{p.titleBlack2}</span>
		</h2>
	</div>
	<img src={p.image} alt="Preview" />
	<h3 class="text-text-400 mb-8 text-center text-base font-normal">{p.description}</h3>
{/snippet}

<section class="px-6 pb-12 pt-8">
	<h3 class="text-text-300 mb-8 text-center font-normal">We created an App to help you quit...</h3>

	<div class="flex flex-col gap-5">
		{#each screens as s}
			{@render preview(s)}
		{/each}
	</div>
</section>
