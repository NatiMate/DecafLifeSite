<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/assets/decaf_logo.png';
	import { isMenuOpen } from '$lib/stores/menuStore';

	const toggleMenu = () => {
		isMenuOpen.update((value) => !value);
	};

	let isHome = $state(false);

	$effect(() => {
		isHome = $page.url.pathname === '/' || $page.url.pathname === '';
	});

	const navElements = [
		{ href: '/', name: 'Home', isHomeNav: false },
		{ href: '/blog', name: 'Blog', isHomeNav: false },
		{ href: '/#features', name: 'Features', isHomeNav: true },
		{ href: '/#testimonials', name: 'Testimonials', isHomeNav: true }
	];
</script>

{#snippet humburgerNavElem(href: string, name: string, isHomeNav: boolean)}
	<a
		{href}
		class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-right text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-gray-900"
		target={isHomeNav && !isHome ? '_self' : ''}
		onclick={(e) => {
			isMenuOpen.set(false);
		}}
	>
		{name}
	</a>
{/snippet}

{#snippet desktopNavElem(href: string, name: string)}
	<a
		{href}
		class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600"
	>
		{name}
	</a>
{/snippet}

<header class="sticky top-0 z-10 border-b border-primary-200 bg-white">
	<nav class="mx-auto max-w-7xl px-6 py-8 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<div class="flex flex-shrink-0 flex-row items-center gap-2">
				<a href="/">
					<img
						src={logo}
						alt="My Decaf Life"
						class="h-12 w-auto rounded-md border border-primary-50"
					/>
				</a>
				<a href="/" class="text-2xl font-semibold text-text-900">My Decaf Life</a>
			</div>

			<!-- Hamburger menu toggle for mobile -->
			<button class="md:hidden" onclick={toggleMenu} aria-label="Toggle menu">
				<svg class="h-6 w-6" fill="bg-text-800" stroke="currentColor" viewBox="0 0 24 24">
					{#if $isMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>

			<!-- Desktop navigation -->
			<div class="hidden md:ml-6 md:flex md:space-x-8">
				{#each navElements as navElement}
					{@render desktopNavElem(navElement.href, navElement.name)}
				{/each}

				<!-- CTA button -->
				<div class="flex items-center">
					<a
						href="/#cta"
						class="rounded-md border border-primary-200 bg-primary-100 px-4 py-2 text-sm font-medium text-primary-500 hover:border-primary-400"
					>
						Get the App
					</a>
				</div>
			</div>
		</div>

		<!-- Mobile menu outside of flex box -->
		<div
			class="absolute left-0 right-0 w-full overflow-hidden border-primary-200 bg-white transition-all duration-300 ease-in-out md:hidden"
			style:max-height={$isMenuOpen ? '300px' : '0px'}
		>
			<div class="space-y-1 pb-3 pt-2">
				{#each navElements as navElement}
					{@render humburgerNavElem(navElement.href, navElement.name, navElement.isHomeNav)}
				{/each}
			</div>
		</div>
	</nav>
</header>
