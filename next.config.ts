import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactCompiler: true,
	reactStrictMode: true,
	turbopack: {
		rules: {
			'*.{graphql,gql}': {
				loaders: ['graphql-tag/loader'],
				as: '*.js',
			},
		},
		resolveExtensions: ['.graphql', '.gql', '.ts', '.tsx', '.js', '.jsx', '.json'],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
}

export default nextConfig
