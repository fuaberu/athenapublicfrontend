<script lang="ts">
	import Spinner from '$lib/ui/spinner.svelte';
	import { applyAction, deserialize } from '$app/forms';

	import type { ActionData } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let loading = false;

	export let form: ActionData;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		loading = true;
		const data = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			if (result.data.redirect) {
				goto(result.data.redirect);
			}
		}

		applyAction(result);

		loading = false;
	}
</script>

{#if form?.message}
	<div class="alert alert-error mx-auto max-w-96 shadow-lg">
		<p>{form.message}</p>
	</div>
{/if}

<form
	on:submit|preventDefault={handleSubmit}
	method="POST"
	class="mx-auto w-full max-w-96 space-y-2 p-2"
>
	<h1 class="text-center text-3xl">Login</h1>
	<div class="form-control w-full">
		<label for="email" class="label">
			<span class="label-text">Email</span>
		</label>
		<input
			type="text"
			name="email"
			class="input w-full {form?.errors?.email ? 'input-error' : 'input-bordered'}"
			value={form?.data?.email ?? ''}
			autocomplete="username"
		/>
		<label for="email" class="label">
			{#if form?.errors?.email}
				<span class="label-text-alt text-error">{form?.errors?.email[0]}</span>
			{/if}
		</label>
	</div>
	<div class="form-control w-full">
		<label for="password" class="label">
			<span class="label-text">Senha</span>
		</label>
		<input
			type="password"
			name="password"
			value={form?.data?.password ?? ''}
			class="input w-full {form?.errors?.password ? 'input-error' : 'input-bordered'}"
			autocomplete="current-password"
		/>
		<label for="password" class="label">
			{#if form?.errors?.password}
				<span class="label-text-alt text-error">{form?.errors?.password[0]}</span>
			{/if}
		</label>
	</div>
	<div class="form-control w-full">
		<label class="label cursor-pointer justify-start space-x-4">
			<input type="checkbox" name="remember" class="checkbox-primary checkbox" />
			<span class="label-text">Lembrar de mim</span>
		</label>
	</div>
	<div class="w-full">
		<button class="btn btn-primary w-full" type="submit">
			{#if loading}
				<Spinner />
			{:else}
				Login
			{/if}
		</button>
	</div>
</form>
