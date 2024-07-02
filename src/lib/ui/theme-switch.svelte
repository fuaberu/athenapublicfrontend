<script lang="ts">
	export let isDark: boolean;

	function set_theme(event: Event) {
		const checkbox = event.target as HTMLInputElement;
		const theme = checkbox.checked ? 'dark' : 'light';

		const one_year = 60 * 60 * 24 * 365;
		document.cookie = `theme=${theme}; max-age=${one_year}; path=/; SameSite=Strict;`;
		document.documentElement.setAttribute('data-theme', theme);
		isDark = theme === 'dark';

		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

{#if isDark === null}
	<div class="w-12 h-6 border border-gray-100 dark:border-gray-700 rounded-full"></div>
{:else}
	<input
		type="checkbox"
		checked={isDark}
		on:change={set_theme}
		data-choose-theme
		class="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
	/>
{/if}
