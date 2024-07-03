<script lang="ts">
	import ThemeSwitch from '$lib/ui/theme-switch.svelte';

	export let data;
</script>

<div class="relative flex min-h-screen flex-col">
	<div class="flex justify-between px-3 pt-3">
		<a href="/">Home</a>
		<ThemeSwitch isDark={data.theme === 'dark'} />
	</div>
	<div class="flex flex-1 flex-col items-center justify-center gap-3">
		<slot />
	</div>
	<footer class="flex w-full justify-between bg-sky-700 p-6 dark:bg-sky-950">
		<span>
			Copyright © {new Date().getFullYear()}
		</span>
		<a href="https://www.portaldalogon.com.br" class="hover:underline">Logon Informática</a>
	</footer>
</div>
