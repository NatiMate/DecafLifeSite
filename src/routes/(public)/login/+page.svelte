<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';

	const { data } = $props();

	const {
		form: sfSignInForm,
		errors: sfSignInErrors,
		enhance: sfSignInEnhance
	} = superForm(data.signInForm);

	$effect(() => {
		console.log($page.status);
		console.log($sfSignInErrors);
	});
</script>

<form
	method="post"
	action="?/login"
	use:sfSignInEnhance
	class="sm: mx-auto my-36 max-w-md rounded-lg bg-white p-8 shadow-[0px_0px_10px_10px_rgba(0,0,0,0.10)]"
>
	<div class="mb-6">
		<label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Username </label>
		<input
			class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			id="username"
			name="username"
			type="text"
			placeholder="Enter username"
			bind:value={$sfSignInForm.username}
		/>
		{#if $sfSignInErrors.username}
			<p class="text-sm text-red-500">{$sfSignInErrors.username}</p>
		{/if}
	</div>
	<div class="mb-6">
		<label class="mb-2 block text-sm font-bold text-gray-700" for="password"> Password </label>
		<input
			class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			id="password"
			name="password"
			type="password"
			placeholder="Enter password"
			bind:value={$sfSignInForm.password}
		/>
	</div>
	<div class="flex flex-col gap-4">
		{#if $sfSignInErrors?.password}
			<p class="text-sm text-red-500">{$sfSignInErrors.password}</p>
		{/if}

		<div class="flex items-start justify-end">
			<button
				class="focus:shadow-outline rounded bg-primary-500 px-4 py-2 font-bold text-white hover:bg-primary-700 focus:outline-none"
				type="submit"
			>
				Login
			</button>
		</div>
	</div>
</form>
