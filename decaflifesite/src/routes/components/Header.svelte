<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="bg-white shadow-sm">
	<nav class="mx-auto max-w-7xl p-8 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<div class="flex-shrink-0">
				<a href="/" class="text-2xl font-semibold text-gray-900">My Decaf Life</a>
			</div>

			<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
				<a
					href="/"
					class:active={$page.url.pathname === '/'}
					class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
				>
					Home
				</a>
				<a
					href="/features"
					class:active={$page.url.pathname === '/features'}
					class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
				>
					Features
				</a>
				<a
					href="/testimonials"
					class:active={$page.url.pathname === '/testimonials'}
					class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
				>
					Testimonials
				</a>
				<a
					href="/pricing"
					class:active={$page.url.pathname === '/pricing'}
					class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
				>
					Pricing
				</a>
			</div>

			<div class="flex items-center">
				<a
					href="/get-app"
					class="rounded-md bg-[#F5D0C5] px-4 py-2 text-sm font-medium text-gray-900 hover:bg-[#f0c1b4]"
				>
					Get the App
				</a>
			</div>
		</div>
	</nav>
</header>

<style>
	.active {
		border-bottom: 2px solid #4b5563;
	}
</style>
