import baseConfig from '../../eslint.config.mjs';

export default [
	...baseConfig,
	{
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: [
						'^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$',
						// TODO: Whitelist Folders
						'../../packages'
					],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*']
						}
					]
				}
			]
		}
	}
];
