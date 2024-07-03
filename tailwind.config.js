/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,svelte,js,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui'), 'prettier-plugin-tailwindcss'],
	daisyui: {
		themes: ['light', 'dark']
	}
};
