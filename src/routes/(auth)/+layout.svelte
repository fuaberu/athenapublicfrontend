<script lang="ts">
	import ThemeSwitch from '$lib/ui/theme-switch.svelte';

	export let data;
</script>

<div class="relative min-h-screen flex flex-col">
	<div class="flex justify-between px-3 pt-3">
		<a href="/">Home</a>
		<ThemeSwitch isDark={data.theme === 'dark'} />
	</div>
	<div class="flex-1 flex flex-col gap-3 justify-center items-center">
		<slot />
	</div>
	<footer class="w-full bg-sky-700 dark:bg-sky-950 p-6 flex justify-between">
		<span>
			Copyright © {new Date().getFullYear()}
		</span>
		<a href="https://www.portaldalogon.com.br" class="hover:underline">Logon Informática</a>
	</footer>
</div>
