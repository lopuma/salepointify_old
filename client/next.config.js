/** @type {import('next').NextConfig} */
const nextConfig = {
	/**
	 * Same as typechecking
	 */
	eslint: {
		ignoreDuringBuilds: true,
	},
	/**
	 * Ignore for now type checking errors no time for that
	 */
	/**
	 * Compiler options for emotion development and source maps
	 */
	// compiler: {
	//   // emotion: true,
	// },
	reactStrictMode: true,
	transpilePackages: [
		"@wsy/browser-utils",
		"@wsy/config",
		"@wsy/hooks",
		"@wsy/logger",
		"@wsy/next-intl",
		"@wsy/shared",
		"@wsy/socket.io-msgpack",
		"@wsy/store",
		"@wsy/ui",
	],
};

module.exports = nextConfig;
