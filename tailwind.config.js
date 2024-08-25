/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		color: {
			main: '#121212',
			hover: '#444444',
		},
		height: {
			'screen-minus-59': 'calc(100vh - 59px)',
		},
	},
	plugins: [],
});
