<script lang="ts">
	import { goto } from '$app/navigation';

	async function handleLogout() {
		const response = await fetch('/api/auth/logout', {
			method: 'POST'
		});

		if (response.ok) {
			goto('/login');
		}
	}
</script>

<div class="min-h-[calc(100vh-350px)] bg-gray-100 py-12">
	<!-- Separator to push content below navbar -->
	<div class="h-[80px]"></div>

	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900">Decaf Admin</h1>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Logout Card -->
			<div class="min-h-40 rounded-lg bg-white p-6 shadow-[0px_0px_10px_10px_rgba(0,0,0,0.1)]">
				<h2 class="mb-4 text-xl font-semibold text-gray-800">Logout</h2>
				<p class="mb-4 text-gray-600">Melde dich vom System ab</p>
				<form method="post" action="?/logout">
					<button
						type="submit"
						class="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
					>
						Logout
					</button>
				</form>
			</div>

			<div class="min-h-40 rounded-lg bg-white p-6 shadow-[0px_0px_10px_10px_rgba(0,0,0,0.1)]">
				<h2 class="mb-4 text-xl font-semibold text-gray-800">Blogbeiträge bearbeiten</h2>
				<p class="mb-4 text-gray-600">Blogbeiträge hinzufügen, bearbeiten und löschen</p>
				<a
					href="/user/blog"
					class="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Blog bearbeiten
				</a>
			</div>
		</div>
		<!-- Spacer div for padding -->
		<div class="h-40"></div>
	</div>
</div>
