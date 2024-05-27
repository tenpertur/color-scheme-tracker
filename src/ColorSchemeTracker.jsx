import { useEffect } from 'react';

const ColorSchemeTracker = ({ onSchemeChange }) => {
	useEffect(() => {
		const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (event) => {
			const newColorScheme = event.matches ? 'dark' : 'light';
			onSchemeChange(newColorScheme);
		};

		colorSchemeQuery.addEventListener('change', onChange);
		return () => colorSchemeQuery.removeEventListener('change', onChange);
	},
		[onSchemeChange]
	);
};

export default ColorSchemeTracker;
