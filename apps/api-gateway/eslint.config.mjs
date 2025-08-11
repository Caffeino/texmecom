import baseConfig from '../../eslint.config.mjs';

export default [
	...baseConfig,
	// TODO: Avoid using the type: any.
	// Not recommended, temporarily enabled.
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off'
		}
	}
];
