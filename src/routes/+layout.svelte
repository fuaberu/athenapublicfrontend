<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';

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

<main class="relative min-h-screen text-gray-950 dark:text-gray-50">
	{#key data.pathname}
		<div in:fade={{ duration: !hasViewTransition ? 300 : 0 }}>
			<slot />
		</div>
	{/key}
</main>
