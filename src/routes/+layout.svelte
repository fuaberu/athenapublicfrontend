<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import ThemeSwitch from '$lib/ui/theme-switch.svelte';

	const hasViewTransition = !!(browser && (document as any)).startViewTransition;

	onNavigate((navigation) => {
		if (!hasViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	export let data;
</script>

<svelte:head>
	<title>Athena Public</title>
</svelte:head>

<main class="relative flex min-h-screen flex-col text-gray-950 dark:text-gray-50">
	<header class="flex justify-between px-3 pt-3">
		<a href="/">Home</a>
		<ThemeSwitch isDark={data.theme === 'dark'} />
	</header>
	<div class="relative flex flex-1 flex-col">
		{#key data.pathname}
			<div
				class="flex flex-1 flex-col items-center justify-center gap-3"
				in:fade={{ duration: !hasViewTransition ? 300 : 0 }}
			>
				<slot />
			</div>
		{/key}
	</div>
	<footer class="mt-auto flex w-full justify-between bg-sky-700 p-6 dark:bg-sky-950">
		<span>
			Copyright © {new Date().getFullYear()}
		</span>
		<a href="https://www.portaldalogon.com.br" class="hover:underline">Logon Informática</a>
	</footer>
</main>
